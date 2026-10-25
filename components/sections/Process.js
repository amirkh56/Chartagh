'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Reveal, Words, EASE } from '../motion';
import { Pattern, Icon } from '../Ornaments';
import { fa, starStr, lobedPath } from '@/lib/patterns';

const STEPS = [
  {
    t: 'گفت‌وگو و آشنایی',
    d: 'از برند، مخاطب و هدف‌هایتان می‌گویید؛ ما با دقت گوش می‌دهیم و پرسش‌های درست را مطرح می‌کنیم.',
    out: ['جلسه‌ی آشنایی', 'شناخت مخاطب', 'تعریف هدف'],
    icon: 'tea',
  },
  {
    t: 'نقشه‌کشی',
    d: 'استراتژی، ساختار و طرح اولیه را ترسیم می‌کنیم؛ همان کاری که معمار پیش از نهادن نخستین آجر انجام می‌دهد.',
    out: ['استراتژی', 'نقشه‌ی صفحات', 'طرح اولیه'],
    icon: 'compass',
  },
  {
    t: 'بنّایی',
    d: 'طراحی و اجرا آغاز می‌شود. پیشرفت کار را هر هفته می‌بینید و نظرتان در همان مسیر اعمال می‌شود.',
    out: ['طراحی نهایی', 'پیاده‌سازی', 'گزارش هفتگی'],
    icon: 'bricks',
  },
  {
    t: 'افتتاحیه',
    d: 'پس از آزمون نهایی، پروژه منتشر می‌شود؛ و ما پس از تحویل نیز در کنار شما می‌مانیم.',
    out: ['انتشار', 'آموزش', 'پشتیبانی'],
    icon: 'burst',
  },
];

// Frame of a tile panel: outer pointed arch, inner dotted arch, lachak corners.
function PanelFrame() {
  const arch = (i) => `M${i} 400V${150 + i}C${i} ${88 + i * 0.6} ${70 + i * 0.4} ${52 + i * 0.5} 120 ${8 + i}C${170 - i * 0.4} ${52 + i * 0.5} ${240 - i} ${88 + i * 0.6} ${240 - i} ${150 + i}V400`;
  return (
    <svg className="pcard__frame" viewBox="0 0 240 400" preserveAspectRatio="none" aria-hidden>
      <path className="pcard__line pcard__line--a" d={arch(3)} pathLength="1" />
      <path className="pcard__line pcard__line--b" d={arch(12)} pathLength="1" />
    </svg>
  );
}

function Medallion({ n }) {
  return (
    <span className="pcard__medal">
      <svg viewBox="0 0 100 100" aria-hidden>
        <path d={lobedPath(50, 50, 44, 12)} className="pcard__medal-bg" />
        <polygon points={starStr(50, 50, 34)} className="pcard__medal-star" />
      </svg>
      <b>{fa(n)}</b>
    </span>
  );
}

function Step({ s, i, progress }) {
  // each card lights up as the scroll line reaches it
  const lit = useTransform(progress, [i / STEPS.length, (i + 0.6) / STEPS.length], [0, 1]);
  return (
    <Reveal className="pstep" delay={i * 0.12}>
      <motion.article className="pcard" style={{ '--lit': lit }}>
        <Pattern name="herati" className="pcard__pat" />
        <PanelFrame />
        <div className="pcard__head">
          <span className="pcard__icon">
            <Icon name={s.icon} />
          </span>
          <Medallion n={i + 1} />
        </div>
        <h3 className="pcard__title">{s.t}</h3>
        <p className="pcard__text">{s.d}</p>
        <ul className="pcard__out" aria-label="خروجی‌های این مرحله">
          {s.out.map((o, j) => (
            <motion.li key={o} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.1, duration: 0.6, ease: EASE }}>
              {o}
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </Reveal>
  );
}

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="process" id="process" ref={ref}>
      <div className="container">
        <header className="sec-head">
          <Reveal as="p" className="eyebrow">
            فرایند همکاری
          </Reveal>
          <h2 className="sec-title">
            <Words text="آجر به آجر، با هم می‌سازیم" />
          </h2>
          <Reveal as="p" className="sec-lead" delay={0.15}>
            چهار مرحله‌ی روشن، از نخستین گفت‌وگو تا روز افتتاحیه؛ در هر مرحله می‌دانید کار در چه وضعیتی است.
          </Reveal>
        </header>

        <div className="process__row">
          <svg className="process__line" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden>
            <path className="process__line-bg" d="M1000 30 C 930 0, 860 60, 790 30 S 650 0, 580 30 S 440 60, 370 30 S 230 0, 160 30 S 40 60, 0 30" />
            <motion.path d="M1000 30 C 930 0, 860 60, 790 30 S 650 0, 580 30 S 440 60, 370 30 S 230 0, 160 30 S 40 60, 0 30" style={{ pathLength: draw }} />
          </svg>
          {STEPS.map((s, i) => (
            <Step key={s.t} s={s} i={i} progress={draw} />
          ))}
        </div>
      </div>
    </section>
  );
}
