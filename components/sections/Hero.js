'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Magnetic, Words, spot, EASE } from '../motion';
import { Pattern, Arrow, StarIcon, Toranj, Icon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { useLoaded } from '../Loader';
import Logo from '../Logo';
import { useLang, Rich } from '../Lang';

// glazed-tile service icons floating around the mark; `d` = parallax depth
const TILES = [
  { icon: 'web', cls: 't1', d: 34 },
  { icon: 'poster', cls: 't2', d: 22 },
  { icon: 'seo', cls: 't3', d: 28 },
  { icon: 'megaphone', cls: 't4', d: 16 },
  { icon: 'pen', cls: 't5', d: 40 },
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
  const { t } = useLang();
  const h = t.hero;
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
            <StarIcon className="eyebrow__star" /> {h.eyebrow}
          </motion.p>
          <h1 className="hero__title">
            <Words text={h.line1} animate={loaded} delay={0.15} />
            <br />
            <span className="hero__accent">
              <Words text={h.line2} animate={loaded} delay={0.35} />
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
            <Rich text={h.lead} />
          </motion.p>
          <motion.div className="hero__ctas" {...show(0.8)}>
            <Magnetic>
              <TransitionLink href="/contact" className="btn btn--primary">
                <span>{t.common.start}</span>
                <Arrow />
              </TransitionLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <TransitionLink href="/#work" className="btn btn--ghost">
                <span>{h.secondary}</span>
              </TransitionLink>
            </Magnetic>
          </motion.div>
          <motion.ul className="hero__facts" {...show(0.95)}>
            {h.facts.map(([v, l]) => (
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
            {loaded && <Logo animated className="hero__logo" title={t.common.brand} />}
            <span className="hero__shadow" aria-hidden />
          </Parallax>

          {TILES.map((tile, i) => (
            <Parallax key={tile.cls} mx={mx} my={my} depth={tile.d} className={`tile ${tile.cls}`}>
              <motion.a
                href="#services"
                className="tile__btn"
                data-cursor={h.tiles[i]}
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', stiffness: 150, damping: 13, delay: 1 + i * 0.12 }}
                whileHover={{ scale: 1.12, rotate: -6 }}
                aria-label={h.tiles[i]}
              >
                <Icon name={tile.icon} />
                <span className="tile__label">{h.tiles[i]}</span>
              </motion.a>
            </Parallax>
          ))}
        </motion.div>
      </div>

      <motion.div className="hero__scroll" style={{ opacity: fade }} aria-hidden>
        <span className="hero__scroll-track">
          <i />
        </span>
        {h.scroll}
      </motion.div>
    </section>
  );
}
