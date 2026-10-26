'use client';
import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { StarIcon } from '../Ornaments';
import { useLang } from '../Lang';

const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// Ribbon that drifts on its own and speeds up / flips with scroll velocity.
function Row({ items, speed = 2.2, className = '' }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * speed * (delta / 1000);
    move += dir.current * move * Math.abs(f);
    base.set(base.get() + move);
  });

  const line = (
    <>
      {items.map((t, i) => (
        <span className="marquee__item" key={i}>
          {t}
          <StarIcon className="marquee__star" />
        </span>
      ))}
    </>
  );
  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee__track" style={{ x }}>
        <div className="marquee__half">{line}</div>
        <div className="marquee__half" aria-hidden>
          {line}
        </div>
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const { t } = useLang();
  return (
    <section className="marquees" aria-label={t.marquee.aria}>
      <Row className="marquee--brick" items={t.marquee.a} />
      <Row className="marquee--line" speed={-1.6} items={t.marquee.b} />
    </section>
  );
}
