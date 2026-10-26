'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Words, EASE } from '../motion';
import { useLang } from '../Lang';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const { t, n } = useLang();
  const QA = t.faq.items;
  return (
    <section className="faq container" id="faq">
      <header className="sec-head">
        <Reveal as="p" className="eyebrow">
          {t.faq.eyebrow}
        </Reveal>
        <h2 className="sec-title">
          <Words text={t.faq.title} />
        </h2>
      </header>
      <div className="faq__list">
        {QA.map(([q, a], i) => {
          const on = open === i;
          return (
            <Reveal key={q} className={`qa ${on ? 'is-open' : ''}`} delay={i * 0.05}>
              <button className="qa__q" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                <span className="qa__n">{n(`0${i + 1}`)}</span>
                <span className="qa__text">{q}</span>
                <span className="qa__icon" aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    className="qa__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
