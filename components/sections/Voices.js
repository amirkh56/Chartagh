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
        <div className="voices__chat">
          {v.items.map((x, i) => (
            <Reveal as="figure" key={x.domain} className="voice" delay={i * 0.05}>
              <div className="voice__avatar" style={x.logo ? undefined : { background: x.color }} aria-hidden>
                {x.logo ? <img src={x.logo} alt="" width="54" height="54" loading="lazy" /> : x.mark}
              </div>
              <div className="voice__bubble">
                <p className="voice__head">
                  {x.project} <span>{x.domain}</span>
                </p>
                <p className="voice__who">{x.who}</p>
                <blockquote>{x.q}</blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
