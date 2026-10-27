// Language plumbing shared by server and client code.
// Persian is the default and lives at "/"; English lives under "/en".
export const LANGS = ['fa', 'en'];
export const DEFAULT_LANG = 'fa';
export const isLang = (l) => LANGS.includes(l);
export const dirOf = (lang) => (lang === 'fa' ? 'rtl' : 'ltr');

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://chartagh.agency').replace(/\/$/, '');

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
export const fa = (v) => String(v).replace(/\d/g, (d) => FA_DIGITS[d]);
export const num = (v, lang) => (lang === 'fa' ? fa(v) : String(v));

// "/work" → "/en/work" for English; hash links and external URLs pass through untouched.
export function localize(href, lang) {
  if (lang === DEFAULT_LANG || typeof href !== 'string' || !href.startsWith('/') || href === '/en' || href.startsWith('/en/') || href.startsWith('/en#')) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

// the same page in the other language
export function switchPath(pathname, to) {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return to === 'en' ? (bare === '/' ? '/en' : `/en${bare}`) : bare;
}

// canonical + hreflang alternates for a language-less path like "/work/web"
export function alternates(path, lang) {
  const fa_ = path;
  const en_ = path === '/' ? '/en' : `/en${path}`;
  return {
    canonical: lang === 'en' ? en_ : fa_,
    languages: { fa: fa_, en: en_, 'x-default': fa_ },
  };
}

export function pageMeta({ lang, path, title, description, image }) {
  return {
    title,
    description,
    alternates: alternates(path, lang),
    openGraph: {
      title,
      description,
      url: alternates(path, lang).canonical,
      locale: lang === 'fa' ? 'fa_IR' : 'en_US',
      alternateLocale: lang === 'fa' ? ['en_US'] : ['fa_IR'],
      type: 'website',
      siteName: lang === 'fa' ? 'چارطاق' : 'Chartagh',
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// JSON-LD must not be able to close its <script> tag
export const ldJson = (data) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
