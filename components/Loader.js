'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Logo from './Logo';
import { Pattern } from './Ornaments';
import { fa } from '@/lib/patterns';

export const LoadCtx = createContext({ loaded: true, setLoaded: () => {} });
export const useLoaded = () => useContext(LoadCtx).loaded;

const DOOR = { duration: 1.1, ease: [0.76, 0, 0.24, 1] };
const TILES = 10;

export default function Loader() {
  const { loaded, setLoaded } = useContext(LoadCtx);
  const [n, setN] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    loaded ? lenis.start() : lenis.stop();
  }, [lenis, loaded]);

  useEffect(() => {
    let ready = false;
    let raf;
    let doneTimer;
    const pageLoad = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    Promise.all([document.fonts?.ready, pageLoad]).then(() => (ready = true));

    const start = performance.now();
    const tick = (t) => {
      // ease toward 90% on a timer, finish only when fonts + page are really ready
      const k = Math.min(1, (t - start) / 1700);
      const target = ready && k === 1 ? 100 : 90;
      const p = Math.min(target, Math.round(100 * (1 - Math.pow(1 - k, 3))));
      setN(p);
      if (p >= 100) {
        doneTimer = setTimeout(() => setLoaded(true), 380);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(doneTimer);
    };
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div className="loader" key="loader" initial="show" animate="show" exit="exit" aria-live="polite" aria-label="در حال بارگذاری">
          <motion.div className="loader__door loader__door--a" variants={{ exit: { x: '101%', transition: DOOR } }}>
            <Pattern name="herati" className="loader__pat" />
          </motion.div>
          <motion.div className="loader__door loader__door--b" variants={{ exit: { x: '-101%', transition: DOOR } }}>
            <Pattern name="herati" className="loader__pat" />
          </motion.div>
          <motion.div
            className="loader__center"
            variants={{ exit: { opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } } }}
          >
            <Logo animated className="loader__logo" />
            <div className="loader__word">چارطاق</div>
            <div className="loader__tiles" aria-hidden>
              {Array.from({ length: TILES }, (_, i) => (
                <i key={i} className={n >= ((i + 1) * 100) / TILES ? 'on' : ''} />
              ))}
            </div>
            <div className="loader__count">
              {fa(n)}
              <small>٪</small>
            </div>
            <p className="loader__hint">در حال چیدن کاشی‌ها…</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
