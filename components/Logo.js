'use client';
import { motion } from 'framer-motion';

import { LEFT, RIGHT, TOP, CELLS, GAP } from '@/lib/logo';

const ease = [0.22, 1, 0.36, 1];

export default function Logo({ className = '', animated = false, title = 'Chartagh' }) {
  const piece = (i, from) =>
    animated
      ? {
          initial: { opacity: 0, ...from },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.16, ease },
        }
      : {};

  return (
    <svg className={`logo ${className}`} viewBox="8 -4 184 208" role="img" aria-label={title}>
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
      <path d={GAP} fill="none" stroke="var(--logo-gap)" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}
