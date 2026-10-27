export const dynamic = 'force-static';
export default function manifest() {
  return {
    name: 'چارطاق | Chartagh',
    short_name: 'چارطاق',
    description: 'آژانس تبلیغاتی چارطاق؛ طراحی سایت، طراحی پوستر و سئو — Chartagh creative agency',
    start_url: '/',
    display: 'standalone',
    dir: 'rtl',
    lang: 'fa',
    background_color: '#F6EEE6',
    theme_color: '#E2492D',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
