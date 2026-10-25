'use client';
import { useLenis } from 'lenis/react';
import { TransitionLink } from '../Transition';
import { NAV } from '../Header';
import Logo from '../Logo';
import { TileBand, Pattern, Arrow } from '../Ornaments';
import { spot } from '../motion';

const SOCIAL = [
  { label: 'اینستاگرام', href: '#' },
  { label: 'تلگرام', href: '#' },
  { label: 'لینکدین', href: '#' },
  { label: 'بیهنس', href: '#' },
];

export default function Footer() {
  const lenis = useLenis();
  return (
    <footer className="footer">
      <TileBand className="footer__band" />
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p>
              چارطاق؛ آژانس خلاق طراحی سایت، پوستر، سه‌بعدی و سئو.
              <br />
              پنج ساله با عشق، چای و هنر ایرانی می‌سازیم.
            </p>
          </div>
          <nav className="footer__col" aria-label="لینک‌های فوتر">
            <h4>سر بزن</h4>
            {NAV.map((n) => (
              <TransitionLink key={n.href} href={n.href}>
                {n.label}
              </TransitionLink>
            ))}
          </nav>
          <div className="footer__col">
            <h4>پیدامون کن</h4>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <h4>سلام برسون</h4>
            <a href="mailto:hello@chartagh.ir">hello@chartagh.ir</a>
            <span>هر جا که اینترنت باشه، ما هم هستیم</span>
          </div>
        </div>

        <div className="footer__word" aria-hidden {...spot}>
          <Pattern name="khatam" className="footer__word-pat" />
          <span>چارطاق</span>
        </div>

        <div className="footer__bottom">
          <span>© ۱۴۰۵ چارطاق — آجر به آجر، با عشق ساخته شده.</span>
          <button className="to-top" onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}>
            برگرد بالا <Arrow className="arrow--up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
