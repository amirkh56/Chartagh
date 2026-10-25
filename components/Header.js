'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from './Transition';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Pattern, Shamseh } from './Ornaments';
import { fa } from '@/lib/patterns';

export const NAV = [
  { href: '/#services', label: 'خدمات' },
  { href: '/#showcase', label: 'هنر طراحی سایت' },
  { href: '/#process', label: 'فرایند' },
  { href: '/work', label: 'نمونه‌کارها' },
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

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
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
        animate={{ y: hidden && !open ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header__inner container">
          <TransitionLink href="/" className="brand" aria-label="چارطاق، صفحه اصلی" onClick={closeMenu}>
            <Logo className="brand__logo" />
            <span className="brand__name">چارطاق</span>
          </TransitionLink>
          <nav className="nav" aria-label="منوی اصلی">
            {NAV.map((n) => (
              <TransitionLink key={n.href} href={n.href} className="nav__link">
                {n.label}
              </TransitionLink>
            ))}
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <TransitionLink href="/contact" className="btn btn--primary btn--sm header__cta">
              <span>بزن بریم</span>
            </TransitionLink>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? 'بستن منو' : 'باز کردن منو'}>
              <span />
              <span />
            </button>
          </div>
        </div>
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
            <Pattern name="khatam" className="menu__pat" />
            <Shamseh className="menu__shamseh" />
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
            <p className="menu__foot container">یه چای مهمون ما؟ hello@chartagh.ir</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
