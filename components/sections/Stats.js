'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { Reveal } from '../motion';
import { Pattern } from '../Ornaments';
import { fa } from '@/lib/patterns';

const STATS = [
  { v: 5, suffix: '', label: 'سال تجربه', note: 'از ۱۴۰۰ تا امروز، بی‌وقفه' },
  { v: 4, suffix: '', label: 'تخصص اصلی', note: 'سایت، پوستر، سه‌بعدی، سئو' },
  { v: 1, suffix: '', label: 'تیم رفیق', note: 'همه با هم، از اول تا آخر' },
  { v: null, label: 'استکان چای', note: 'و هنوز هم ادامه داره' },
];

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{fa(n)}</span>;
}

export default function Stats() {
  return (
    <section className="stats container" aria-label="چارطاق در چند عدد">
      {STATS.map((s, i) => (
        <Reveal key={s.label} className="stat" delay={i * 0.1}>
          <Pattern name="rosette" className="stat__pat" />
          <div className="stat__v">{s.v === null ? '∞' : <Count to={s.v} />}</div>
          <div className="stat__l">{s.label}</div>
          <div className="stat__n">{s.note}</div>
        </Reveal>
      ))}
    </section>
  );
}
