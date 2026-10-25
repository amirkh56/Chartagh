'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal, Words, Tilt } from '../motion';
import { Pattern } from '../Ornaments';
import { fa } from '@/lib/patterns';

const STEPS = [
  { t: 'گپ و چای', d: 'از خودت، برندت و آدمایی که می‌خوای بهشون برسی می‌گی. ما گوش می‌دیم و سؤال‌های خوب می‌پرسیم.', p: 'rosette' },
  { t: 'نقشه‌کشی', d: 'استراتژی، ساختار و طرح اولیه رو می‌کشیم؛ مثل معمار، قبل از گذاشتن اولین آجر.', p: 'lozenge' },
  { t: 'بنّایی', d: 'طراحی و ساخت شروع می‌شه. هر هفته پیشرفت رو می‌بینی، نظر می‌دی و با هم جلو می‌ریم.', p: 'khatam' },
  { t: 'افتتاحیه', d: 'لانچ می‌کنیم، تست می‌کنیم، جشن می‌گیریم؛ و بعدش هم ولت نمی‌کنیم، کنارتیم.', p: 'girih' },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="process" id="process" ref={ref}>
      <div className="container">
        <header className="sec-head">
          <Reveal as="p" className="eyebrow">
            فرایند کار
          </Reveal>
          <h2 className="sec-title">
            <Words text="آجر به آجر، با هم می‌سازیم" />
          </h2>
        </header>

        <div className="process__row">
          <svg className="process__line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
            <path d="M1000 20 C 875 -10, 750 50, 625 20 S 375 -10, 250 20 S 60 45, 0 20" className="process__line-bg" />
            <motion.path d="M1000 20 C 875 -10, 750 50, 625 20 S 375 -10, 250 20 S 60 45, 0 20" style={{ pathLength: draw }} />
          </svg>
          {STEPS.map((s, i) => (
            <Reveal key={s.t} className="pstep" delay={i * 0.12}>
              <Tilt className="pstep__arch" max={7}>
                <Pattern name={s.p} className="pstep__pat" />
                <span className="pstep__n">{fa(i + 1)}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
