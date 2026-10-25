'use client';
import { Reveal, Words, Magnetic } from '../motion';
import { Pattern, Arrow, Icon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { fa } from '@/lib/patterns';

const SLOTS = [
  { cat: 'طراحی سایت', icon: 'web', pat: 'herati' },
  { cat: 'طراحی پوستر', icon: 'poster', pat: 'boteh' },
  { cat: 'سئو', icon: 'seo', pat: 'khatai' },
  { cat: 'طراحی سایت', icon: 'web', pat: 'boteh' },
  { cat: 'طراحی پوستر', icon: 'poster', pat: 'herati' },
  { cat: 'سئو', icon: 'seo', pat: 'boteh' },
];

export function ComingFrames({ count = 3, big = false }) {
  return (
    <div className={`frames ${big ? 'frames--big' : ''}`}>
      {SLOTS.slice(0, count).map((s, i) => (
        <Reveal key={i} className="frame" delay={i * 0.1} data-cursor="به‌زودی">
          <div className="frame__arch">
            <Pattern name={s.pat} className="frame__pat" />
            <span className="frame__shine" />
            <span className="frame__icon">
              <Icon name={s.icon} />
            </span>
            <span className="frame__tag">به‌زودی</span>
          </div>
          <div className="frame__meta">
            <span className="frame__cat">{s.cat}</span>
            <span className="frame__n">{fa(`0${i + 1}`)}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function WorkTeaser() {
  return (
    <section className="work" id="work">
      <div className="container">
        <header className="sec-head sec-head--row">
          <div>
            <Reveal as="p" className="eyebrow">
              نمونه‌کارها
            </Reveal>
            <h2 className="sec-title">
              <Words text="ویترین چارطاق" />
            </h2>
          </div>
          <Reveal className="work__side" delay={0.1}>
            <p className="sec-lead">به‌زودی نمونه‌کارهای ما در این بخش نمایان می‌شوند. در حال چیدن کاشی‌ها هستیم؛ کمی بعد دوباره سر بزنید.</p>
            <Magnetic strength={0.2}>
              <TransitionLink href="/work" className="link-arrow">
                همه‌ی نمونه‌کارها <Arrow />
              </TransitionLink>
            </Magnetic>
          </Reveal>
        </header>
        <ComingFrames count={3} />
      </div>
    </section>
  );
}
