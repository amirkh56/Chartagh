'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { starStr } from '@/lib/patterns';

const STAR = starStr(0, 0, 46);
const HOVER = '[data-cursor],a,button,input,textarea,select,label,[role="button"],summary';

export default function Cursor() {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState('');
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setOn(true);
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.(HOVER);
      if (!t) return setMode(''), setLabel('');
      if (t.dataset.cursor) return setMode('label'), setLabel(t.dataset.cursor);
      if (t.matches('input,textarea,select')) return setMode('text'), setLabel('');
      setMode('hover');
      setLabel('');
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const out = (e) => {
      if (!e.relatedTarget) {
        x.set(-100);
        y.set(-100);
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerout', out);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerout', out);
    };
  }, [x, y]);

  if (!on) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden />
      <motion.div className={`cursor ${mode ? `is-${mode}` : ''} ${down ? 'is-down' : ''}`} style={{ x: rx, y: ry }} aria-hidden>
        <svg viewBox="-50 -50 100 100" className="cursor__star">
          <polygon points={STAR} />
        </svg>
        <span className="cursor__label">{label}</span>
      </motion.div>
    </>
  );
}
