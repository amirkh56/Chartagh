'use client';
import TeaGlass from '../TeaGlass';
import { Magnetic, Reveal, Words, spot } from '../motion';
import { Arrow, Pattern } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { useLang } from '../Lang';

export default function Cta() {
  const { t } = useLang();
  const c = t.cta;
  return (
    <section className="cta" {...spot}>
      <Pattern name="boteh" className="cta__pat" />
      <Pattern name="boteh" className="cta__pat cta__pat--spot" />
      <div className="cta__inner container">
        <div className="cta__copy">
          <Reveal as="p" className="eyebrow eyebrow--light">
            {c.eyebrow}
          </Reveal>
          <h2 className="cta__title">
            <Words text={c.title} />
          </h2>
          <Reveal as="p" className="cta__lead" delay={0.15}>
            {c.lead}
          </Reveal>
          <Reveal className="cta__actions" delay={0.25}>
            <Magnetic>
              <TransitionLink href="/contact" className="btn btn--light">
                <span>{c.button}</span>
                <Arrow />
              </TransitionLink>
            </Magnetic>
            <a className="cta__mail" href="mailto:hello@chartagh.ir">
              hello@chartagh.ir
            </a>
          </Reveal>
        </div>
        <TeaGlass />
      </div>
    </section>
  );
}
