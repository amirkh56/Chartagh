'use client';
import { motion } from 'framer-motion';

// Isometric چارطاق: a cube whose two visible faces are cut by Persian pointed arches,
// with a pixel «۴» on the roof. Built from the brand sheet in /refs.
const H = 112;
const N = [100, 0];
const E = [186.6, 50];
const S = [100, 100];
const W = [13.4, 50];

const lerp2 = (o, a, b, u, v) => [o[0] + a[0] * u + b[0] * v, o[1] + a[1] * u + b[1] * v];
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const pt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

const left = (u, v) => lerp2(W, sub(S, W), [0, H], u, v);
const right = (u, v) => lerp2(S, sub(E, S), [0, H], u, v);
const top = (a, b) => lerp2(S, sub(E, S), sub(W, S), a, b);

function archFace(F, m = 0.21, sp = 0.6, ap = 0.3) {
  return (
    `M${pt(F(0, 0))} L${pt(F(1, 0))} L${pt(F(1, 1))} L${pt(F(1 - m, 1))} L${pt(F(1 - m, sp))} ` +
    `C${pt(F(1 - m, sp - 0.2))} ${pt(F(0.56, ap + 0.08))} ${pt(F(0.5, ap))} ` +
    `C${pt(F(0.44, ap + 0.08))} ${pt(F(m, sp - 0.2))} ${pt(F(m, sp))} L${pt(F(m, 1))} L${pt(F(0, 1))}Z`
  );
}

const LEFT = archFace(left);
const RIGHT = archFace(right);
const TOP = `M${pt(S)} L${pt(E)} L${pt(N)} L${pt(W)}Z`;
const cell = (i, j) =>
  `M${pt(top(i / 3, j / 3))} L${pt(top((i + 1) / 3, j / 3))} L${pt(top((i + 1) / 3, (j + 1) / 3))} L${pt(top(i / 3, (j + 1) / 3))}Z`;
const CELLS = [cell(0, 2) + cell(1, 2), cell(2, 1)];
const GAP = `M${pt(W)} L${pt(S)} L${pt(E)} M${pt(S)} L${pt([S[0], S[1] + H])}`;

const ease = [0.22, 1, 0.36, 1];

export default function Logo({ className = '', animated = false, title = 'چارطاق' }) {
  const piece = (i, from) =>
    animated
      ? {
          initial: { opacity: 0, ...from },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.16, ease },
        }
      : {};

  return (
    <svg className={`logo ${className}`} viewBox="6 -6 188 226" role="img" aria-label={title}>
      <motion.path d={LEFT} fill="var(--logo-left)" {...piece(0, { x: -24, y: 14 })} />
      <motion.path d={RIGHT} fill="var(--logo-right)" {...piece(1, { x: 24, y: 14 })} />
      <motion.g {...piece(2, { y: -30 })}>
        <path d={TOP} fill="var(--logo-top)" />
        {CELLS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="var(--logo-cell)"
            {...(animated
              ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.95 + i * 0.15, duration: 0.5 } }
              : {})}
          />
        ))}
      </motion.g>
      <path d={GAP} fill="none" stroke="var(--logo-gap)" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
