'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { Words, EASE } from '../motion';
import { Pattern, Toranj } from '../Ornaments';
import { fa, starStr } from '@/lib/patterns';

const STEPS = [
  { t: 'طرح اولیه و ایده', d: 'ابتدا با هم گفت‌وگو می‌کنیم و سپس اسکلت سایت را روی کاغذ می‌کشیم؛ ساختار صفحه‌ها از همین‌جا شکل می‌گیرد.' },
  { t: 'طراحی رابط کاربری', d: 'رنگ، تایپوگرافی و نقش‌مایه؛ هر صفحه را مانند یک کاشی معرق، با حوصله و تکه‌به‌تکه کنار هم می‌چینیم.' },
  { t: 'جان‌بخشی با انیمیشن', d: 'سایتی زنده که به هر حرکت کاربر واکنشی ظریف و دلنشین نشان می‌دهد.' },
  { t: 'کدنویسی اصولی', d: 'ری‌اکت و نکست‌جی‌اس؛ سریع، سبک و منظم، با کدی که توسعه‌ی آن در آینده آسان باشد.' },
  { t: 'انتشار و سئو', d: 'سایت منتشر می‌شود، برای موتورهای جست‌وجو بهینه می‌شود و ما پس از تحویل نیز کنار شما می‌مانیم.' },
];

const CODE = [
  ['k', 'export default function Hero() {'],
  ['n', ' '],
  ['p', '  return ('],
  ['t', '    <Taq pattern="herati">'],
  ['t', '      <Title>خوش آمدید</Title>'],
  ['t', '      <Button glow>شروع همکاری</Button>'],
  ['t', '    </Taq>'],
  ['p', '  );'],
  ['p', '}'],
];

const SCORES = [
  { l: 'سرعت', v: 98 },
  { l: 'سئو', v: 100 },
  { l: 'دسترسی', v: 97 },
];

function Ring({ v, label, play }) {
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
      <b>{fa(v)}</b>
      <span>{label}</span>
    </div>
  );
}

function Mock({ stage }) {
  const is = (n) => (stage >= n ? ` is-${n}` : '');
  return (
    <div className={`mock${is(1)}${is(2)}${is(3)}${is(4)}`} data-stage={stage}>
      <div className="mock__bar">
        <span className="mock__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mock__url" dir="ltr">chartagh.ir/برند-تو</span>
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
                  {s}
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
                <i /> منتشر شد!
              </span>
              <div className="mk-scores">
                {SCORES.map((s) => (
                  <Ring key={s.l} v={s.v} label={s.l} play />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Showcase() {
  const ref = useRef(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => setStage(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.999))));

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [22, 0]), { stiffness: 80, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.88, 1]), { stiffness: 80, damping: 20 });
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // mouse tilt on the browser mock
  const tx = useSpring(0, { stiffness: 120, damping: 16 });
  const ty = useSpring(0, { stiffness: 120, damping: 16 });

  return (
    <section ref={ref} className="showcase" id="showcase">
      <div className="showcase__sticky">
        <Pattern name="herati" className="showcase__pat" />
        <div className="showcase__inner container">
          <div className="showcase__copy">
            <p className="eyebrow">هنر طراحی سایت؛ تخصص ویژه‌ی ما</p>
            <h2 className="sec-title showcase__title">
              <Words text="یک سایت چگونه از صفر ساخته می‌شود؟" />
            </h2>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className={`step ${i === stage ? 'is-active' : ''} ${i < stage ? 'is-done' : ''}`}>
                  <span className="step__n">{fa(i + 1)}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <AnimatePresence initial={false}>
                      {i === stage && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        >
                          {s.d}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
            </ol>
            <div className="showcase__bar" aria-hidden>
              <motion.i style={{ height: bar }} />
            </div>
          </div>

          <div
            className="showcase__stage"
            data-cursor="اسکرول کنید"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              tx.set(((e.clientX - r.left) / r.width - 0.5) * 12);
              ty.set(((e.clientY - r.top) / r.height - 0.5) * -10);
            }}
            onPointerLeave={() => {
              tx.set(0);
              ty.set(0);
            }}
          >
            <motion.div className="showcase__tilt" style={{ rotateX, scale }}>
              <motion.div className="showcase__tilt" style={{ rotateY: tx, rotateX: ty }}>
                <Mock stage={stage} />
              </motion.div>
            </motion.div>
            <div className="showcase__label">
              <AnimatePresence mode="wait">
                <motion.span key={stage} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.35 }}>
                  مرحله‌ی {fa(stage + 1)} از {fa(STEPS.length)}: {STEPS[stage].t}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
