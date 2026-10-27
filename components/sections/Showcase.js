'use client';
import { useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Words, EASE } from '../motion';
import { Pattern, Toranj } from '../Ornaments';
import { starStr } from '@/lib/patterns';
import { useLang } from '../Lang';

const CODE = [
  ['k', 'export default function Hero() {'],
  ['n', ' '],
  ['p', '  return ('],
  ['t', '    <Taq pattern="herati">'],
  ['t', '      <Title>{title}</Title>'],
  ['t', '      <Button glow>{cta}</Button>'],
  ['t', '    </Taq>'],
  ['p', '  );'],
  ['p', '}'],
];

const SCORES = [
  { v: 98 },
  { v: 100 },
  { v: 97 },
];

function Ring({ v, label, play }) {
  const { n } = useLang();
  const C = 2 * Math.PI * 26;
  return (
    <div className="score">
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" className="score__bg" />
        <motion.circle
          cx="32"
          cy="32"
          r="26"
          className="score__fg"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: play ? C * (1 - v / 100) : C }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />
      </svg>
      <b>{n(v)}</b>
      <span>{label}</span>
    </div>
  );
}

function Mock({ stage }) {
  const { t } = useLang();
  const sc = t.showcase;
  const is = (n) => (stage >= n ? ` is-${n}` : '');
  return (
    <div className={`mock${is(1)}${is(2)}${is(3)}${is(4)}`} data-stage={stage}>
      <div className="mock__bar">
        <span className="mock__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mock__url" dir="ltr">{sc.url}</span>
      </div>
      <div className="mock__body">
        <div className="mock__grid" aria-hidden />
        <div className="mk-nav">
          <i className="mk-logo" />
          <i className="mk-link" />
          <i className="mk-link" />
          <i className="mk-link" />
          <b className="mk-btn" />
        </div>
        <div className="mk-hero">
          <div className="mk-copy">
            <i className="mk-h1" />
            <i className="mk-h1 mk-h1--s" />
            <i className="mk-p" />
            <i className="mk-p mk-p--s" />
            <b className="mk-cta" />
          </div>
          <div className="mk-art">
            <Pattern name="boteh" className="mk-art__pat" />
            <Toranj className="mk-art__sun" />
          </div>
        </div>
        <div className="mk-cards">
          {[0, 1, 2].map((i) => (
            <div key={i} className="mk-card">
              <svg viewBox="-50 -50 100 100">
                <polygon points={starStr(0, 0, 40)} />
              </svg>
              <i />
              <i />
            </div>
          ))}
        </div>
        <svg className="mk-cursor" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 3l15 6-6.5 2.2L10 18z" />
        </svg>

        <AnimatePresence>
          {stage === 3 && (
            <motion.pre
              key="code"
              className="mk-code"
              dir="ltr"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {CODE.map(([k, s], i) => (
                <motion.span
                  key={i}
                  className={`c-${k}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                >
                  {s.replace('{title}', sc.codeTitle).replace('{cta}', sc.codeButton)}
                  {'\n'}
                </motion.span>
              ))}
              <span className="mk-caret" />
            </motion.pre>
          )}
          {stage === 4 && (
            <motion.div
              key="launch"
              className="mk-launch"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="mk-live">
                <i /> {sc.live}
              </span>
              <div className="mk-scores">
                {SCORES.map((s, i) => (
                  <Ring key={i} v={s.v} label={sc.scores[i]} play />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// A line runs down the page as you scroll; each step sits on it with its text on one side
// and the browser mock at that stage on the other. Nothing pins — the page just scrolls.
export default function Showcase() {
  const { t, n } = useLang();
  const sc = t.showcase;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="tline" id="showcase">
      <Pattern name="herati" className="showcase__pat" />
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow">{sc.eyebrow}</p>
          <h2 className="sec-title">
            <Words text={sc.title} />
          </h2>
        </header>
        <ol className="tline__list" ref={ref}>
          <span className="tline__track" aria-hidden>
            <motion.i style={{ scaleY: grow }} />
          </span>
          {sc.steps.map((s, i) => (
            <li key={s.t} className="tline__row">
              <span className="tline__dot">{n(i + 1)}</span>
              <motion.div className="tline__text" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.7, ease: EASE }}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </motion.div>
              <motion.div className="tline__media" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
                <Mock stage={i} />
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
