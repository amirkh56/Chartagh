'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Tilt, EASE } from './motion';
import { Arrow, Pattern, Toranj } from './Ornaments';

const SERVICES = ['طراحی سایت', 'طراحی پوستر', 'سئو', 'هنوز مطمئن نیستم'];
const BUDGETS = ['کوچک', 'متوسط', 'بزرگ'];

function Chips({ name, options, multi, value, onChange }) {
  return (
    <div className="chips" role="group">
      {options.map((o) => {
        const on = multi ? value.includes(o) : value === o;
        return (
          <label key={o} className={`chip-opt ${on ? 'is-on' : ''}`}>
            <input
              type={multi ? 'checkbox' : 'radio'}
              name={name}
              value={o}
              checked={on}
              onChange={() => onChange(multi ? (on ? value.filter((v) => v !== o) : [...value, o]) : o)}
            />
            {o}
          </label>
        );
      })}
    </div>
  );
}

export default function ContactForm() {
  const [services, setServices] = useState([]);
  const [budget, setBudget] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get('name')).trim() || !String(data.get('contact')).trim()) {
      setError('لطفاً نام و یک راه ارتباطی را وارد کنید.');
      return;
    }
    setError('');
    setState('sending');
    // ponytail: no backend yet — wire this to an API route / form service when one exists
    setTimeout(() => setState('sent'), 1400);
  };

  return (
    <section className="contact container">
      <Reveal className="contact__form-wrap">
        <AnimatePresence mode="wait">
          {state !== 'sent' ? (
            <motion.form key="form" className="contact__form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="field-row">
                <label className="field">
                  <span>نام شما</span>
                  <input name="name" autoComplete="name" placeholder="نام و نام خانوادگی" />
                </label>
                <label className="field">
                  <span>ایمیل یا شماره‌ی تماس</span>
                  <input name="contact" autoComplete="email" placeholder="برای پاسخ‌گویی به شما" dir="auto" />
                </label>
              </div>
              <fieldset className="field">
                <legend>به چه خدمتی نیاز دارید؟</legend>
                <Chips name="services" options={SERVICES} multi value={services} onChange={setServices} />
              </fieldset>
              <fieldset className="field">
                <legend>بودجه‌ی تقریبی پروژه</legend>
                <Chips name="budget" options={BUDGETS} value={budget} onChange={setBudget} />
              </fieldset>
              <label className="field">
                <span>درباره‌ی پروژه بنویسید</span>
                <textarea name="message" rows={5} placeholder="هدف، مخاطب و هر نکته‌ای که لازم است بدانیم…" />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="btn btn--primary btn--block" disabled={state === 'sending'}>
                <span>{state === 'sending' ? 'در حال ارسال…' : 'ارسال پیام'}</span>
                <Arrow />
              </button>
            </motion.form>
          ) : (
            <motion.div key="ok" className="contact__ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }} role="status">
              <Toranj className="contact__ok-sun" />
              <h2>پیام شما دریافت شد</h2>
              <p>سپاسگزاریم. در کمتر از یک روز کاری با شما تماس می‌گیریم.</p>
              <button className="btn btn--ghost" onClick={() => setState('idle')}>
                <span>ارسال پیام دیگر</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <aside className="contact__aside">
        <Reveal delay={0.1}>
          <Tilt className="info-card">
            <Pattern name="boteh" className="info-card__pat" />
            <h3>ارتباط مستقیم</h3>
            <a href="mailto:hello@chartagh.ir">hello@chartagh.ir</a>
            <p>همکاری با برندها در سراسر ایران، به‌صورت حضوری و آنلاین.</p>
            <ul>
              <li>شنبه تا چهارشنبه، ۹ صبح تا ۶ عصر</li>
              <li>پاسخ پیام‌ها: کمتر از یک روز کاری</li>
              <li>جلسه‌ی آشنایی: رایگان</li>
            </ul>
          </Tilt>
        </Reveal>
      </aside>
    </section>
  );
}
