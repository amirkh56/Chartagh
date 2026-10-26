'use client';
import { motion } from 'framer-motion';
import { TransitionLink } from '../Transition';
import { Arrow, Icon, Pattern } from '../Ornaments';
import { Reveal } from '../motion';
import { Browser, Phone } from './Devices';
import { PROJECTS, projectHref, projectsIn, shot } from '@/lib/work';
import { fa } from '@/lib/patterns';

// One project: tinted arch stage with the site in a browser and a phone; hover scrolls the screens.
export function ProjectCard({ p, i = 0 }) {
  return (
    <Reveal delay={(i % 2) * 0.1} className="pcase-wrap">
      <TransitionLink href={projectHref(p)} className="pcase" style={{ '--acc': p.accent, '--tint': p.tint }} data-cursor="مشاهده‌ی پروژه">
        <div className="pcase__stage">
          <span className="pcase__arch" aria-hidden />
          <Pattern name="herati" className="pcase__pat" />
          <Browser p={p} full={false} className="pcase__browser" />
          <Phone p={p} full={false} className="pcase__phone" />
        </div>
        <div className="pcase__meta">
          <div>
            <span className="pcase__sub">{p.sub}</span>
            <h3 className="pcase__name">{p.name}</h3>
            <span className="pcase__en" dir="ltr">
              {p.en}
            </span>
          </div>
          <span className="pcase__go" aria-hidden>
            <Arrow />
          </span>
        </div>
      </TransitionLink>
    </Reveal>
  );
}

// Category tile: web shows a fan of real project screens, the others a big animated icon.
export function CategoryCard({ c, i }) {
  const items = projectsIn(c.slug);
  const soon = items.length === 0;
  return (
    <Reveal delay={i * 0.1} className={`ccat-wrap ccat-wrap--${c.slug}`}>
      <TransitionLink href={`/work/${c.slug}`} className={`ccat ccat--${c.slug} ${soon ? 'is-soon' : ''}`} data-cursor={soon ? 'به‌زودی' : 'ورود'}>
        <Pattern name={c.pattern} className="ccat__pat" />
        <span className="ccat__n">{fa(`0${i + 1}`)}</span>
        <div className="ccat__art">
          {soon ? (
            <span className="ccat__icon">
              <Icon name={c.icon} />
            </span>
          ) : (
            <div className="ccat__fan">
              {items.slice(0, 3).map((p, j) => (
                <motion.img key={p.slug} src={shot(p, 'desktop-hero')} alt="" className="ccat__shot" style={{ '--j': j - (Math.min(items.length, 3) - 1) / 2 }} loading="lazy" />
              ))}
            </div>
          )}
        </div>
        <div className="ccat__body">
          <h2 className="ccat__title">
            {c.title}
            <small dir="ltr">{c.en}</small>
          </h2>
          <p className="ccat__desc">{c.desc}</p>
          <span className="ccat__count">{soon ? 'به‌زودی' : `${fa(items.length)} نمونه‌کار`}</span>
        </div>
        <span className="ccat__go" aria-hidden>
          <Arrow />
        </span>
      </TransitionLink>
    </Reveal>
  );
}

export function LatestProjects({ limit }) {
  const list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <div className="pcase-grid">
      {list.map((p, i) => (
        <ProjectCard key={p.slug} p={p} i={i} />
      ))}
    </div>
  );
}
