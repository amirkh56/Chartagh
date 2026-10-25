'use client';
import { useEffect, useState } from 'react';

// Theme lives on <html data-theme>; this hook just mirrors it.
export function useTheme() {
  const [theme, setTheme] = useState('day');
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.dataset.theme === 'night' ? 'night' : 'day');
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);
  return theme;
}
