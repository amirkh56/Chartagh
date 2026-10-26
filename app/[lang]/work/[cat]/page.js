import { notFound } from 'next/navigation';
import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';
import CategoryView from '@/components/work/CategoryView';
import { CATEGORIES, catOf } from '@/lib/work';
import { getDict } from '@/lib/dict';
import { pageMeta } from '@/lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ cat: c.slug }));

export async function generateMetadata({ params }) {
  const { lang, cat } = await params;
  const c = catOf(cat);
  if (!c) return {};
  const w = getDict(lang).work;
  return pageMeta({ lang, path: `/work/${cat}`, title: w.catTitle.replace('{cat}', c[lang].title), description: c[lang].desc });
}

export default async function CategoryPage({ params }) {
  const { lang, cat } = await params;
  const c = catOf(cat);
  if (!c) notFound();
  const w = getDict(lang).work;
  return (
    <>
      <PageHead eyebrow={w.title} title={w.catTitle.replace('{cat}', c[lang].title)} lead={c[lang].desc} />
      <CategoryView slug={c.slug} />
      <Cta />
    </>
  );
}
