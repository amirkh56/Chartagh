import localFont from 'next/font/local';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import 'lenis/dist/lenis.css';
import '../globals.css';
import '../work.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';
import { PatternVars } from '@/components/Ornaments';
import { LANGS, SITE_URL, dirOf, isLang, pageMeta } from '@/lib/i18n';
import { getDict } from '@/lib/dict';

const yekan = localFont({
  src: [
    { path: '../fonts/YekanBakhFaNum-THIN.woff2', weight: '100' },
    { path: '../fonts/YekanBakhFaNum-LIGHT.woff2', weight: '300' },
    { path: '../fonts/YekanBakhFaNum-REGULAR.woff2', weight: '400' },
    { path: '../fonts/YekanBakhFaNum-SEMIBOLD.woff2', weight: '600' },
    { path: '../fonts/YekanBakhFaNum-BOLD.woff2', weight: '700' },
    { path: '../fonts/YekanBakhFaNum-EXTRABOLD.woff2', weight: '800' },
    { path: '../fonts/YekanBakhFaNum-BLACK.woff2', weight: '900' },
    { path: '../fonts/YekanBakhFaNum-EXTRABLACK.woff2', weight: '950' },
  ],
  variable: '--font-yekan',
  display: 'swap',
});

// Yekan Bakh FaNum draws every digit in Persian; English pages take Latin digits from Manrope.
const digits = localFont({
  src: '../fonts/Manrope-latin-wght.woff2',
  weight: '200 800',
  variable: '--font-digits',
  display: 'swap',
  preload: false,
  // no generated fallback face: it would cover every character and steal the letters from Yekan
  adjustFontFallback: false,
  fallback: [],
  declarations: [{ prop: 'unicode-range', value: 'U+0030-0039, U+0025, U+002B, U+0023' }],
});

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMeta({ lang, path: '/', title: t.meta.title, description: t.meta.description }),
    title: { default: t.meta.title, template: `%s | ${t.meta.siteName}` },
    keywords: t.meta.keywords,
    applicationName: t.meta.siteName,
    creator: t.meta.siteName,
    formatDetection: { telephone: false },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6EEE6' },
    { media: '(prefers-color-scheme: dark)', color: '#170C09' },
  ],
};

// Runs before paint so night mode never flashes. Day is the default.
// weak machines (≤4 cores or ≤4GB) get data-lite: native scroll, no looping animations, no custom cursor
const THEME_SCRIPT = `try{document.documentElement.dataset.theme=localStorage.getItem('chartagh-theme')==='night'?'night':'day'}catch(e){}try{var n=navigator;if((n.hardwareConcurrency||8)<=4||(n.deviceMemory||8)<=4)document.documentElement.dataset.lite='1'}catch(e){}`;

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} dir={dirOf(lang)} data-theme="day" className={`${yekan.variable} ${digits.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <PatternVars />
        <a className="skip" href="#main">
          {t.common.skip}
        </a>
        <Providers lang={lang} dict={t}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
