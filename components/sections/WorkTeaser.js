'use client';
import { Reveal, Words, Magnetic } from '../motion';
import { Pattern, Arrow } from '../Ornaments';
import { TransitionLink } from '../Transition';

export function ComingFrames({ count = 3, big = false }) {
  const pats = ['khatam', 'arcade', 'girih', 'lozenge', 'rosette', 'khatam'];
  return (
    <div className={`frames ${big ? 'frames--big' : ''}`}>
      {Array.from({ length: count }, (_, i) => (
        <Reveal key={i} className="frame" delay={i * 0.1} data-cursor="به‌زودی">
          <div className="frame__arch">
            <Pattern name={pats[i % pats.length]} className="frame__pat" />
            <span className="frame__shine" />
            <span className="frame__tag">به‌زودی</span>
          </div>
          <div className="frame__meta">
            <i />
            <i />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function WorkTeaser() {
  return (
    <section className="work container" id="work">
      <header className="sec-head sec-head--row">
        <div>
          <Reveal as="p" className="eyebrow">
            نمونه‌کارها
          </Reveal>
          <h2 className="sec-title">
            <Words text="ویترین ما داره کاشی‌کاری می‌شه…" />
          </h2>
        </div>
        <Reveal as="p" className="sec-lead" delay={0.1}>
          به‌زودی نمونه‌کارها اینجا نمایان می‌شن. یه سر دیگه بهمون بزن رفیق، قول می‌دیم ارزشش رو داره.
        </Reveal>
      </header>
      <ComingFrames count={3} />
      <Reveal className="work__cta">
        <Magnetic>
          <TransitionLink href="/work" className="btn btn--ghost">
            <span>سر بزن به صفحه‌ی نمونه‌کارها</span>
            <Arrow />
          </TransitionLink>
        </Magnetic>
      </Reveal>
    </section>
  );
}
