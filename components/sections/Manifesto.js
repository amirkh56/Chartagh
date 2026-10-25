'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shamseh } from '../Ornaments';

const TEXT = [
  'ما یه مشت رفیقیم که پنج ساله کارمون ساختنه:',
  { chip: 'سایت', c: 'brick' },
  '،',
  { chip: 'پوستر', c: 'lajvard' },
  '،',
  { chip: 'سه‌بعدی', c: 'firuzeh' },
  'و',
  { chip: 'سئو', c: 'dark' },
  '. مثل چارطاق‌های قدیمی، چهار ستون محکم بالا می‌بریم و یه سقف امن برای ایده‌های تو می‌زنیم؛ با حوصله‌ی یه کاشی‌کار و سرعت یه برنامه‌نویس.',
];

// flatten into word tokens so each word lights up in turn while scrolling
const TOKENS = TEXT.flatMap((t) => (typeof t === 'string' ? t.split(' ').filter(Boolean).map((w) => ({ w })) : [t]));

function Token({ t, i, n, progress }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.14, 1]);
  const y = useTransform(progress, [i / n, (i + 1) / n], [8, 0]);
  if (t.chip)
    return (
      <motion.span className={`chip chip--${t.c}`} style={{ opacity, y }}>
        {t.chip}
      </motion.span>
    );
  return <motion.span style={{ opacity }}>{t.w}</motion.span>;
}

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 120]);
  const n = TOKENS.length;
  return (
    <section ref={ref} className="manifesto container" id="about">
      <motion.div className="manifesto__shamseh" style={{ rotate }} aria-hidden>
        <Shamseh spin={false} />
      </motion.div>
      <p className="eyebrow">ما کی هستیم؟</p>
      <p className="manifesto__text">
        {TOKENS.map((t, i) => (
          <span key={i}>
            {i > 0 && !/^[،.؛:]/.test(t.w ?? '') ? ' ' : ''}
            <Token t={t} i={i} n={n} progress={scrollYProgress} />
          </span>
        ))}
      </p>
    </section>
  );
}
