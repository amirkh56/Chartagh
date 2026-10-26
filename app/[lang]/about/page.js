import PageHead from '@/components/PageHead';
import AboutBody from '@/components/AboutBody';
import Stats from '@/components/sections/Stats';
import Cta from '@/components/sections/Cta';
import { getDict } from '@/lib/dict';
import { pageMeta } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const a = getDict(lang).about;
  return pageMeta({ lang, path: '/about', title: a.title, description: a.lead });
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const a = getDict(lang).about;
  return (
    <>
      <PageHead eyebrow={a.eyebrow} title={a.heading} lead={a.lead} />
      <AboutBody />
      <Stats className="stats--about" />
      <Cta />
    </>
  );
}
