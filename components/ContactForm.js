'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Tilt, EASE } from './motion';
import { Arrow, Pattern, Shamseh } from './Ornaments';

const SERVICES = ['طراحی سایت', 'طراحی پوستر', 'طراحی سه‌بعدی', 'سئو', 'هنوز نمی‌دونم!'];
const BUDGETS = ['کوچیک و جمع‌وجور', 'متوسط', 'بزرگ و جاه‌طلبانه'];

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
      setError('اسم و یه راه ارتباطی رو بنویس که بتونیم پیدات کنیم.');
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
                  <span>اسمت چیه؟</span>
                  <input name="name" autoComplete="name" placeholder="مثلاً: سارا" />
                </label>
                <label className="field">
                  <span>ایمیل یا شماره‌ت</span>
                  <input name="contact" autoComplete="email" placeholder="که بتونیم خبرت کنیم" dir="auto" />
                </label>
              </div>
              <fieldset className="field">
                <legend>به چی احتیاج داری؟</legend>
                <Chips name="services" options={SERVICES} multi value={services} onChange={setServices} />
              </fieldset>
              <fieldset className="field">
                <legend>بودجه‌ت حدوداً چقدره؟</legend>
                <Chips name="budget" options={BUDGETS} value={budget} onChange={setBudget} />
              </fieldset>
              <label className="field">
                <span>یه کم از ایده‌ت بگو</span>
                <textarea name="message" rows={5} placeholder="هر چی تو ذهنته؛ ما خوب گوش می‌دیم…" />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="btn btn--primary btn--block" disabled={state === 'sending'}>
                <span>{state === 'sending' ? 'داره می‌ره…' : 'بفرست بره'}</span>
                <Arrow />
              </button>
            </motion.form>
          ) : (
            <motion.div key="ok" className="contact__ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }} role="status">
              <Shamseh className="contact__ok-sun" />
              <h2>رسید دستمون!</h2>
              <p>مرسی رفیق. کمتر از یه روز کاری بهت پیام می‌دیم؛ تا اون موقع چای رو دم کن.</p>
              <button className="btn btn--ghost" onClick={() => setState('idle')}>
                <span>یه پیام دیگه</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <aside className="contact__aside">
        <Reveal delay={0.1}>
          <Tilt className="info-card">
            <Pattern name="arcade" className="info-card__pat" />
            <h3>مستقیم بیا</h3>
            <a href="mailto:hello@chartagh.ir">hello@chartagh.ir</a>
            <p>هر جا که اینترنت باشه، ما هم هستیم.</p>
            <ul>
              <li>شنبه تا چهارشنبه، ۹ صبح تا ۶ عصر</li>
              <li>جواب پیام‌ها: کمتر از یه روز کاری</li>
              <li>جلسه‌ی آشنایی: رایگان و بی‌تعارف</li>
            </ul>
          </Tilt>
        </Reveal>
      </aside>
    </section>
  );
}
