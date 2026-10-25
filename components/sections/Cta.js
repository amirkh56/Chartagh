'use client';
import Stage from '../three/Stage';
import { Magnetic, Reveal, Words, spot } from '../motion';
import { Arrow, Pattern } from '../Ornaments';
import { TransitionLink } from '../Transition';

export default function Cta() {
  return (
    <section className="cta" {...spot}>
      <Pattern name="boteh" className="cta__pat" />
      <Pattern name="boteh" className="cta__pat cta__pat--spot" />
      <div className="cta__inner container">
        <div className="cta__copy">
          <Reveal as="p" className="eyebrow eyebrow--light">
            قدم بعدی با شماست
          </Reveal>
          <h2 className="cta__title">
            <Words text="یک چای مهمان ما باشید" />
          </h2>
          <Reveal as="p" className="cta__lead" delay={0.15}>
            ایده‌تان را بیاورید، چای با ما. در یک گفت‌وگوی بی‌تکلف بررسی می‌کنیم چگونه می‌توان برندتان را درخشان‌تر کرد.
          </Reveal>
          <Reveal className="cta__actions" delay={0.25}>
            <Magnetic>
              <TransitionLink href="/contact" className="btn btn--light">
                <span>گفت‌وگو را شروع کنیم</span>
                <Arrow />
              </TransitionLink>
            </Magnetic>
            <a className="cta__mail" href="mailto:hello@chartagh.ir">
              hello@chartagh.ir
            </a>
          </Reveal>
        </div>
        <Stage className="cta__stage" cursor="کلیک کنید" />
      </div>
    </section>
  );
}
