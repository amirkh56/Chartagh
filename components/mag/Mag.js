'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TransitionLink } from '../Transition';
import { Arrow, Icon, Pattern } from '../Ornaments';
import { Reveal, Words } from '../motion';
import { useLoaded } from '../Loader';
import { useLang } from '../Lang';
import { ARTICLES, MAG_CATS, article, fmtDate, locA, magPath } from '@/lib/mag';

// Drawn cover: tile pattern + category icon in the article's colours (no photos needed)
export function Cover({ a, big = false }) {
  const { pat, bg, fg } = a.cover;
  return (
    <div className={`mcover ${big ? 'mcover--big' : ''}`} style={{ '--bg': bg, '--fg': fg }} aria-hidden>
      <Pattern name={pat} className="mcover__pat" />
      <span className="mcover__arch">
        <Icon name={a.icon} className="mcover__icon" />
      </span>
    </div>
  );
}

function Meta({ a }) {
  const { lang, t, n } = useLang();
  return (
    <p className="mmeta">
      <span className="mmeta__cat">{a.catLabel}</span>
      <span>{fmtDate(a.date, lang)}</span>
      <span>{t.mag.read.replace('{n}', n(a.read))}</span>
    </p>
  );
}

export function ArticleCard({ a: raw, i = 0, featured = false }) {
  const { lang, t } = useLang();
  const a = locA(raw, lang);
  return (
    <Reveal delay={featured ? 0 : (i % 3) * 0.08} className={featured ? 'mfeat-wrap' : 'mcard-wrap'}>
      <TransitionLink href={magPath(a)} className={featured ? 'mfeat' : 'mcard'} data-cursor={t.mag.readCta}>
        <Cover a={a} big={featured} />
        <div className={featured ? 'mfeat__body' : 'mcard__body'}>
          {featured && <span className="mfeat__tag">{t.mag.featured}</span>}
          <Meta a={a} />
          <h2 className={featured ? 'mfeat__title' : 'mcard__title'}>{a.title}</h2>
          <p className={featured ? 'mfeat__excerpt' : 'mcard__excerpt'}>{a.excerpt}</p>
          <span className="mlink">
            {t.mag.readCta}
            <Arrow />
          </span>
        </div>
      </TransitionLink>
    </Reveal>
  );
}

export function MagView() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState('all');
  const [first, ...rest] = ARTICLES;
  const list = cat === 'all' ? rest : ARTICLES.filter((a) => a.cat === cat);
  return (
    <>
      <section className="container mag-feat">{cat === 'all' && <ArticleCard a={first} featured />}</section>
      <section className="container mag-list" aria-label={t.mag.title}>
        <div className="subtabs mag-tabs" role="tablist" aria-label={t.mag.catsAria}>
          {['all', ...MAG_CATS.map((c) => c.slug)].map((s) => (
            <button key={s} role="tab" aria-selected={cat === s} className={`subtab ${cat === s ? 'is-on' : ''}`} onClick={() => setCat(s)}>
              {cat === s && <motion.span layoutId="mag-tab-bg" className="subtab__bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{s === 'all' ? t.mag.all : MAG_CATS.find((c) => c.slug === s)[lang]}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cat} className="mgrid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            {list.length ? list.map((a, i) => <ArticleCard key={a.slug} a={a} i={i} />) : <p className="mag-empty">{t.mag.empty}</p>}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}

export function ArticleView({ slug }) {
  const { lang, t } = useLang();
  const loaded = useLoaded();
  const a = locA(article(slug), lang);
  const heads = a.body.map((b, i) => b.h && { id: `s${i}`, text: b.h }).filter(Boolean);
  const related = ARTICLES.filter((x) => x.slug !== slug)
    .sort((x, y) => (y.cat === a.cat) - (x.cat === a.cat))
    .slice(0, 3);

  return (
    <article className="art">
      <header className="container art-head">
        <nav className="crumbs" aria-label={t.mag.title}>
          <TransitionLink href="/mag">{t.mag.title}</TransitionLink>
          <span aria-hidden>‹</span>
          <span>{a.catLabel}</span>
        </nav>
        <Meta a={a} />
        <h1 className="art-head__title">
          <Words text={a.title} animate={loaded} delay={0.1} stagger={0.04} />
        </h1>
        <Reveal as="p" className="art-head__lead" delay={0.2}>
          {a.excerpt}
        </Reveal>
      </header>

      <Reveal className="container">
        <Cover a={a} big />
      </Reveal>

      <div className="container art-grid">
        {heads.length > 0 && (
          <aside className="art-toc">
            <p>{t.mag.toc}</p>
            <ol>
              {heads.map((h) => (
                <li key={h.id}>
                  <TransitionLink href={`${magPath(a)}#${h.id}`}>{h.text}</TransitionLink>
                </li>
              ))}
            </ol>
          </aside>
        )}
        <div className="art-body">
          {a.body.map((b, i) =>
            b.h ? (
              <h2 key={i} id={`s${i}`}>
                {b.h}
              </h2>
            ) : b.q ? (
              <blockquote key={i}>
                <Pattern name="boteh" className="art-q__pat" />
                <p>{b.q}</p>
              </blockquote>
            ) : b.ul ? (
              <ul key={i}>
                {b.ul.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.p}</p>
            )
          )}
          <p className="art-demo">{t.mag.demo}</p>
        </div>
      </div>

      <section className="container art-related">
        <header className="sec-head">
          <p className="eyebrow">{t.mag.title}</p>
          <h2 className="sec-title">{t.mag.related}</h2>
        </header>
        <div className="mgrid">
          {related.map((x, i) => (
            <ArticleCard key={x.slug} a={x} i={i} />
          ))}
        </div>
      </section>
    </article>
  );
}
