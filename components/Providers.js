'use client';
import { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { TransitionProvider } from './Transition';
import Loader, { LoadCtx } from './Loader';
import Cursor from './Cursor';
import ClickFX from './ClickFX';

export default function Providers({ children }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, anchors: { offset: -10 } }}>
        <LoadCtx.Provider value={{ loaded, setLoaded }}>
          <TransitionProvider>
            {children}
            <Loader />
            <ClickFX />
            <Cursor />
          </TransitionProvider>
        </LoadCtx.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
