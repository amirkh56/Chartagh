'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from './Transition';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Pattern, Toranj, TileBand, Arrow } from './Ornaments';
import { useLoaded } from './Loader';
import { fa } from '@/lib/patterns';

export const NAV = [
  { href: '/#services', label: 'خدمات' },
  { href: '/#work', label: 'نمونه‌کارها' },
  { href: '/#showcase', label: 'طراحی سایت' },
  { href: '/#process', label: 'فرایند' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس' },
];

const EASE = [0.76, 0, 0.24, 1];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  const loaded = useLoaded();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 260);
    setScrolled(y > 24);
  });

  // start() resets Lenis, so it must run *before* a menu link kicks off its scroll
  const closeMenu = () => {
    lenis?.start();
    setOpen(false);
  };

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!lenis) return;
    open ? lenis.stop() : lenis.start();
  }, [open, lenis]);
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: '-120%' }}
        animate={{ y: loaded && !(hidden && !open) ? '0%' : '-120%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header__bar container">
          <span className="header__lachak header__lachak--r" aria-hidden />
          <span className="header__lachak header__lachak--l" aria-hidden />
          <TransitionLink href="/" className="brand" aria-label="چارطاق، صفحه‌ی اصلی" onClick={closeMenu}>
            <span className="brand__mark">
              <Logo className="brand__logo" />
            </span>
            <span className="brand__text">
              <span className="brand__name">چارطاق</span>
              <span className="brand__tag">آژانس تبلیغاتی</span>
            </span>
          </TransitionLink>

          <nav className="nav" aria-label="منوی اصلی">
            {NAV.map((n, i) => (
              <motion.span
                key={n.href}
                className="nav__item"
                initial={{ opacity: 0, y: -12 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TransitionLink href={n.href} className={`nav__link ${pathname === n.href ? 'is-active' : ''}`}>
                  <span className="nav__arch" aria-hidden />
                  <span className="nav__label">{n.label}</span>
                </TransitionLink>
              </motion.span>
            ))}
          </nav>

          <div className="header__actions">
            <ThemeToggle />
            <TransitionLink href="/contact" className="btn btn--primary btn--sm header__cta">
              <span>شروع همکاری</span>
              <Arrow />
            </TransitionLink>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? 'بستن منو' : 'باز کردن منو'}>
              <span />
              <span />
            </button>
          </div>
        </div>
        <TileBand className="header__band" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: EASE } }}
            exit={{ clipPath: 'inset(100% 0 0 0)', transition: { duration: 0.6, ease: EASE } }}
          >
            <Pattern name="herati" className="menu__pat" />
            <Toranj className="menu__toranj" />
            <nav className="menu__nav container" aria-label="منوی موبایل">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <TransitionLink href={n.href} className="menu__link" onClick={closeMenu}>
                    <small>{fa(`0${i + 1}`)}</small>
                    {n.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>
            <p className="menu__foot container">hello@chartagh.ir</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
