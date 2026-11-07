// Original 30 s score for the Manto Online → Chartagh motion: `node scripts/score.mjs`
// → assets/audio/score.wav (44.1 kHz stereo). Santur-like plucks (Karplus-Strong) in
// Bayat-e Esfahan on D, a daf groove and a low drone at 96 BPM; paper/tape/tear/stamp
// hits sit on the composition's own cue times. Deterministic: seeded PRNG only.
import { writeFileSync, mkdirSync } from 'node:fs';

const SR = 44100, DUR = 30, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 1234567;
const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
const BEAT = 60 / 96, BAR = BEAT * 4;

function add(buf, t, i, v) { const k = Math.floor(t * SR) + i; if (k >= 0 && k < N) buf[k] += v; }
function put(t, sig, gain, pan = 0) { // sig: Float32Array mono
  const gl = gain * Math.cos((pan + 1) * Math.PI / 4), gr = gain * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < sig.length; i++) { add(L, t, i, sig[i] * gl); add(R, t, i, sig[i] * gr); }
}

// --- santur: two slightly detuned Karplus-Strong strings per course, hammered ---
function santur(freq, len = 1.6, bright = 0.6) {
  const n = Math.floor(len * SR), out = new Float32Array(n);
  for (const det of [0.9988, 1.0012]) {
    const p = Math.max(2, Math.round(SR / (freq * det))), line = new Float32Array(p);
    let prev = 0;
    for (let i = 0; i < p; i++) { const w = rnd() * 2 - 1; prev = prev + bright * (w - prev); line[i] = prev; }
    let idx = 0;
    for (let i = 0; i < n; i++) {
      const a = line[idx], b = line[(idx + 1) % p];
      line[idx] = 0.4985 * (a + b);
      out[i] += a * 0.5;
      idx = (idx + 1) % p;
    }
  }
  for (let i = 0; i < 64 && i < n; i++) out[i] *= i / 64;
  return out;
}

// --- daf ---
function doum(big = 1) {
  const n = Math.floor(0.6 * SR), o = new Float32Array(n); let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, f = 58 + 70 * Math.exp(-t * 30);
    ph += 2 * Math.PI * f / SR;
    o[i] = Math.sin(ph) * Math.exp(-t * (6 / big)) + (rnd() * 2 - 1) * 0.25 * Math.exp(-t * 60);
  }
  return o;
}
function tak() {
  const n = Math.floor(0.25 * SR), o = new Float32Array(n); let lp = 0, ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, w = rnd() * 2 - 1; lp += 0.35 * (w - lp);
    ph += 2 * Math.PI * 420 / SR;
    o[i] = (w - lp) * Math.exp(-t * 45) * 0.8 + Math.sin(ph) * 0.25 * Math.exp(-t * 30);
  }
  return o;
}
function jingle(len = 0.35) {
  const n = Math.floor(len * SR), o = new Float32Array(n);
  const fs = [5200, 6900, 8100, 9400, 7600].map((f) => f * (0.97 + rnd() * 0.06));
  for (let i = 0; i < n; i++) {
    const t = i / SR; let s = 0;
    for (const f of fs) s += Math.sin(2 * Math.PI * f * t);
    o[i] = (s / fs.length * 0.6 + (rnd() * 2 - 1) * 0.15) * Math.exp(-t * 9) * Math.min(1, t * 400);
  }
  return o;
}
// --- paper / tape / tear / stamp foley ---
function noiseBurst(len, hp, decay) {
  const n = Math.floor(len * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const w = rnd() * 2 - 1; lp += hp * (w - lp); o[i] = (w - lp) * Math.exp(-(i / SR) * decay); }
  return o;
}
function tear(len = 0.95) {
  const n = Math.floor(len * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, w = rnd() * 2 - 1; lp += 0.2 * (w - lp);
    const crackle = rnd() < 0.012 ? (rnd() * 2 - 1) * 3 : 0;
    o[i] = ((w - lp) * 0.6 + crackle) * Math.sin(Math.PI * Math.min(1, t / len)) * (0.6 + 0.4 * Math.sin(t * 70));
  }
  return o;
}
function riser(len) {
  const n = Math.floor(len * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const t = i / SR, k = 0.02 + 0.5 * (t / len); const w = rnd() * 2 - 1; lp += k * (w - lp); o[i] = lp * (t / len) ** 2; }
  return o;
}
function drone(f, len) {
  const n = Math.floor(len * SR), o = new Float32Array(n);
  for (let i = 0; i < n; i++) { const t = i / SR; o[i] = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(2 * Math.PI * f * 2.003 * t) + 0.2 * Math.sin(2 * Math.PI * f * 3 * t)) * (0.85 + 0.15 * Math.sin(t * 1.3)); }
  return o;
}

// Bayat-e Esfahan on D (harmonic-minor colour, no microtones)
const D4 = 293.66, SCALE = [0, 2, 3, 5, 7, 8, 11];
const deg = (d) => D4 * 2 ** ((12 * Math.floor(d / 7) + SCALE[((d % 7) + 7) % 7]) / 12); // degree 0 = D4, ±7 = octave

// ---------- drone bed ----------
put(0, drone(73.42, 22.4), 0.06, -0.2);   // D2
put(0, drone(110, 22.4), 0.03, 0.25);     // A2
put(24.0, drone(73.42, 6), 0.06, -0.2);
put(24.0, drone(110, 6), 0.03, 0.25);

