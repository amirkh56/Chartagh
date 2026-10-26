'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { TransitionLink } from '../Transition';
import { Arrow, Icon, Pattern } from '../Ornaments';
import { Reveal, Words, Magnetic, EASE } from '../motion';
import { useLoaded } from '../Loader';
import { Browser, Phone, Tablet, Slice } from './Devices';
import { catOf, projectHref, PROJECTS, shot } from '@/lib/work';
import { fa } from '@/lib/patterns';

function Visit({ p, light = false }) {
  return (
    <Magnetic>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className={`btn ${light ? 'btn--light' : 'btn--primary'}`}>
        <span>مشاهده‌ی آنلاین سایت</span>
        <Arrow />
      </a>
    </Magnetic>
  );
}

function Swatch({ hex }) {
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
      data-cursor="کپی رنگ"
      aria-label={`کپی کد رنگ ${hex}`}
    >
      <i />
      <span dir="ltr">{copied ? 'کپی شد' : hex}</span>
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

export default function CaseStudy({ p }) {
  const loaded = useLoaded();
  const cat = catOf(p.cat);
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] });
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const rotY = useTransform(mx, [-0.5, 0.5], [5, -5]);

  const facts = [
    ['صنعت', p.industry],
    ['نوع پروژه', `سایت ${p.sub}`],
    ['بازار', p.city],
    ['سکو', p.platform.join(' · ')],
  ];
  const slices = [0, 22, 44, 66, 100];

  return (
    <article className="case" style={{ '--acc': p.accent, '--tint': p.tint }}>
      {/* ───── header */}
      <header className="case-head container">
        <nav className="crumbs" aria-label="مسیر">
          <TransitionLink href="/work">نمونه‌کارها</TransitionLink>
          <span aria-hidden>‹</span>
          <TransitionLink href={`/work/${p.cat}`}>{cat.title}</TransitionLink>
          <span aria-hidden>‹</span>
          <b>{p.name}</b>
        </nav>
        <motion.p className="case-head__en" dir="ltr" initial={{ opacity: 0, y: 40 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE }}>
          {p.en}
        </motion.p>
        <h1 className="case-head__title">
          <Words text={`نمونه‌کار ${cat.title} | ${p.name}`} animate={loaded} delay={0.2} />
        </h1>
        <motion.div className="case-head__row" initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
          <Visit p={p} />
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="case-head__domain" dir="ltr">
            {p.domain} ↗
          </a>
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
        data-cursor="مکث با نشانگر"
      >
        <span className="case-stage__arch" aria-hidden />
        <Pattern name="herati" className="case-stage__pat" />
        <motion.div className="case-stage__rig" style={{ rotateY: rotY }}>
          <Parallax v={scrollYProgress} k={30} className="case-stage__tablet">
            <Tablet p={p} />
          </Parallax>
          <div className="case-stage__browser">
            <Browser p={p} />
          </div>
          <Parallax v={scrollYProgress} k={70} className="case-stage__phone case-stage__phone--a">
            <Phone p={p} delay="-2s" />
          </Parallax>
          <Parallax v={scrollYProgress} k={-50} className="case-stage__phone case-stage__phone--b">
            <Phone p={p} full={false} />
          </Parallax>
        </motion.div>
        <p className="case-stage__hint">صفحه‌ی نخست سایت به‌طور کامل در قاب‌ها پیمایش می‌شود؛ برای مکث، نشانگر را روی آن نگه دارید.</p>
      </section>

      {/* ───── chapters */}
      <section className="chapters container">
        <Reveal className="chapter chapter--about">
          <span className="chapter__n">{fa('01')}</span>
          <h2>درباره‌ی پروژه</h2>
          <p>{p.summary}</p>
        </Reveal>
        <Reveal className="chapter chapter--features" delay={0.1}>
          <span className="chapter__n">{fa('02')}</span>
          <h2>ویژگی‌های کلیدی</h2>
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="chapter chapter--identity" delay={0.2}>
          <span className="chapter__n">{fa('03')}</span>
          <h2>هویت بصری</h2>
          <div className="swatches">
            {p.palette.map((h) => (
              <Swatch key={h} hex={h} />
            ))}
          </div>
          <div className="idcards">
            <div className="idcard">
              <span>فونت</span>
              <b>{p.font}</b>
              <em aria-hidden>آ ب پ ت</em>
            </div>
            <div className="idcard">
              <span>سکو</span>
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
      <section className="slices container" aria-label="نماهایی از صفحه">
        <Reveal as="p" className="eyebrow">
          نماهایی از صفحه‌ی نخست
        </Reveal>
        <div className="slices__grid">
          {slices.map((at, i) => (
            <Reveal key={at} className={`slices__cell slices__cell--${i}`} delay={i * 0.06}>
              <Slice p={p} at={at} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── mobile parade */}
      <section className="parade" aria-label="نسخه‌ی موبایل">
        <div className="container parade__head">
          <Reveal as="p" className="eyebrow">
            نسخه‌ی موبایل
          </Reveal>
          <h2 className="sec-title">
            <Words text="در دست مشتری، همان‌قدر خوش‌دست" />
          </h2>
        </div>
        <div className="parade__row" data-lenis-prevent-wheel>
          {[0, 18, 36, 54, 72, 90].map((at, i) => (
            <Reveal key={at} className="parade__item" delay={i * 0.07}>
              <div className="dev-phone dev-phone--slim">
                <span className="dev-phone__notch" />
                <Slice p={p} at={at} mobile />
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
              <img src={shot(p, 'desktop-hero')} alt={`بخش آغازین سایت ${p.name}`} loading="lazy" />
              <div className="case-hero__veil">
                <p>نسخه‌ی زنده‌ی سایت را ببینید</p>
                <Visit p={p} light />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───── next */}
      {next.slug !== p.slug && (
        <section className="case-next container">
          <TransitionLink href={projectHref(next)} className="case-next__link" style={{ '--acc': next.accent }} data-cursor="پروژه‌ی بعد">
            <span className="case-next__label">نمونه‌کار بعدی</span>
            <span className="case-next__name">{next.name}</span>
            <span className="case-next__en" dir="ltr">
              {next.en}
            </span>
            <img src={shot(next, 'desktop-hero')} alt="" className="case-next__thumb" loading="lazy" />
            <span className="case-next__go">
              <Icon name="web" />
            </span>
          </TransitionLink>
        </section>
      )}
    </article>
  );
}
