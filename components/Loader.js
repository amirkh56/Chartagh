'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Logo from './Logo';
import { Pattern } from './Ornaments';
import { useLang } from './Lang';

export const LoadCtx = createContext({ loaded: true, setLoaded: () => {} });
export const useLoaded = () => useContext(LoadCtx).loaded;

const DOOR = { duration: 1.1, ease: [0.76, 0, 0.24, 1] };
const TILES = 10;
const SEEN = 'chartagh-intro';

export default function Loader() {
  const { loaded, setLoaded } = useContext(LoadCtx);
  const { t, n: num, lang } = useLang();
  const [n, setN] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    loaded ? lenis.start() : lenis.stop();
  }, [lenis, loaded]);

  useEffect(() => {
    // the full intro plays once per visit; later page loads in the same tab get a quick fade
    let quick = false;
    try {
      quick = sessionStorage.getItem(SEEN) === '1';
      sessionStorage.setItem(SEEN, '1');
    } catch {}
    const minTime = quick ? 250 : 1100;

    let ready = false;
    let raf;
    let doneTimer;
    const pageLoad = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    // never hold the page hostage to a slow third party: give up waiting after 3s
    Promise.race([Promise.all([document.fonts?.ready, pageLoad]), new Promise((r) => setTimeout(r, 3000))]).then(() => (ready = true));

    const start = performance.now();
    const tick = (time) => {
      const k = Math.min(1, (time - start) / minTime);
      const target = ready && k === 1 ? 100 : 90;
      const p = Math.min(target, Math.round(100 * (1 - Math.pow(1 - k, 3))));
      setN(p);
      if (p >= 100) {
        doneTimer = setTimeout(() => setLoaded(true), quick ? 0 : 300);
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
        <motion.div className="loader" key="loader" initial="show" animate="show" exit="exit" aria-live="polite" aria-label={t.common.loading}>
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
            <Logo animated className="loader__logo" title={t.common.brand} />
            <div className="loader__word">{t.common.brand}</div>
            <div className="loader__tiles" aria-hidden>
              {Array.from({ length: TILES }, (_, i) => (
                <i key={i} className={n >= ((i + 1) * 100) / TILES ? 'on' : ''} />
              ))}
            </div>
            <div className="loader__count">
              {num(n)}
              <small>{lang === 'fa' ? '٪' : '%'}</small>
            </div>
            <p className="loader__hint">{t.loader.hint}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
