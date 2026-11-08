// Original 30 s score for the Chartagh promo: `node scripts/score.mjs` → assets/audio/score.wav
// Calm half-time electronic at 92.5 BPM so the video's two-beat cuts stay on the grid:
// warm pad (Dm9 → Bbmaj7 → Gm9 → Asus) + heartbeat in act 1, soft drums/sub/pluck from the
// 12.1 s drop, breakdown at 22.5 s, impact and held chord on the logo at 25.3 s. Seeded, deterministic.
import { writeFileSync, mkdirSync } from 'node:fs';

const SR = 44100, DUR = 30, N = SR * DUR, B = 0.649, BAR = 4 * B, DROP = 12.1;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
function put(t, sig, g, pan = 0) {
  const gl = g * Math.cos((pan + 1) * Math.PI / 4), gr = g * Math.sin((pan + 1) * Math.PI / 4), o = Math.floor(t * SR);
  for (let i = 0; i < sig.length; i++) { const k = o + i; if (k >= 0 && k < N) { L[k] += sig[i] * gl; R[k] += sig[i] * gr; } }
}
const env = (i, n, a, r) => Math.min(1, i / (a * SR)) * Math.min(1, (n - i) / (r * SR));

// warm pad: 3 detuned saws per note through a two-pole lowpass
function pad(notes, len, cut = 900) {
  const n = Math.floor(len * SR), o = new Float32Array(n);
  for (const m of notes) for (const d of [-0.11, 0, 0.12]) {
    const f = hz(m + d); let ph = rnd(), a = 0, b = 0; const k = 1 - Math.exp(-2 * Math.PI * cut / SR);
    for (let i = 0; i < n; i++) { ph += f / SR; ph -= Math.floor(ph); const s = 2 * ph - 1; a += k * (s - a); b += k * (a - b); o[i] += b * env(i, n, 0.9, 1.2) / 6; }
  }
  return o;
}
// soft electric-piano: sine + bell partial, quick decay
function keys(m, len = 1.6) {
  const n = Math.floor(len * SR), o = new Float32Array(n), f = hz(m);
  for (let i = 0; i < n; i++) { const t = i / SR; o[i] = (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 3.01 * t) * Math.exp(-t * 6)) * Math.exp(-t * 2.2) * Math.min(1, t * 300); }
  return o;
}
function pluck(m) {
  const n = Math.floor(0.5 * SR), o = new Float32Array(n), f = hz(m); let a = 0;
  for (let i = 0; i < n; i++) { const t = i / SR, s = ((f * t) % 1) * 2 - 1, k = 0.04 + 0.5 * Math.exp(-t * 18); a += k * (s - a); o[i] = a * Math.exp(-t * 7) * Math.min(1, t * 500); }
  return o;
}
function sub(m, len) {
  const n = Math.floor(len * SR), o = new Float32Array(n), f = hz(m);
  for (let i = 0; i < n; i++) o[i] = Math.sin(2 * Math.PI * f * i / SR) * env(i, n, 0.02, 0.15);
  return o;
}
function kick(big = 1) {
  const n = Math.floor(0.5 * SR), o = new Float32Array(n); let ph = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; ph += 2 * Math.PI * (45 + 90 * Math.exp(-t * 35)) / SR; o[i] = Math.tanh(Math.sin(ph) * 1.6) * Math.exp(-t * (7 / big)); }
  return o;
}
function snare() {
  const n = Math.floor(0.35 * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const t = i / SR, w = rnd() * 2 - 1; lp += 0.3 * (w - lp); o[i] = ((w - lp) * 0.7 * Math.exp(-t * 14) + Math.sin(2 * Math.PI * 190 * t) * 0.4 * Math.exp(-t * 25)); }
  return o;
}
function hat(open = false) {
  const n = Math.floor((open ? 0.25 : 0.06) * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const w = rnd() * 2 - 1; lp += 0.6 * (w - lp); o[i] = (w - lp) * Math.exp(-(i / SR) * (open ? 14 : 60)); }
  return o;
}
function heartbeat() { const a = kick(0.6), o = new Float32Array(Math.floor(0.6 * SR)); for (let i = 0; i < a.length && i < o.length; i++) o[i] += a[i]; const off = Math.floor(0.2 * SR); for (let i = 0; i + off < o.length && i < a.length; i++) o[i + off] += a[i] * 0.6; return o; }
function riser(len) {
  const n = Math.floor(len * SR), o = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const p = i / n, w = rnd() * 2 - 1; lp += (0.01 + 0.4 * p * p) * (w - lp); o[i] = lp * p * p * 1.6; }
  return o;
}
function impact() {
  const n = Math.floor(2.2 * SR), o = new Float32Array(n); let ph = 0, lp = 0;
  for (let i = 0; i < n; i++) { const t = i / SR, w = rnd() * 2 - 1; lp += 0.08 * (w - lp); ph += 2 * Math.PI * (38 + 60 * Math.exp(-t * 4)) / SR; o[i] = Math.sin(ph) * Math.exp(-t * 1.6) + lp * 0.8 * Math.exp(-t * 3); }
  return o;
}

