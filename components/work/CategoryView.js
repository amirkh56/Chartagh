'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TransitionLink } from '../Transition';
import { ComingFrames } from '../sections/WorkTeaser';
import { ProjectCard } from './Cards';
import { useLang } from '../Lang';
import { CATEGORIES, catOf, projectsIn } from '@/lib/work';

export default function CategoryView({ slug }) {
  const { lang, t } = useLang();
  const w = t.work;
  const c = catOf(slug);
  const all = projectsIn(slug);
  const [sub, setSub] = useState('all');
  const subs = c.subs.length ? ['all', ...c.subs] : [];
  const list = sub === 'all' ? all : all.filter((p) => p.sub === sub);
  const slots = [0, 1, 2].map(() => ({ cat: slug, icon: c.icon, pat: c.pattern }));

  return (
    <section className="container cat-view">
      <div className="cat-view__bar">
        <nav className="cat-switch" aria-label={w.otherCats}>
          <TransitionLink href="/work" className="cat-switch__item">
            {w.allCats}
          </TransitionLink>
          {CATEGORIES.map((x) => (
            <TransitionLink key={x.slug} href={`/work/${x.slug}`} className={`cat-switch__item ${x.slug === slug ? 'is-on' : ''}`} aria-current={x.slug === slug ? 'page' : undefined}>
              {x[lang].title}
            </TransitionLink>
          ))}
        </nav>
        {subs.length > 0 && (
          <div className="subtabs" role="tablist" aria-label={w.typeAria}>
            {subs.map((s) => (
              <button key={s} role="tab" aria-selected={sub === s} className={`subtab ${sub === s ? 'is-on' : ''}`} onClick={() => setSub(s)}>
                {sub === s && <motion.span layoutId="subtab-bg" className="subtab__bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{s === 'all' ? w.all : w.subs[s]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={sub} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          {list.length ? (
            <div className="pcase-grid">
              {list.map((p, i) => (
                <ProjectCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          ) : (
            <>
              <p className="cat-view__empty">{w.empty}</p>
              <ComingFrames count={3} slots={slots} />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
