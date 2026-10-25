'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Words, EASE } from '../motion';
import { fa } from '@/lib/patterns';

const QA = [
  ['یه پروژه معمولاً چقدر طول می‌کشه؟', 'بستگی به اندازه‌ش داره؛ یه لندینگ چند هفته‌ای آماده می‌شه و یه فروشگاه کامل چند ماهی. توی جلسه‌ی اول زمان‌بندی دقیق رو با هم می‌چینیم.'],
  ['هزینه‌ها چطوریه؟', 'قیمت ثابت نداریم، چون هیچ دو پروژه‌ای شبیه هم نیستن. بعد از گپ اول یه پیشنهاد شفاف و بی‌حاشیه برات می‌فرستیم.'],
  ['فقط سایت می‌سازین یا بقیه‌ش هم هست؟', 'هر چهارتا ستون چارطاق: سایت، پوستر، سه‌بعدی و سئو. می‌تونی همه رو یه‌جا بسپری و خیالت راحت باشه که همه‌چی یه‌دست درمیاد.'],
  ['بعد از تحویل ولمون می‌کنین؟', 'عمراً! پشتیبانی و آموزش داریم و تا هر وقت لازم باشه کنارتیم. رفاقت که تاریخ انقضا نداره.'],
  ['با کسب‌وکارهای کوچیک هم کار می‌کنین؟', 'معلومه! از یه کافه‌ی محلی تا یه برند بزرگ. مهم اینه که ایده داشته باشی، بقیه‌ش با ما.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq container" id="faq">
      <header className="sec-head">
        <Reveal as="p" className="eyebrow">
          سؤال‌های رایج
        </Reveal>
        <h2 className="sec-title">
          <Words text="لابد می‌خوای بدونی…" />
        </h2>
      </header>
      <div className="faq__list">
        {QA.map(([q, a], i) => {
          const on = open === i;
          return (
            <Reveal key={q} className={`qa ${on ? 'is-open' : ''}`} delay={i * 0.05}>
              <button className="qa__q" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                <span className="qa__n">{fa(`0${i + 1}`)}</span>
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
