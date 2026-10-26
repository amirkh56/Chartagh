'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useLang } from './Lang';

// استکان کمرباریک on a painted saucer. Each click is one sip; once it's empty it refills.
const GLASS = 'M104 70C106 120 128 140 130 170C132 200 112 230 112 262L208 262C208 230 188 200 190 170C192 140 214 120 216 70Z';
const LEVELS = [92, 150, 205, 262]; // y of the tea surface: full → empty

export default function TeaGlass() {
  const [sip, setSip] = useState(0);
  const { t } = useLang();
  const lift = useAnimationControls();
  const refill = useRef(null);
  const empty = sip === LEVELS.length - 1;

  useEffect(() => {
    if (!empty) return;
    refill.current = setTimeout(() => setSip(0), 1800);
    return () => clearTimeout(refill.current);
  }, [empty]);

  const drink = () => {
    if (empty) return;
    setSip((s) => s + 1);
    lift.start({ rotate: [0, -9, -9, 0], y: [0, -26, -26, 0], transition: { duration: 1.1, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' } });
  };

  const level = LEVELS[sip];

  return (
    <div className="tea">
      <button className="tea__btn" onClick={drink} data-cursor={empty ? t.tea.refill : t.tea.sip} aria-label={t.tea.aria}>
        <svg viewBox="0 0 320 330" className="tea__svg" aria-hidden>
          <defs>
            <clipPath id="tea-glass">
              <path d={GLASS} />
            </clipPath>
            <linearGradient id="tea-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E0703A" />
              <stop offset=".45" stopColor="#B5391F" />
              <stop offset="1" stopColor="#6E1C0F" />
            </linearGradient>
            <linearGradient id="tea-shine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* saucer — نعلبکی with a gilded, painted rim */}
          <ellipse cx="160" cy="300" rx="128" ry="18" className="tea__shadow" />
          <ellipse cx="160" cy="276" rx="146" ry="36" className="tea__saucer" />
          <ellipse cx="160" cy="276" rx="146" ry="36" className="tea__rim" />
          <ellipse cx="160" cy="274" rx="118" ry="26" className="tea__band" />
          {Array.from({ length: 18 }, (_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return <circle key={i} cx={(160 + 132 * Math.cos(a)).toFixed(2)} cy={(276 + 31 * Math.sin(a)).toFixed(2)} r="3" className={i % 2 ? 'tea__dot' : 'tea__dot tea__dot--b'} />;
          })}
          <ellipse cx="160" cy="272" rx="76" ry="15" className="tea__well" />

          {/* sugar cubes — قند */}
          <g className="tea__qand">
            <path d="M232 262l14-7 14 7-14 7z" fill="#fffaf5" />
            <path d="M232 262v12l14 7v-12z" fill="#efe1d6" />
            <path d="M260 262v12l-14 7v-12z" fill="#e2cfc2" />
            <path d="M250 250l11-6 11 6-11 6z" fill="#fffaf5" />
            <path d="M250 250v10l11 6v-10z" fill="#efe1d6" />
            <path d="M272 250v10l-11 6v-10z" fill="#e2cfc2" />
          </g>

          {/* the glass */}
          <motion.g animate={lift} style={{ originX: '160px', originY: '262px' }}>
            <g clipPath="url(#tea-glass)">
              <motion.rect x="90" width="140" height="220" fill="url(#tea-liquid)" initial={false} animate={{ y: level }} transition={{ duration: empty ? 0.6 : 0.9, ease: 'easeInOut' }} />
              <motion.ellipse cx="160" rx="70" ry="5" className="tea__surface" initial={false} animate={{ cy: level, opacity: empty ? 0 : 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
            </g>
            <path d={GLASS} className="tea__glass" />
            <path d="M114 84C116 124 134 146 136 170" className="tea__glint" />
            <path d="M122 236C120 246 120 252 121 258" className="tea__glint" />
            <ellipse cx="160" cy="70" rx="56" ry="7" className="tea__lip" />
            <path d="M113 250H207" className="tea__gold" />
            <path d="M110 262H210L206 270H114Z" className="tea__foot" />
          </motion.g>

          {/* steam — بخار */}
          <AnimatePresence>
            {!empty && (
              <motion.g key="steam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <path d="M138 56c-10-12 10-18 0-32" className="tea__steam" style={{ animationDelay: '0s' }} />
                <path d="M160 52c-10-12 10-18 0-34" className="tea__steam" style={{ animationDelay: '.6s' }} />
                <path d="M182 56c-10-12 10-18 0-32" className="tea__steam" style={{ animationDelay: '1.2s' }} />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </button>
      <AnimatePresence mode="wait">
        <motion.p key={sip} className="tea__caption" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          {t.tea.captions[sip]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
