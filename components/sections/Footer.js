'use client';
import { useLenis } from 'lenis/react';
import { TransitionLink } from '../Transition';
import Logo from '../Logo';
import { TileBand, Pattern, Arrow } from '../Ornaments';
import { spot } from '../motion';
import { useLang } from '../Lang';

// placeholders until the real profiles exist
const SOCIAL_HREFS = ['#', '#', '#', '#'];

export default function Footer() {
  const lenis = useLenis();
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="footer">
      <TileBand className="footer__band" />
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" title={t.common.brand} />
            <p>
              {f.desc1}
              <br />
              {f.desc2}
            </p>
          </div>
          <nav className="footer__col" aria-label={f.nav}>
            <h2 className="footer__h">{f.quick}</h2>
            {t.nav.map((n) => (
              <TransitionLink key={n.href} href={n.href}>
                {n.label}
              </TransitionLink>
            ))}
          </nav>
          <div className="footer__col">
            <h2 className="footer__h">{f.social}</h2>
            {f.socials.map((label, i) => (
              <a key={label} href={SOCIAL_HREFS[i]} rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <h2 className="footer__h">{f.contact}</h2>
            <a href="mailto:hello@chartagh.agency">hello@chartagh.agency</a>
            <span>{f.hours}</span>
          </div>
        </div>

        <div className="footer__word" aria-hidden {...spot}>
          <Pattern name="herati" className="footer__word-pat" />
          <span>{f.word}</span>
        </div>

        <div className="footer__bottom">
          <span>{f.copy}</span>
          <button className="to-top" onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}>
            {f.top} <Arrow className="arrow--up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
