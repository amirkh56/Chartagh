import { notFound } from 'next/navigation';
import CaseStudy from '@/components/work/CaseStudy';
import Cta from '@/components/sections/Cta';
import { PROJECTS, catOf, loc, projectPath, shot } from '@/lib/work';
import { getDict } from '@/lib/dict';
import { SITE_URL, alternates, ldJson, pageMeta } from '@/lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ cat: p.cat, slug: p.slug }));

const find = async (params) => {
  const { lang, cat, slug } = await params;
  const raw = PROJECTS.find((x) => x.cat === cat && x.slug === slug);
  return { lang, raw, p: raw && loc(raw, lang) };
};

export async function generateMetadata({ params }) {
  const { lang, p } = await find(params);
  if (!p) return {};
  return pageMeta({ lang, path: projectPath(p), title: p.name, description: p.summary, image: { url: shot(p, 'desktop-hero'), width: 1440, height: 900, alt: p.name } });
}

export default async function ProjectPage({ params }) {
  const { lang, raw, p } = await find(params);
  if (!p) notFound();
  const t = getDict(lang);
  const abs = (path) => SITE_URL + alternates(path, lang).canonical;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: p.name,
        description: p.summary,
        url: abs(projectPath(p)),
        image: SITE_URL + shot(p, 'desktop-hero'),
        inLanguage: lang,
        genre: catOf(p.cat)[lang].title,
        creator: { '@id': `${SITE_URL}/#org` },
        about: { '@type': 'WebSite', name: p.name, url: p.url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.work.title, item: abs('/work') },
          { '@type': 'ListItem', position: 2, name: catOf(p.cat)[lang].title, item: abs(`/work/${p.cat}`) },
          { '@type': 'ListItem', position: 3, name: p.name, item: abs(projectPath(p)) },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(ld)} />
      <CaseStudy p={raw} />
      <Cta />
    </>
  );
}
