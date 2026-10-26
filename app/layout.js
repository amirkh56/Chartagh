import localFont from 'next/font/local';
import 'lenis/dist/lenis.css';
import './globals.css';
import './work.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';

const yekan = localFont({
  src: [
    { path: './fonts/YekanBakhFaNum-THIN.ttf', weight: '100' },
    { path: './fonts/YekanBakhFaNum-LIGHT.ttf', weight: '300' },
    { path: './fonts/YekanBakhFaNum-REGULAR.ttf', weight: '400' },
    { path: './fonts/YekanBakhFaNum-SEMIBOLD.ttf', weight: '600' },
    { path: './fonts/YekanBakhFaNum-BOLD.ttf', weight: '700' },
    { path: './fonts/YekanBakhFaNum-EXTRABOLD.ttf', weight: '800' },
    { path: './fonts/YekanBakhFaNum-BLACK.ttf', weight: '900' },
    { path: './fonts/YekanBakhFaNum-EXTRABLACK.ttf', weight: '950' },
  ],
  variable: '--font-yekan',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'چارطاق | آژانس تبلیغاتی؛ طراحی سایت، طراحی پوستر و سئو',
    template: '%s | چارطاق',
  },
  description: 'چارطاق، آژانس تبلیغاتی و خلاق با پنج سال تجربه در طراحی سایت، طراحی پوستر و سئو؛ با الهام از هنر و معماری ایرانی.',
  keywords: ['طراحی سایت', 'طراحی پوستر', 'سئو', 'آژانس تبلیغاتی', 'چارطاق'],
  openGraph: { title: 'چارطاق', description: 'آژانس تبلیغاتی چارطاق؛ برندتان را ماندگار می‌سازیم', locale: 'fa_IR', type: 'website' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6EEE6' },
    { media: '(prefers-color-scheme: dark)', color: '#170C09' },
  ],
};

// Runs before paint so night mode never flashes. Day is the default.
const THEME_SCRIPT = `try{document.documentElement.dataset.theme=localStorage.getItem('chartagh-theme')==='night'?'night':'day'}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-theme="day" className={yekan.variable} suppressHydrationWarning>
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
