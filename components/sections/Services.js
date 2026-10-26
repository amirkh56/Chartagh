'use client';
import { Reveal, Tilt, Words, spot } from '../motion';
import { Pattern, Arrow, Toranj, Icon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { BOTEH } from '@/lib/patterns';
import { useLang } from '../Lang';

function WebIllo() {
  return (
    <svg viewBox="0 0 260 180" className="illo" aria-hidden>
      <g className="illo__l1">
        <rect x="10" y="14" width="240" height="156" rx="12" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M10 40H250" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="232" cy="27" r="4.5" fill="var(--brick)" />
        <circle cx="218" cy="27" r="4.5" fill="var(--terracotta)" />
        <circle cx="204" cy="27" r="4.5" fill="var(--sand)" />
      </g>
      <g className="illo__l2">
        <path d="M30 156V100C30 82 46 72 60 58C74 72 90 82 90 100V156Z" fill="var(--brick-dark)" />
        <path d={BOTEH} transform="translate(46 96) scale(1)" fill="var(--kahgel)" />
      </g>
      <g className="illo__l3" fill="var(--ink)">
        <rect x="120" y="62" width="110" height="12" rx="6" />
        <rect x="150" y="82" width="80" height="12" rx="6" opacity=".6" />
        <rect x="140" y="110" width="90" height="6" rx="3" opacity=".3" />
        <rect x="160" y="122" width="70" height="6" rx="3" opacity=".3" />
        <rect x="176" y="140" width="54" height="18" rx="9" fill="var(--brick)" />
      </g>
      <path className="illo__l4" d="M120 128l22 8-9 4-4 9z" fill="var(--ink)" stroke="var(--surface)" strokeWidth="2" />
    </svg>
  );
}

function PosterIllo() {
  return (
    <svg viewBox="0 0 260 200" className="illo" aria-hidden>
      <g className="illo__l1" transform="rotate(8 150 100)">
        <rect x="110" y="18" width="110" height="160" rx="6" fill="var(--sand)" />
        <path d={BOTEH} transform="translate(150 50) scale(1.1)" fill="none" stroke="var(--brick-dark)" strokeWidth="2.5" />
      </g>
      <g className="illo__l2" transform="rotate(-6 110 100)">
        <rect x="46" y="12" width="120" height="172" rx="6" fill="var(--kahgel)" />
        <foreignObject x="66" y="28" width="80" height="80">
          <Toranj spin={false} />
        </foreignObject>
        <rect x="66" y="126" width="80" height="10" rx="5" fill="var(--brick-dark)" />
        <rect x="80" y="144" width="52" height="7" rx="3.5" fill="var(--brick-dark)" opacity=".5" />
      </g>
    </svg>
  );
}

function SeoIllo() {
  const bars = [40, 62, 86, 116];
  return (
    <svg viewBox="0 0 260 180" className="illo" aria-hidden>
      <g className="illo__l1">
        {bars.map((h, i) => (
          <path
            key={i}
            d={`M${34 + i * 46} 170V${170 - h}C${34 + i * 46} ${158 - h} ${46 + i * 46} ${154 - h} ${49 + i * 46} ${146 - h}C${52 + i * 46} ${154 - h} ${64 + i * 46} ${158 - h} ${64 + i * 46} ${170 - h}V170Z`}
            fill={i === 3 ? 'var(--kahgel)' : 'var(--ink)'}
            opacity={i === 3 ? 1 : 0.25 + i * 0.15}
          />
        ))}
      </g>
      <g className="illo__l3">
        <circle cx="200" cy="52" r="30" fill="var(--surface)" fillOpacity=".4" stroke="var(--ink)" strokeWidth="5" />
        <path d="M178 74L150 102" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
        <path d="M188 52l8 8 14-16" fill="none" stroke="var(--kahgel)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// text lives in the dictionary (services.items.<id>)
const SERVICES = [
  { id: 'web', icon: 'web', pattern: 'herati', Illo: WebIllo },
  { id: 'poster', icon: 'poster', pattern: 'boteh', Illo: PosterIllo },
  { id: 'seo', icon: 'seo', pattern: 'khatai', Illo: SeoIllo },
];

export default function Services() {
  const { t, n } = useLang();
  const sv = t.services;
  return (
    <section className="services" id="services">
      <div className="container">
        <header className="sec-head sec-head--row">
          <div>
            <Reveal as="p" className="eyebrow">
              {sv.eyebrow}
            </Reveal>
            <h2 className="sec-title">
              <Words text={sv.title} />
            </h2>
          </div>
          <Reveal as="p" className="sec-lead" delay={0.15}>
            {sv.lead}
          </Reveal>
        </header>

        <div className="patchwork">
          {SERVICES.map(({ Illo, ...base }, i) => {
            const s = { ...base, ...sv.items[base.id], n: n(`0${i + 1}`) };
            return (
            <Reveal key={s.id} className={`patch patch--${s.id}`} delay={i * 0.08}>
              <Tilt className="patch__card" data-cursor={s.title} {...spot}>
                <Pattern name={s.pattern} className="patch__pat" />
                <Pattern name={s.pattern} className="patch__pat patch__pat--spot" />
                <span className="patch__stitch" aria-hidden />
                <div className="patch__top">
                  <span className="patch__icon">
                    <Icon name={s.icon} />
                  </span>
                  <ul className="patch__tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="patch__art">
                  <Illo />
                </div>
                <div className="patch__body">
                  <span className="patch__n">{s.n}</span>
                  <h3 className="patch__title">{s.title}</h3>
                  <p className="patch__lead">{s.lead}</p>
                  <p className="patch__desc">{s.desc}</p>
                </div>
              </Tilt>
            </Reveal>
            );
          })}
        </div>

        <Reveal className="services__more">
          <Toranj className="services__mini" />
          <p>{sv.more}</p>
          <TransitionLink href="/contact" className="link-arrow">
            {sv.moreLink} <Arrow />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
