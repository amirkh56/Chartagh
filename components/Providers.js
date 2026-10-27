'use client';
import { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { LangProvider } from './Lang';
import { TransitionProvider } from './Transition';
import Loader, { LoadCtx } from './Loader';
import Cursor from './Cursor';
import ClickFX from './ClickFX';

export default function Providers({ lang, dict, children }) {
  const [loaded, setLoaded] = useState(false);
  // set by the theme script in <head>; only changes options, never markup, so hydration is safe
  const [lite] = useState(() => typeof document !== 'undefined' && document.documentElement.dataset.lite === '1');
  return (
    <LangProvider lang={lang} dict={dict}>
      <MotionConfig reducedMotion={lite ? 'always' : 'user'}>
        <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1, smoothWheel: !lite, anchors: { offset: -10 } }}>
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
    </LangProvider>
  );
}
