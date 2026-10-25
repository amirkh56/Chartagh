'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Words, EASE } from '../motion';
import { fa } from '@/lib/patterns';

const QA = [
  ['یک پروژه معمولاً چقدر زمان می‌برد؟', 'به اندازه‌ی پروژه بستگی دارد؛ یک لندینگ در چند هفته و یک فروشگاه کامل در چند ماه آماده می‌شود. زمان‌بندی دقیق را در جلسه‌ی نخست با هم تعیین می‌کنیم.'],
  ['هزینه‌ها چگونه محاسبه می‌شود؟', 'قیمت ثابتی نداریم، چون هیچ دو پروژه‌ای شبیه هم نیستند. پس از گفت‌وگوی نخست، پیشنهادی شفاف و دقیق برایتان می‌فرستیم.'],
  ['چه خدماتی ارائه می‌دهید؟', 'طراحی سایت، طراحی پوستر و سئو. می‌توانید همه را یک‌جا به ما بسپارید تا خروجی کار یکدست و هماهنگ باشد.'],
  ['پس از تحویل هم همراه ما هستید؟', 'بله. پشتیبانی و آموزش بخشی از کار ماست و تا هر زمان که لازم باشد کنار شما هستیم.'],
  ['با کسب‌وکارهای کوچک هم همکاری می‌کنید؟', 'حتماً. از یک کافه‌ی محلی تا یک برند بزرگ؛ مهم این است که ایده‌ای برای رشد داشته باشید.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq container" id="faq">
      <header className="sec-head">
        <Reveal as="p" className="eyebrow">
          پرسش‌های متداول
        </Reveal>
        <h2 className="sec-title">
          <Words text="پرسش‌هایی که معمولاً می‌پرسند" />
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
