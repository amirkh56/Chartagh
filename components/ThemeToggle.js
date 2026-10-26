'use client';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/useTheme';
import { starStr } from '@/lib/patterns';
import { useLang } from './Lang';

export default function ThemeToggle() {
  const theme = useTheme();
  const night = theme === 'night';
  const { t } = useLang();

  const toggle = (e) => {
    const next = night ? 'day' : 'night';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('chartagh-theme', next);
      } catch {}
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) return apply();
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => flushSync(apply)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.7,0,.25,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={night ? t.theme.day : t.theme.night} data-cursor={night ? t.theme.day : t.theme.night}>
      <motion.svg viewBox="-50 -50 100 100" animate={{ rotate: night ? 180 : 0 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
        <motion.polygon points={starStr(0, 0, 44, 8)} fill="var(--sun)" animate={{ scale: night ? 0 : 1 }} />
        <motion.circle r="22" fill="var(--sun-core)" animate={{ scale: night ? 0 : 1 }} />
        <motion.g animate={{ scale: night ? 1 : 0, opacity: night ? 1 : 0 }}>
          <path d="M14 -30 A32 32 0 1 0 14 30 A24 24 0 1 1 14 -30Z" fill="var(--moon)" transform="rotate(180)" />
          <polygon points={starStr(-12, -6, 9, 8)} fill="var(--moon)" transform="rotate(180)" />
        </motion.g>
      </motion.svg>
    </button>
  );
}
