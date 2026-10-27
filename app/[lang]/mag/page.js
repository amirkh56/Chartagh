import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';
import { MagView } from '@/components/mag/Mag';
import { getDict } from '@/lib/dict';
import { pageMeta } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = getDict(lang).mag;
  return pageMeta({ lang, path: '/mag', title: m.title, description: m.lead });
}

export default async function MagPage({ params }) {
  const { lang } = await params;
  const m = getDict(lang).mag;
  return (
    <>
      <PageHead eyebrow={m.title} title={m.heading} lead={m.lead} />
      <MagView />
      <Cta />
    </>
  );
}
