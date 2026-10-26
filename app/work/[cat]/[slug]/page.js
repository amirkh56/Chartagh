import { notFound } from 'next/navigation';
import CaseStudy from '@/components/work/CaseStudy';
import Cta from '@/components/sections/Cta';
import { PROJECTS } from '@/lib/work';

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ cat: p.cat, slug: p.slug }));

const find = async (params) => {
  const { cat, slug } = await params;
  return PROJECTS.find((p) => p.cat === cat && p.slug === slug);
};

export async function generateMetadata({ params }) {
  const p = await find(params);
  return p ? { title: `${p.name} | نمونه‌کار`, description: p.summary } : {};
}

export default async function ProjectPage({ params }) {
  const p = await find(params);
  if (!p) notFound();
  return (
    <>
      <CaseStudy p={p} />
      <Cta />
    </>
  );
}
