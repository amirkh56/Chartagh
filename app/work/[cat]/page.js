import { notFound } from 'next/navigation';
import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';
import CategoryView from '@/components/work/CategoryView';
import { CATEGORIES, catOf } from '@/lib/work';

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ cat: c.slug }));

export async function generateMetadata({ params }) {
  const c = catOf((await params).cat);
  return { title: c ? `نمونه‌کارهای ${c.title}` : 'نمونه‌کارها' };
}

export default async function CategoryPage({ params }) {
  const c = catOf((await params).cat);
  if (!c) notFound();
  return (
    <>
      <PageHead eyebrow="نمونه‌کارها" title={`نمونه‌کارهای ${c.title}`} lead={c.desc} />
      <CategoryView slug={c.slug} />
      <Cta />
    </>
  );
}
