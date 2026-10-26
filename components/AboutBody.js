'use client';
import { Reveal, Tilt } from './motion';
import { Icon, Pattern } from './Ornaments';
import Logo from './Logo';
import { useLang } from './Lang';

const ICONS = ['boteh', 'compass', 'tea', 'lantern'];

export default function AboutBody() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section className="about container">
      <div className="about__story">
        <Reveal className="about__mark">
          <Pattern name="herati" className="about__mark-pat" />
          <Logo animated className="about__logo" title={t.common.brand} />
        </Reveal>
        <Reveal className="about__text" delay={0.1}>
          <h2>{a.whyTitle}</h2>
          {a.why.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>

      <div className="values">
        {a.values.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <Tilt className="value" max={6}>
              <Icon name={ICONS[i]} className="value__icon" />
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