// Dm9 → Bbmaj7 → Gm9 → Asus
const CH = [[50, 57, 60, 64, 65], [46, 53, 57, 62, 64], [43, 50, 53, 57, 62], [45, 52, 55, 57, 62]];
const ROOT = [38, 34, 31, 33];

// ---------- act 1: pad, sparse keys, heartbeat ----------
const SEG = 3.025; // four pad chords across the 12.1 s intro
for (let c = 0; c < 4; c++) put(c * SEG, pad(CH[c], SEG + 1.2, 700), 0.16, 0);
[[0.3, 69], [2.35, 72], [4.3, 69], [6.5, 74], [7.8, 72], [9.25, 69]].forEach(([t, m], i) => put(t, keys(m, 2.2), 0.22, i % 2 ? 0.3 : -0.3));
for (let t = 4.3; t < 11.6; t += 2 * B) put(t, heartbeat(), 0.38, 0);
put(10.3, riser(1.75), 0.3, 0);
[11.0, 11.35, 11.7].forEach((t) => put(t, hat(true), 0.12, 0.2));

// ---------- act 2: the drop ----------
put(DROP, impact(), 0.5, 0);
for (let bar = 0; DROP + bar * BAR < 22.5; bar++) {
  const t0 = DROP + bar * BAR, c = bar % 4;
  put(t0, pad(CH[c], BAR + 0.8, 1300), 0.14, 0);
  put(t0, sub(ROOT[c], BAR - 0.05), 0.32, 0);
  put(t0, kick(), 0.6, 0); put(t0 + 2.5 * B, kick(0.7), 0.35, 0);
  put(t0 + 2 * B, snare(), 0.36, 0.05);
  for (let e = 0; e < 8; e++) put(t0 + e * B / 2 + (e % 2 ? 0.03 : 0), hat(e === 7), e % 2 ? 0.05 : 0.08, 0.25);
  const arp = [CH[c][1] + 12, CH[c][2] + 12, CH[c][3] + 12, CH[c][2] + 12];
  for (let e = 0; e < 8; e++) put(t0 + e * B / 2, pluck(arp[e % 4]), 0.1, e % 2 ? 0.45 : -0.45);
}
for (let i = 1; i < 8; i++) put(DROP + i * 2 * B, hat(true), 0.06, -0.3);

// ---------- breakdown → logo ----------
put(22.5, pad(CH[1], 3.2, 900), 0.17, 0);
[[22.6, 69], [23.25, 72], [24.0, 74]].forEach(([t, m], i) => put(t, keys(m, 2), 0.24, i % 2 ? 0.3 : -0.3));
put(23.6, riser(1.7), 0.32, 0);
put(25.3, impact(), 0.62, 0);
put(25.3, pad([38, 50, 57, 62, 64, 69], 4.9, 1100), 0.2, 0);
put(25.3, sub(38, 4.5), 0.3, 0);
[[25.3, 74], [25.95, 76], [26.6, 81]].forEach(([t, m], i) => put(t, keys(m, 2.6), 0.2, i % 2 ? 0.35 : -0.35));

// ---------- room, fade, normalise ----------
function reverb(x) {
  const y = new Float32Array(N);
  for (const [d, g] of [[1687, 0.84], [1601, 0.83], [2053, 0.82], [2251, 0.81]]) { const b = new Float32Array(d); let k = 0; for (let i = 0; i < N; i++) { const o = b[k]; b[k] = x[i] + o * g; y[i] += o * 0.25; k = (k + 1) % d; } }
  for (const [d, g] of [[347, 0.6], [113, 0.6]]) { const b = new Float32Array(d); let k = 0; for (let i = 0; i < N; i++) { const o = b[k], v = y[i] + o * g; b[k] = v; y[i] = o - g * v; k = (k + 1) % d; } }
  return y;
}
const wl = reverb(L), wr = reverb(R);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, f = Math.min(1, t / 0.2) * Math.min(1, (DUR - t) / 1.8);
  L[i] = Math.tanh((L[i] + 0.3 * wl[i]) * 1.2) * f; R[i] = Math.tanh((R[i] + 0.3 * wr[i]) * 1.2) * f;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const g = 0.9 / peak, buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(L[i] * g * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * g * 32767), 46 + i * 4); }
mkdirSync(new URL('../assets/audio/', import.meta.url), { recursive: true });
writeFileSync(new URL('../assets/audio/score.wav', import.meta.url), buf);
console.log('score.wav ok, gain', g.toFixed(2));
