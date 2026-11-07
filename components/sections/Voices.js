'use client';
import { Reveal, Words } from '../motion';
import { useLang } from '../Lang';

export default function Voices() {
  const { t } = useLang();
  const v = t.voices;
  return (
    <section className="voices" id="voices">
      <div className="container">
        <header className="sec-head">
          <Reveal as="p" className="eyebrow">
            {v.eyebrow}
          </Reveal>
          <h2 className="sec-title">
            <Words text={v.title} />
          </h2>
        </header>
        <div className="voices__grid">
          {v.items.map((x, i) => (
            <Reveal as="figure" key={x.who} className={`voice ${i === 0 ? 'voice--lead' : ''}`} delay={i * 0.05}>
              <blockquote>{x.q}</blockquote>
              <figcaption>{x.who}</figcaption>
            </Reveal>
          ))}
        </div>
        <p className="voices__note">{v.note}</p>
      </div>
    </section>
  );
}
