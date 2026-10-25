'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Magnetic, Words, spot, EASE } from '../motion';
import { Pattern, Arrow, StarIcon, Toranj, Icon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { useLoaded } from '../Loader';
import Logo from '../Logo';

// glazed-tile service icons floating around the mark; `d` = parallax depth
const TILES = [
  { icon: 'web', label: 'طراحی سایت', cls: 't1', d: 34 },
  { icon: 'poster', label: 'طراحی پوستر', cls: 't2', d: 22 },
  { icon: 'seo', label: 'سئو', cls: 't3', d: 28 },
  { icon: 'megaphone', label: 'تبلیغات', cls: 't4', d: 16 },
  { icon: 'pen', label: 'ایده و طراحی', cls: 't5', d: 40 },
];

const FACTS = [
  ['۵+', 'سال تجربه'],
  ['۳', 'تخصص اصلی'],
  ['۱۰۰٪', 'همراهی پس از تحویل'],
];

function Parallax({ mx, my, depth, className, children, ...rest }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }} {...rest}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yArt = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const yCopy = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const show = (d) => ({ initial: { opacity: 0, y: 30 }, animate: loaded ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, delay: d, ease: EASE } });

  return (
    <section
      ref={ref}
      className="hero"
      onPointerMove={(e) => {
        spot.onPointerMove(e);
        if (e.pointerType !== 'mouse') return;
        mx.set(e.clientX / innerWidth - 0.5);
        my.set(e.clientY / innerHeight - 0.5);
      }}
      onPointerLeave={(e) => {
        spot.onPointerLeave(e);
        mx.set(0);
        my.set(0);
      }}
    >
      <Pattern name="herati" className="hero__pat" />
      <Pattern name="herati" className="hero__pat hero__pat--spot" />

      <div className="hero__grid container">
        <motion.div className="hero__copy" style={{ y: yCopy, opacity: fade }}>
          <motion.p className="eyebrow" {...show(0.1)}>
            <StarIcon className="eyebrow__star" /> آژانس تبلیغاتی چارطاق
          </motion.p>
          <h1 className="hero__title">
            <Words text="برندتان را" animate={loaded} delay={0.15} />
            <br />
            <span className="hero__accent">
              <Words text="ماندگار می‌سازیم" animate={loaded} delay={0.35} />
              <svg className="hero__swash" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M4 16 C 60 4, 120 22, 170 12 S 260 6, 296 14"
                  initial={{ pathLength: 0 }}
                  animate={loaded ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 1, ease: EASE }}
                />
              </svg>
            </span>
          </h1>
          <motion.p className="hero__lead" {...show(0.65)}>
            چارطاق یک آژانس تبلیغاتی و خلاق است که <b>پنج سال</b> است در <b>طراحی سایت</b>، <b>طراحی پوستر</b> و <b>سئو</b> کنار برندها ایستاده؛ با الهام از هنر ایرانی و نگاهی امروزی.
          </motion.p>
          <motion.div className="hero__ctas" {...show(0.8)}>
            <Magnetic>
              <TransitionLink href="/contact" className="btn btn--primary">
                <span>شروع همکاری</span>
                <Arrow />
              </TransitionLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <TransitionLink href="/#work" className="btn btn--ghost">
                <span>مشاهده‌ی نمونه‌کارها</span>
              </TransitionLink>
            </Magnetic>
          </motion.div>
          <motion.ul className="hero__facts" {...show(0.95)}>
            {FACTS.map(([v, l]) => (
              <li key={l}>
                <b>{v}</b>
                <span>{l}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="hero__art" style={{ y: yArt }}>
          <motion.div
            className="iwan"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
          >
            <Pattern name="boteh" className="iwan__field" />
            <svg className="iwan__frame" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
              <rect x="2" y="2" width="396" height="496" rx="8" className="iwan__rect" />
              <rect x="14" y="14" width="372" height="472" rx="4" className="iwan__rect iwan__rect--in" />
              <path d="M44 498 V228 C44 140 136 96 200 34 C264 96 356 140 356 228 V498" className="iwan__arch" />
              <motion.path
                d="M64 498 V234 C64 156 146 116 200 62 C254 116 336 156 336 234 V498"
                className="iwan__arch-in"
                initial={{ pathLength: 0 }}
                animate={loaded ? { pathLength: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.5, ease: EASE }}
              />
            </svg>
          </motion.div>

          <Parallax mx={mx} my={my} depth={-14} className="hero__toranj">
            <Toranj />
          </Parallax>

          <Parallax mx={mx} my={my} depth={10} className="hero__mark">
            {loaded && <Logo animated className="hero__logo" />}
            <span className="hero__shadow" aria-hidden />
          </Parallax>

          {TILES.map((t, i) => (
            <Parallax key={t.cls} mx={mx} my={my} depth={t.d} className={`tile ${t.cls}`}>
              <motion.a
                href="#services"
                className="tile__btn"
                data-cursor={t.label}
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', stiffness: 150, damping: 13, delay: 1 + i * 0.12 }}
                whileHover={{ scale: 1.12, rotate: -6 }}
                aria-label={t.label}
              >
                <Icon name={t.icon} />
                <span className="tile__label">{t.label}</span>
              </motion.a>
            </Parallax>
          ))}
        </motion.div>
      </div>

      <motion.div className="hero__scroll" style={{ opacity: fade }} aria-hidden>
        <span className="hero__scroll-track">
          <i />
        </span>
        اسکرول کنید
      </motion.div>
    </section>
  );
}
