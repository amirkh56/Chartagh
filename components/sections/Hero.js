'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Stage from '../three/Stage';
import { Magnetic, Words, spot, EASE } from '../motion';
import { Pattern, Arrow, StarIcon } from '../Ornaments';
import { TransitionLink } from '../Transition';
import { useLoaded } from '../Loader';
import { useLenis } from 'lenis/react';

const PILLARS = [
  { label: 'طراحی سایت', cls: 'p1' },
  { label: 'طراحی پوستر', cls: 'p2' },
  { label: 'سه‌بعدی', cls: 'p3' },
  { label: 'سئو', cls: 'p4' },
];

export default function Hero() {
  const loaded = useLoaded();
  const lenis = useLenis();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yStage = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yCopy = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const show = (d) => ({ initial: { opacity: 0, y: 30 }, animate: loaded ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, delay: d, ease: EASE } });

  return (
    <section ref={ref} className="hero" {...spot}>
      <Pattern name="khatam" className="hero__pat" />
      <Pattern name="khatam" className="hero__pat hero__pat--spot" />

      <div className="hero__grid container">
        <motion.div className="hero__copy" style={{ y: yCopy, opacity: fade }}>
          <motion.p className="eyebrow" {...show(0.1)}>
            <StarIcon className="eyebrow__star" /> سلام رفیق! خوش اومدی
          </motion.p>
          <h1 className="hero__title">
            <Words text="چهار ستون محکم" animate={loaded} delay={0.15} />
            <br />
            <span className="hero__accent">
              <Words text="برای برندِ تو" animate={loaded} delay={0.4} />
              <motion.svg className="hero__swash" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M4 16 C 60 4, 120 22, 170 12 S 260 6, 296 14"
                  initial={{ pathLength: 0 }}
                  animate={loaded ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 1, ease: EASE }}
                />
              </motion.svg>
            </span>
          </h1>
          <motion.p className="hero__lead" {...show(0.7)}>
            ما <b>چارطاق</b>یم؛ یه آژانس خلاق که <b>پنج ساله</b> سایت می‌سازه، پوستر طراحی می‌کنه، سه‌بعدی کار می‌کنه و سئو؛ با چاشنی هنر ایرانی و یه عالمه حوصله.
          </motion.p>
          <motion.div className="hero__ctas" {...show(0.85)}>
            <Magnetic>
              <TransitionLink href="/contact" className="btn btn--primary">
                <span>بزن بریم، پروژه داریم</span>
                <Arrow />
              </TransitionLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <TransitionLink href="/#showcase" className="btn btn--ghost">
                <span>ببین چطور می‌سازیم</span>
              </TransitionLink>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" style={{ y: yStage }}>
          <motion.div
            className="iwan"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          >
            <svg className="iwan__frame" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden>
              <rect x="2" y="2" width="396" height="516" rx="6" className="iwan__rect" />
              <path d="M30 518 V230 C30 140 130 90 200 26 C270 90 370 140 370 230 V518" className="iwan__arch" />
              <path d="M52 518 V236 C52 158 140 112 200 56 C260 112 348 158 348 236 V518" className="iwan__arch iwan__arch--in" />
            </svg>
            <Pattern name="girih" className="iwan__spandrel iwan__spandrel--r" />
            <Pattern name="girih" className="iwan__spandrel iwan__spandrel--l" />
          </motion.div>
          <Stage scene="hero" className="hero__stage" cursor="بکش و بچرخون" />
          {PILLARS.map((p, i) => (
            <motion.a
              key={p.cls}
              href="#services"
              className={`pillar ${p.cls}`}
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo('#services', { offset: -10, duration: 1.4 });
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={loaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 1.1 + i * 0.12 }}
            >
              <i />
              {p.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div className="hero__scroll" style={{ opacity: fade }} aria-hidden>
        <span className="hero__scroll-track">
          <i />
        </span>
        بیا پایین
      </motion.div>
    </section>
  );
}
