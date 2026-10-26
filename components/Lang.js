'use client';
import { createContext, Fragment, useContext, useMemo } from 'react';
import { dirOf, localize, num } from '@/lib/i18n';

const Ctx = createContext(null);

// The active dictionary arrives from the server layout, so only one language ships to the browser.
export function LangProvider({ lang, dict, children }) {
  const value = useMemo(
    () => ({
      lang,
      t: dict,
      dir: dirOf(lang),
      n: (v) => num(v, lang),
      href: (h) => localize(h, lang),
    }),
    [lang, dict]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

// Renders "**bold**" segments of a dictionary string as <b>.
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : <Fragment key={i}>{part}</Fragment>
  );
}
