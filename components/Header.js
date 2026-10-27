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
import { useLang } from './Lang';
import { switchPath } from '@/lib/i18n';

const EASE = [0.76, 0, 0.24, 1];

// The other language. A full page load (not a client transition) so <html lang/dir> swap cleanly.
function LangSwitch({ className = '' }) {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const other = lang === 'fa' ? 'en' : 'fa';
  return (
    <a href={switchPath(pathname, other)} hrefLang={other} lang={other} className={`lang-switch ${className}`} aria-label={t.switcher.aria} data-cursor={t.switcher.title}>
      {t.switcher.label}
    </a>
  );
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  const loaded = useLoaded();
  const { t, n, href } = useLang();

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

  const isActive = (to) => !to.includes('#') && to !== '/' && pathname.startsWith(href(to));

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
          <TransitionLink href="/" className="brand" aria-label={t.common.homeAria} onClick={closeMenu}>
            <span className="brand__mark">
              <Logo className="brand__logo" title={t.common.brand} />
            </span>
            <span className="brand__text">
              <span className="brand__name">{t.common.brand}</span>
              <span className="brand__tag">{t.common.tagline}</span>
            </span>
          </TransitionLink>

          <nav className="nav" aria-label={t.header.mainNav}>
            {t.nav.map((item, i) => (
              <motion.span
                key={item.href}
                className="nav__item"
                initial={{ opacity: 0, y: -12 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TransitionLink href={item.href} className={`nav__link ${isActive(item.href) ? 'is-active' : ''}`} aria-current={isActive(item.href) ? 'page' : undefined}>
                  <span className="nav__arch" aria-hidden />
                  <span className="nav__label">{item.label}</span>
                </TransitionLink>
              </motion.span>
            ))}
          </nav>

          <div className="header__actions">
            <LangSwitch />
            <ThemeToggle />
            <TransitionLink href="/contact" className="btn btn--primary btn--sm header__cta">
              <span>{t.common.start}</span>
              <Arrow />
            </TransitionLink>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? t.header.close : t.header.open}>
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
            <nav className="menu__nav container" aria-label={t.header.mobileNav}>
              {t.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <TransitionLink href={item.href} className="menu__link" onClick={closeMenu}>
                    <small>{n(`0${i + 1}`)}</small>
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot container">
              <span>hello@chartagh.agency</span>
              <LangSwitch className="lang-switch--menu" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
