import localFont from 'next/font/local';
import 'lenis/dist/lenis.css';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';

const dana = localFont({
  src: [
    { path: './fonts/DanaFaNum-Light.woff2', weight: '300' },
    { path: './fonts/DanaFaNum-Regular.woff2', weight: '400' },
    { path: './fonts/DanaFaNum-Medium.woff2', weight: '500' },
    { path: './fonts/DanaFaNum-DemiBold.woff2', weight: '600' },
    { path: './fonts/DanaFaNum-Bold.woff2', weight: '700' },
    { path: './fonts/DanaFaNum-ExtraBold.woff2', weight: '800' },
    { path: './fonts/DanaFaNum-Black.woff2', weight: '900' },
  ],
  variable: '--font-dana',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'چارطاق | آژانس خلاق طراحی سایت، پوستر، سه‌بعدی و سئو',
    template: '%s | چارطاق',
  },
  description: 'چارطاق؛ آژانس تبلیغاتی و خلاق با پنج سال تجربه در طراحی سایت، طراحی پوستر، طراحی سه‌بعدی و سئو؛ با الهام از هنر و معماری ایرانی.',
  keywords: ['طراحی سایت', 'طراحی پوستر', 'طراحی سه بعدی', 'سئو', 'آژانس تبلیغاتی', 'چارطاق'],
  openGraph: { title: 'چارطاق', description: 'چهار ستون محکم برای برند تو', locale: 'fa_IR', type: 'website' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7EEE5' },
    { media: '(prefers-color-scheme: dark)', color: '#140A07' },
  ],
};

// Runs before paint so night mode never flashes. Day is the default.
const THEME_SCRIPT = `try{document.documentElement.dataset.theme=localStorage.getItem('chartagh-theme')==='night'?'night':'day'}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-theme="day" className={dana.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a className="skip" href="#main">
          پرش به محتوا
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
