import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';
import { CategoryCard, LatestProjects } from '@/components/work/Cards';
import { CATEGORIES } from '@/lib/work';
import { getDict } from '@/lib/dict';
import { pageMeta } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const w = getDict(lang).work;
  return pageMeta({ lang, path: '/work', title: w.title, description: w.lead });
}

export default async function WorkPage({ params }) {
  const { lang } = await params;
  const w = getDict(lang).work;
  return (
    <>
      <PageHead eyebrow={w.title} title={w.heading} lead={w.lead} />
      <section className="container work-cats" aria-label={w.catsAria}>
        {CATEGORIES.map((c, i) => (
          <CategoryCard key={c.slug} c={c} i={i} />
        ))}
      </section>
      <section className="container work-latest">
        <header className="sec-head">
          <p className="eyebrow">{w.latestEyebrow}</p>
          <h2 className="sec-title">{w.latestTitle}</h2>
        </header>
        <LatestProjects />
      </section>
      <Cta />
    </>
  );
}
