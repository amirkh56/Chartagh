'use client';
import { TransitionLink } from '../Transition';
import { Arrow, Icon, Pattern } from '../Ornaments';
import { Reveal } from '../motion';
import { useLang } from '../Lang';
import { Browser, Phone } from './Devices';
import { loc, PROJECTS, projectPath, projectsIn, shot } from '@/lib/work';

const fill = (s, map) => Object.entries(map).reduce((acc, [k, v]) => acc.replace(`{${k}}`, v), s);

// One project: tinted arch stage with the site in a browser and a phone.
export function ProjectCard({ p: raw, i = 0 }) {
  const { lang, t } = useLang();
  const p = loc(raw, lang);
  const alt = t.caseStudy.alt;
  return (
    <Reveal delay={(i % 2) * 0.1} className="pcase-wrap">
      <TransitionLink href={projectPath(p)} className="pcase" style={{ '--acc': p.accent, '--tint': p.tint }} data-cursor={t.work.view}>
        <div className="pcase__stage">
          <span className="pcase__arch" aria-hidden />
          <Pattern name="herati" className="pcase__pat" />
          <Browser p={p} full={false} className="pcase__browser" alt={fill(alt.desktop, { name: p.name })} />
          <Phone p={p} full={false} className="pcase__phone" alt={fill(alt.mobile, { name: p.name })} />
        </div>
        <div className="pcase__meta">
          <div>
            <span className="pcase__sub">{t.work.subs[p.sub]}</span>
            <h3 className="pcase__name">{p.name}</h3>
            <span className="pcase__en" dir="ltr">
              {p.en_name}
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
export function CategoryCard({ c: raw, i }) {
  const { lang, t, n } = useLang();
  const c = loc(raw, lang);
  const items = projectsIn(c.slug);
  const soon = items.length === 0;
  const fan = Math.min(items.length, 3);
  return (
    <Reveal delay={i * 0.1} className={`ccat-wrap ccat-wrap--${c.slug}`}>
      <TransitionLink href={`/work/${c.slug}`} className={`ccat ccat--${c.slug} ${soon ? 'is-soon' : ''}`} data-cursor={soon ? t.common.soon : t.work.enter}>
        <Pattern name={c.pattern} className="ccat__pat" />
        <span className="ccat__n">{n(`0${i + 1}`)}</span>
        <div className="ccat__art">
          {soon ? (
            <span className="ccat__icon">
              <Icon name={c.icon} />
            </span>
          ) : (
            <div className="ccat__fan">
              {items.slice(0, 3).map((p, j) => (
                <img key={p.slug} src={shot(p, 'desktop-hero')} width="1440" height="900" alt="" className="ccat__shot" style={{ '--j': j - (fan - 1) / 2 }} loading="lazy" decoding="async" />
              ))}
            </div>
          )}
        </div>
        <div className="ccat__body">
          <h2 className="ccat__title">
            {c.title}
            {lang === 'fa' && <small dir="ltr">{raw.en.title}</small>}
          </h2>
          <p className="ccat__desc">{c.desc}</p>
          <span className="ccat__count">{soon ? t.common.soon : fill(t.work.count, { n: n(items.length) })}</span>
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
