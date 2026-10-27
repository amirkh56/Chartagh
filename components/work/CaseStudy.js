'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { TransitionLink } from '../Transition';
import { Arrow, Icon, Pattern } from '../Ornaments';
import { Reveal, Words, Magnetic, EASE } from '../motion';
import { useLoaded } from '../Loader';
import { useLang } from '../Lang';
import { Browser, Phone, Tablet, Slice } from './Devices';
import { catOf, loc, projectPath, PROJECTS, shot } from '@/lib/work';

const fill = (s, map) => Object.entries(map).reduce((acc, [k, v]) => acc.replace(`{${k}}`, v), s);

// a project not online yet (no url) shows a disabled "coming soon" pill instead of the link
function Visit({ p, label, light = false }) {
  const { t } = useLang();
  if (!p.url)
    return (
      <span className={`btn ${light ? 'btn--light' : 'btn--primary'} is-soon`} aria-disabled="true">
        <span>{t.caseStudy.soon}</span>
      </span>
    );
  return (
    <Magnetic>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className={`btn ${light ? 'btn--light' : 'btn--primary'}`}>
        <span>{label}</span>
        <Arrow />
      </a>
    </Magnetic>
  );
}

function Swatch({ hex, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="swatch"
      style={{ '--c': hex }}
      onClick={() => {
        navigator.clipboard?.writeText(hex).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      data-cursor={copyLabel}
      aria-label={`${copyLabel} ${hex}`}
    >
      <i />
      <span dir="ltr">{copied ? copiedLabel : hex}</span>
    </button>
  );
}

function Parallax({ v, k, className, children }) {
  const y = useTransform(v, [0, 1], [k, -k]);
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

export default function CaseStudy({ p: raw }) {
  const loaded = useLoaded();
  const { lang, t, n } = useLang();
  const cs = t.caseStudy;
  const p = loc(raw, lang);
  const cat = catOf(p.cat)[lang];
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = loc(PROJECTS[(idx + 1) % PROJECTS.length], lang);
  const alt = (k) => fill(cs.alt[k], { name: p.name });

  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] });
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const rotY = useTransform(mx, [-0.5, 0.5], [5, -5]);

  const facts = [
    [cs.facts.industry, p.industry],
    [cs.facts.type, fill(cs.typeOf, { sub: t.work.subs[p.sub] })],
    [cs.facts.market, p.market],
    [cs.facts.platform, p.platform.join(' · ')],
  ];
  const slices = [0, 22, 44, 66, 100];

  return (
    <article className="case" style={{ '--acc': p.accent, '--tint': p.tint }}>
      {/* ───── header */}
      <header className="case-head container">
        <nav className="crumbs" aria-label={cs.crumbs}>
          <TransitionLink href="/work">{t.work.title}</TransitionLink>
          <span aria-hidden>{cs.sep}</span>
          <TransitionLink href={`/work/${p.cat}`}>{cat.title}</TransitionLink>
          <span aria-hidden>{cs.sep}</span>
          <b aria-current="page">{p.name}</b>
        </nav>
        <motion.p className="case-head__en" dir="ltr" aria-hidden initial={{ opacity: 0, y: 40 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE }}>
          {p.en_name}
        </motion.p>
        <h1 className="case-head__title">
          <Words text={fill(cs.heading, { cat: cat.title, name: p.name })} animate={loaded} delay={0.2} />
        </h1>
        <motion.div className="case-head__row" initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
          <Visit p={p} label={cs.visit} />
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="case-head__domain" dir="ltr">
              {p.domain} ↗
            </a>
          ) : (
            <span className="case-head__domain" dir="ltr">
              {p.domain}
            </span>
          )}
        </motion.div>
        <dl className="facts">
          {facts.map(([k, v], i) => (
            <Reveal key={k} className="facts__item" delay={0.1 * i}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </Reveal>
          ))}
        </dl>
      </header>

      {/* ───── device stage: the whole homepage scrolls in the browser, phones on both sides */}
      <section
        ref={stageRef}
        className="case-stage container"
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
        }}
        onPointerLeave={() => mx.set(0)}
        data-cursor={cs.stageCursor}
      >
        <span className="case-stage__arch" aria-hidden />
        <Pattern name="herati" className="case-stage__pat" />
        <motion.div className="case-stage__rig" style={{ rotateY: rotY }}>
          <Parallax v={scrollYProgress} k={30} className="case-stage__tablet">
            <Tablet p={p} alt={alt('tablet')} />
          </Parallax>
          <div className="case-stage__browser">
            <Browser p={p} alt={alt('desktop')} />
          </div>
          <Parallax v={scrollYProgress} k={70} className="case-stage__phone case-stage__phone--a">
            <Phone p={p} delay="-2s" alt={alt('mobile')} />
          </Parallax>
          <Parallax v={scrollYProgress} k={-50} className="case-stage__phone case-stage__phone--b">
            <Phone p={p} full={false} alt={alt('mobile')} />
          </Parallax>
        </motion.div>
        <p className="case-stage__hint">{cs.stageHint}</p>
      </section>

      {/* ───── chapters */}
      <section className="chapters container">
        <Reveal className="chapter chapter--about">
          <span className="chapter__n">{n('01')}</span>
          <h2>{cs.about}</h2>
          <p>{p.summary}</p>
        </Reveal>
        <Reveal className="chapter chapter--features" delay={0.1}>
          <span className="chapter__n">{n('02')}</span>
          <h2>{cs.features}</h2>
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="chapter chapter--identity" delay={0.2}>
          <span className="chapter__n">{n('03')}</span>
          <h2>{cs.identity}</h2>
          <div className="swatches">
            {p.palette.map((h) => (
              <Swatch key={h} hex={h} copyLabel={cs.copy} copiedLabel={cs.copied} />
            ))}
          </div>
          <div className="idcards">
            <div className="idcard">
              <span>{cs.font}</span>
              <b>{p.font}</b>
              <em aria-hidden>{cs.sample}</em>
            </div>
            <div className="idcard">
              <span>{cs.platform}</span>
              <div className="chips-row">
                {p.platform.map((x) => (
                  <i key={x}>{x}</i>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───── bento of page sections */}
      <section className="slices container" aria-label={cs.slices}>
        <Reveal as="p" className="eyebrow">
          {cs.slices}
        </Reveal>
        <div className="slices__grid">
          {slices.map((at, i) => (
            <Reveal key={at} className={`slices__cell slices__cell--${i}`} delay={i * 0.06}>
              <Slice p={p} at={at} label={alt('slice')} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── mobile parade */}
      <section className="parade" aria-label={cs.mobileEyebrow}>
        <div className="container parade__head">
          <Reveal as="p" className="eyebrow">
            {cs.mobileEyebrow}
          </Reveal>
          <h2 className="sec-title">
            <Words text={cs.mobileTitle} />
          </h2>
        </div>
        <div className="parade__row">
          {[0, 18, 36, 54, 72, 90].map((at, i) => (
            <Reveal key={at} className="parade__item" delay={i * 0.07}>
              <div className="dev-phone dev-phone--slim">
                <span className="dev-phone__notch" />
                <Slice p={p} at={at} mobile label={alt('mobile')} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── big hero shot + visit */}
      <section className="case-hero container">
        <Reveal className="case-hero__frame">
          <div className="dev-browser dev-browser--wide">
            <div className="dev-browser__bar">
              <span className="dev-browser__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="dev-browser__url" dir="ltr">
                {p.domain}
              </span>
            </div>
            <div className="case-hero__shot">
              <img src={shot(p, 'desktop-hero')} width="1440" height="900" alt={alt('hero')} loading="lazy" decoding="async" />
              <div className="case-hero__veil">
                <p>{p.url ? cs.liveTitle : cs.soonTitle}</p>
                <Visit p={p} label={cs.visit} light />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───── next */}
      {next.slug !== p.slug && (
        <section className="case-next container">
          <TransitionLink href={projectPath(next)} className="case-next__link" style={{ '--acc': next.accent }} data-cursor={cs.nextCursor}>
            <span className="case-next__label">{cs.next}</span>
            <span className="case-next__name">{next.name}</span>
            <span className="case-next__en" dir="ltr">
              {next.en_name}
            </span>
            <img src={shot(next, 'desktop-hero')} width="1440" height="900" alt="" className="case-next__thumb" loading="lazy" decoding="async" />
            <span className="case-next__go">
              <Icon name="web" />
            </span>
          </TransitionLink>
        </section>
      )}
    </article>
  );
}
