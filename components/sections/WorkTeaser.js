'use client';
import { Reveal, Words, Magnetic } from '../motion';
import { Pattern, Arrow, Icon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { catOf } from '@/lib/work';
import { LatestProjects } from '../work/Cards';
import { useLang } from '../Lang';

const SLOTS = [
  { cat: 'web', icon: 'web', pat: 'herati' },
  { cat: 'poster', icon: 'poster', pat: 'boteh' },
  { cat: 'seo', icon: 'seo', pat: 'khatai' },
  { cat: 'web', icon: 'web', pat: 'boteh' },
  { cat: 'poster', icon: 'poster', pat: 'herati' },
  { cat: 'seo', icon: 'seo', pat: 'boteh' },
];

export function ComingFrames({ count = 3, big = false, slots = SLOTS }) {
  const { t, n, lang } = useLang();
  return (
    <div className={`frames ${big ? 'frames--big' : ''}`}>
      {slots.slice(0, count).map((s, i) => (
        <Reveal key={i} className="frame" delay={i * 0.1} data-cursor={t.common.soon}>
          <div className="frame__arch">
            <Pattern name={s.pat} className="frame__pat" />
            <span className="frame__shine" />
            <span className="frame__icon">
              <Icon name={s.icon} />
            </span>
            <span className="frame__tag">{t.common.soon}</span>
          </div>
          <div className="frame__meta">
            <span className="frame__cat">{catOf(s.cat)[lang].title}</span>
            <span className="frame__n">{n(`0${i + 1}`)}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function WorkTeaser() {
  const { t } = useLang();
  const w = t.workTeaser;
  return (
    <section className="work" id="work">
      <div className="container">
        <header className="sec-head sec-head--row">
          <div>
            <Reveal as="p" className="eyebrow">
              {w.eyebrow}
            </Reveal>
            <h2 className="sec-title">
              <Words text={w.title} />
            </h2>
          </div>
          <Reveal className="work__side" delay={0.1}>
            <p className="sec-lead">{w.lead}</p>
            <Magnetic strength={0.2}>
              <TransitionLink href="/work" className="link-arrow">
                {w.all} <Arrow />
              </TransitionLink>
            </Magnetic>
          </Reveal>
        </header>
        <LatestProjects limit={2} />
      </div>
    </section>
  );
}
