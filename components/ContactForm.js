'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Tilt, EASE } from './motion';
import { Arrow, Pattern, Toranj } from './Ornaments';
import { useLang } from './Lang';

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
  const { t, lang } = useLang();
  const c = t.contact;
  const [services, setServices] = useState([]);
  const [budget, setBudget] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get('name')).trim() || !String(data.get('contact')).trim()) {
      setError(c.error);
      return;
    }
    setError('');
    setState('sending');
    // `next dev` has no PHP; the real endpoint is public/api/contact.php on the host
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => setState('sent'), 800);
      return;
    }
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          contact: data.get('contact'),
          message: data.get('message'),
          website: data.get('website'), // honeypot
          services,
          budget,
          lang,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) return setState('sent');
      setError(body.error === 'rate' ? c.rate : body.error === 'required' ? c.error : c.failed);
    } catch {
      setError(c.failed);
    }
    setState('idle');
  };

  return (
    <section className="contact container">
      <Reveal className="contact__form-wrap">
        <AnimatePresence mode="wait">
          {state !== 'sent' ? (
            <motion.form key="form" className="contact__form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="field-row">
                <label className="field">
                  <span>{c.name}</span>
                  <input name="name" autoComplete="name" placeholder={c.namePh} maxLength={80} required />
                </label>
                <label className="field">
                  <span>{c.reach}</span>
                  <input name="contact" autoComplete="email" inputMode="email" placeholder={c.reachPh} dir="auto" maxLength={120} required />
                </label>
              </div>
              <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <fieldset className="field">
                <legend>{c.need}</legend>
                <Chips name="services" options={c.needs} multi value={services} onChange={setServices} />
              </fieldset>
              <fieldset className="field">
                <legend>{c.budget}</legend>
                <Chips name="budget" options={c.budgets} value={budget} onChange={setBudget} />
              </fieldset>
              <label className="field">
                <span>{c.message}</span>
                <textarea name="message" rows={5} placeholder={c.messagePh} maxLength={2000} />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="btn btn--primary btn--block" disabled={state === 'sending'}>
                <span>{state === 'sending' ? c.sending : c.send}</span>
                <Arrow />
              </button>
            </motion.form>
          ) : (
            <motion.div key="ok" className="contact__ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }} role="status">
              <Toranj className="contact__ok-sun" />
              <h2>{c.okTitle}</h2>
              <p>{c.okText}</p>
              <button className="btn btn--ghost" onClick={() => setState('idle')}>
                <span>{c.again}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <aside className="contact__aside">
        <Reveal delay={0.1}>
          <Tilt className="info-card">
            <Pattern name="boteh" className="info-card__pat" />
            <h2 className="info-card__h">{c.direct}</h2>
            <a href="mailto:hello@chartagh.agency">hello@chartagh.agency</a>
            <p>{c.directText}</p>
            <ul>
              {c.info.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Tilt>
        </Reveal>
      </aside>
    </section>
  );
}
