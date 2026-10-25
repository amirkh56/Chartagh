'use client';
import { Fragment, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, as = 'div', delay = 0, y = 40, className, ...rest }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

// Word-by-word rise. Persian letters join, so we split on words only — never characters.
export function Words({ text, className = '', delay = 0, stagger = 0.06, animate }) {
  const words = text.split(' ');
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } } : { animate: animate ? 'show' : 'hide' };
  return (
    <motion.span
      className={`words ${className}`}
      initial="hide"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="words__mask">
            <motion.span
              className="words__w"
              variants={{ hide: { y: '115%', rotate: -4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
}

// Pulls its child toward the cursor a little — classic agency button feel.
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// 3D tilt card; also exposes --gx/--gy for a glare highlight in CSS.
export function Tilt({ children, className = '', max = 9, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        px.set(nx);
        py.set(ny);
        ref.current.style.setProperty('--gx', `${nx * 100}%`);
        ref.current.style.setProperty('--gy', `${ny * 100}%`);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Spotlight: sets --sx/--sy on the element so a masked pattern lights up under the cursor.
export const spot = {
  onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty('--sx', `-999px`);
    e.currentTarget.style.setProperty('--sy', `-999px`);
  },
};
