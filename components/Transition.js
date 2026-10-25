'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Logo from './Logo';
import { Pattern } from './Ornaments';

const Ctx = createContext({ go: () => {} });
const EASE = [0.76, 0, 0.24, 1];

const CURTAIN = {
  idle: { y: '115%', transition: { duration: 0 } },
  in: { y: '0%', transition: { duration: 0.75, ease: EASE } },
  out: { y: '-115%', transition: { duration: 0.85, ease: EASE, delay: 0.2 } },
};

export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [phase, setPhase] = useState('idle');
  const pending = useRef(null);

  const scrollTo = useCallback(
    (hash, immediate) => {
      const el = hash ? document.querySelector(hash) : null;
      if (hash && !el) return;
      if (lenis) lenis.scrollTo(el ?? 0, { immediate, offset: -10, duration: 1.4, force: true });
      else el ? el.scrollIntoView() : window.scrollTo(0, 0);
    },
    [lenis]
  );

  const go = useCallback(
    (href) => {
      const [rawPath, h] = href.split('#');
      const path = rawPath || pathname;
      const hash = h ? `#${h}` : '';
      if (path === pathname) return scrollTo(hash, false);
      if (phase !== 'idle') return;
      pending.current = { path, hash };
      setPhase('in');
    },
    [pathname, phase, scrollTo]
  );

  useEffect(() => {
    if (phase !== 'in' || !pending.current || pathname !== pending.current.path) return;
    // new page is mounted under the curtain: jump to place, then lift the curtain
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const { hash } = pending.current;
    const t = setTimeout(() => {
      if (hash) scrollTo(hash, true);
      setPhase('out');
    }, 120);
    return () => clearTimeout(t);
  }, [pathname, phase, lenis, scrollTo]);

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <motion.div
        className="curtain"
        aria-hidden
        initial="idle"
        animate={phase}
        variants={CURTAIN}
        onAnimationComplete={(def) => {
          if (def === 'in' && pending.current) router.push(pending.current.path, { scroll: false });
          if (def === 'out') {
            pending.current = null;
            setPhase('idle');
          }
        }}
      >
        <Pattern name="boteh" className="curtain__pat" />
        <div className="curtain__center">
          <Logo className="curtain__logo" />
          <span>لطفاً چند لحظه صبر کنید…</span>
        </div>
      </motion.div>
    </Ctx.Provider>
  );
}

export function TransitionLink({ href, onClick, children, ...rest }) {
  const { go } = useContext(Ctx);
  return (
    <Link
      href={href}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || rest.target) return;
        e.preventDefault();
        go(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
