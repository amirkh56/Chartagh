'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTheme } from '@/lib/useTheme';

const SCENES = {
  hero: dynamic(() => import('./HeroScene'), { ssr: false }),
  shamseh: dynamic(() => import('./ShamsehScene'), { ssr: false }),
};

// Mounts a WebGL scene lazily and pauses its render loop when off-screen.
export default function Stage({ scene, className = '', cursor }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '300px' });
  const active = useInView(ref, { margin: '100px' });
  const night = useTheme() === 'night';
  const Scene = SCENES[scene];
  return (
    <div ref={ref} className={`stage ${className}`} data-cursor={cursor} data-no-fx>
      {seen && <Scene active={active} night={night} />}
    </div>
  );
}
