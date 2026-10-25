import PageHead from '@/components/PageHead';
import AboutBody from '@/components/AboutBody';
import Stats from '@/components/sections/Stats';
import Cta from '@/components/sections/Cta';

export const metadata = { title: 'درباره ما' };

export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="درباره ما" title="سقفی استوار برای ایده‌های شما" lead="چارطاق آژانسی تبلیغاتی است که پنج سال است در طراحی سایت، طراحی پوستر و سئو کنار برندها ایستاده است." />
      <AboutBody />
      <Stats className="stats--about" />
      <Cta />
    </>
  );
}
