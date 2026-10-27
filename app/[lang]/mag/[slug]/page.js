import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/mag/Mag';
import Cta from '@/components/sections/Cta';
import { ARTICLES, article, locA, magPath } from '@/lib/mag';
import { SITE_URL, alternates, ldJson, pageMeta } from '@/lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const raw = article(slug);
  if (!raw) return {};
  const a = locA(raw, lang);
  return pageMeta({ lang, path: magPath(a), title: a.title, description: a.excerpt });
}

export default async function ArticlePage({ params }) {
  const { lang, slug } = await params;
  const raw = article(slug);
  if (!raw) notFound();
  const a = locA(raw, lang);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    inLanguage: lang,
    url: SITE_URL + alternates(magPath(a), lang).canonical,
    author: { '@id': `${SITE_URL}/#org` },
    publisher: { '@id': `${SITE_URL}/#org` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(ld)} />
      <ArticleView slug={slug} />
      <Cta />
    </>
  );
}
