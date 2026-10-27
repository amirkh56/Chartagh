'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useLang } from './Lang';

// Qajar-style استکان: clear glass with a gilded rim and an oval gilded medallion,
// on a white saucer with a blue-and-turquoise painted band and a teaspoon.
// Three sips per glass, three glasses in all; then the pot is empty.
const GLASS = 'M106 64C108 112 128 136 131 166C134 198 114 228 114 262L206 262C206 228 186 198 189 166C192 136 212 112 214 64Z';
const LEVELS = [86, 146, 204, 262]; // tea surface: full → empty
const GLASSES = 3;
const BLUE = '#1E4E9C';
const TURQ = '#2A9D9A';
const GOLD = '#C9A24A';

export default function TeaGlass() {
  const { t } = useLang();
  const [glass, setGlass] = useState(0);
  const [sip, setSip] = useState(0);
  const lift = useAnimationControls();
  const empty = sip === LEVELS.length - 1;
  const done = empty && glass === GLASSES - 1;

  // pour the next glass shortly after one is finished
  useEffect(() => {
    if (!empty || done) return;
    const id = setTimeout(() => {
      setGlass((g) => g + 1);
      setSip(0);
    }, 1800);
    return () => clearTimeout(id);
  }, [empty, done]);

  const drink = () => {
    if (done) {
      setGlass(0);
      setSip(0);
      return;
    }
    if (empty) return;
    setSip((s) => s + 1);
    lift.start({ rotate: [0, -9, -9, 0], y: [0, -26, -26, 0], transition: { duration: 1.1, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' } });
  };

  const caption = done ? t.tea.done : empty ? t.tea.pouring : t.tea.glasses[glass][sip];
  const level = LEVELS[sip];

  return (
    <div className="tea">
      <button className="tea__btn" onClick={drink} data-cursor={done ? t.tea.again : empty ? t.tea.refill : t.tea.sip} aria-label={t.tea.aria}>
        <svg viewBox="0 0 320 330" className="tea__svg" aria-hidden>
          <defs>
            <clipPath id="tea-glass">
              <path d={GLASS} />
            </clipPath>
            <linearGradient id="tea-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#D9682F" />
              <stop offset=".5" stopColor="#A8341B" />
              <stop offset="1" stopColor="#5E170C" />
            </linearGradient>
            <linearGradient id="tea-silver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F4F4F2" />
              <stop offset=".5" stopColor="#B9BCBE" />
              <stop offset="1" stopColor="#E6E7E8" />
            </linearGradient>
          </defs>

          {/* saucer — white porcelain, gold rim, painted band */}
          <ellipse cx="160" cy="302" rx="128" ry="16" className="tea__shadow" />
          <ellipse cx="160" cy="278" rx="148" ry="38" fill="#FDFCFA" stroke={GOLD} strokeWidth="3" />
          <ellipse cx="160" cy="276" rx="134" ry="31" fill="none" stroke={BLUE} strokeWidth="9" strokeDasharray="14 7" />
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return <circle key={i} cx={(160 + 134 * Math.cos(a)).toFixed(2)} cy={(276 + 31 * Math.sin(a)).toFixed(2)} r="4" fill={TURQ} stroke={GOLD} strokeWidth="1" />;
          })}
          <ellipse cx="160" cy="274" rx="92" ry="19" fill="#fff" stroke={GOLD} strokeWidth="1.5" />
          <ellipse cx="160" cy="273" rx="66" ry="12" fill="none" stroke={TURQ} strokeWidth="2" strokeDasharray="3 4" />

          {/* teaspoon resting on the saucer */}
          <g transform="rotate(-62 70 250)">
            <rect x="66" y="150" width="7" height="104" rx="3.5" fill="url(#tea-silver)" />
            <ellipse cx="69.5" cy="262" rx="12" ry="17" fill="url(#tea-silver)" stroke="#9EA2A5" strokeWidth="1" />
          </g>

          {/* the glass */}
          <motion.g animate={lift} style={{ originX: '160px', originY: '262px' }}>
            <g clipPath="url(#tea-glass)">
              <rect x="90" y="40" width="140" height="230" fill="#fff" opacity=".35" />
              <motion.rect x="90" width="140" height="220" fill="url(#tea-liquid)" initial={false} animate={{ y: level }} transition={{ duration: empty ? 0.6 : 0.9, ease: 'easeInOut' }} />
              <motion.ellipse cx="160" rx="70" ry="5" fill="#E68A50" initial={false} animate={{ cy: level, opacity: empty ? 0 : 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
            </g>
            <path d={GLASS} fill="none" stroke="#C9C2BA" strokeWidth="2.5" />
            <path d="M115 80C117 122 135 146 137 170" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" fill="none" />
            {/* gilded rim and foot */}
            <ellipse cx="160" cy="64" rx="54" ry="7" fill="none" stroke={GOLD} strokeWidth="4" />
            <path d="M112 262H208L204 270H116Z" fill={GOLD} />
            {/* medallion: gilded oval frame with a crest and a turquoise toranj */}
            <g transform="translate(160 180)">
              <path d="M-9 -44c3-8 15-8 18 0c-6-2-12-2-18 0z" fill={GOLD} />
              <ellipse rx="30" ry="40" fill="#FBF3E2" stroke={GOLD} strokeWidth="5" />
              <ellipse rx="22" ry="31" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="2 3" />
              <path d="M0 -20L14 0L0 20L-14 0Z" fill={TURQ} />
              <path d="M0 -11L7 0L0 11L-7 0Z" fill={BLUE} />
              <circle r="2.5" fill={GOLD} />
            </g>
          </motion.g>

          {/* steam */}
          <AnimatePresence>
            {!empty && (
              <motion.g key="steam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <path d="M138 50c-10-12 10-18 0-32" className="tea__steam" style={{ animationDelay: '0s' }} />
                <path d="M160 46c-10-12 10-18 0-34" className="tea__steam" style={{ animationDelay: '.6s' }} />
                <path d="M182 50c-10-12 10-18 0-32" className="tea__steam" style={{ animationDelay: '1.2s' }} />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </button>
      <AnimatePresence mode="wait">
        <motion.p key={caption} className="tea__caption" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          {caption}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