// ---------- intro: rubato santur over the title ----------
[[0.2, 4], [0.55, 5], [1.0, 4], [1.3, 7], [1.75, 6], [2.05, 7]].forEach(([t, d], i) => put(t, santur(deg(d), 2.2), 0.5, i % 2 ? 0.3 : -0.3));
for (let t = 2.2; t < 3.4; t += BEAT / 4) put(t, santur(deg(7), 0.5, 0.5), 0.18 * (1 - (t - 2.2) / 1.6), 0.2); // tremolo

// ---------- groove 3.75 → 22.5 ----------
const motifs = [
  [0, 2, 4, 2, 5, 4, 2, 1], [0, 2, 4, 7, 6, 4, 5, 4],
  [4, 5, 7, 5, 4, 2, 4, 0], [7, 6, 5, 4, 5, 4, 2, 0],
];
function grooveBar(t0, m, level, dense) {
  // daf: doum on 1 and the "and" of 2; taks on 2, 3 and 4
  put(t0, doum(), 0.55 * level, 0); put(t0 + BEAT * 1.5, doum(0.7), 0.4 * level, 0);
  [1, 2, 3, 3.5].forEach((b) => { put(t0 + BEAT * b, tak(), 0.28 * level, 0.15); put(t0 + BEAT * b, jingle(), 0.05 * level, -0.1); });
  // santur eighths, with sixteenth tremolo on the last beat when dense
  m.forEach((d, i) => put(t0 + i * BEAT / 2, santur(deg(d), 1.3, 0.55 + 0.1 * (i % 2)), (i % 2 ? 0.26 : 0.34) * level, i % 2 ? 0.35 : -0.35));
  if (dense) for (let k = 0; k < 4; k++) put(t0 + BEAT * 3 + k * BEAT / 4, santur(deg(m[7] + 7), 0.4, 0.7), 0.12 * level, 0.4);
  put(t0, santur(deg(m[0] - 7), 2.0, 0.4), 0.22 * level, 0); // low course on the downbeat
}
let bi = 0;
for (let t0 = 3.75; t0 < 22.4; t0 += BAR, bi++) {
  const lvl = 0.8 + 0.2 * Math.min(1, (t0 - 3.75) / 15);
  grooveBar(t0, motifs[Math.floor(bi / 2) % motifs.length], lvl, t0 > 16);
}

// ---------- breath + tear ----------
put(21.9, riser(1.1), 0.25, 0);
put(23.0, tear(), 0.55, 0.2);

// ---------- Chartagh reveal ----------
put(24.0, doum(0.8), 0.35, 0);
put(24.85, doum(1.6), 0.85, 0); put(24.85, jingle(0.8), 0.12, 0);
[14, 12, 11, 9, 7].forEach((d, i) => put(24.85 + i * 0.09, santur(deg(d), 1.8, 0.7), 0.32, i % 2 ? 0.3 : -0.3));
for (let t0 = 25.0, k = 0; t0 < 28.7; t0 += BAR, k++) grooveBar(t0, motifs[(k + 1) % motifs.length], 0.95, false);
put(26.0, doum(0.5), 0.5, -0.3);                       // stamp thump
put(26.0, noiseBurst(0.08, 0.6, 60), 0.2, -0.3);
// final chord rings out
[0, 2, 4, 7].forEach((d, i) => put(28.75 + i * 0.03, santur(deg(d), 1.25, 0.5), 0.3, (i - 1.5) * 0.25));

// ---------- paper slaps & tape on the composition's cue times ----------
[1.75, 4.75, 5.3, 9.85, 10.2, 14.75, 24.5, 25.55, 25.75, 26.5].forEach((t) => {
  put(t + 0.12, doum(0.25), 0.12, 0); put(t + 0.12, noiseBurst(0.1, 0.5, 40), 0.1, 0);
});
[2.05, 5.1, 5.55, 10.15, 10.45, 15.05, 15.15, 25.75, 25.95, 26.8].forEach((t) => put(t, noiseBurst(0.18, 0.25, 18), 0.07, 0.3));

// ---------- room (light Schroeder reverb), fade, normalize ----------
function reverb(x) {
  const y = new Float32Array(N);
  for (const [d, g] of [[1557, 0.8], [1617, 0.79], [1491, 0.78], [1422, 0.77]]) {
    const b = new Float32Array(d); let k = 0;
    for (let i = 0; i < N; i++) { const o = b[k]; b[k] = x[i] + o * g; y[i] += o * 0.25; k = (k + 1) % d; }
  }
  for (const [d, g] of [[225, 0.5], [556, 0.5]]) {
    const b = new Float32Array(d); let k = 0;
    for (let i = 0; i < N; i++) { const o = b[k]; const v = y[i] + o * g; b[k] = v; y[i] = o - g * v; k = (k + 1) % d; }
  }
  return y;
}
const wl = reverb(L), wr = reverb(R);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, fade = Math.min(1, t / 0.15) * Math.min(1, (DUR - t) / 1.2);
  L[i] = (L[i] + 0.22 * wl[i]) * fade; R[i] = (R[i] + 0.22 * wr[i]) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const g = 0.89 / peak;

const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8);
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
}
mkdirSync(new URL('../assets/audio/', import.meta.url), { recursive: true });
writeFileSync(new URL('../assets/audio/score.wav', import.meta.url), buf);
console.log('score.wav', DUR + 's', 'peak gain', g.toFixed(2));
