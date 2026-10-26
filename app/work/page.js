import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';
import { CategoryCard, LatestProjects } from '@/components/work/Cards';
import { CATEGORIES } from '@/lib/work';

export const metadata = { title: 'نمونه‌کارها' };

export default function WorkPage() {
  return (
    <>
      <PageHead eyebrow="نمونه‌کارها" title="ویترین چارطاق" lead="هر دسته را باز کنید تا پروژه‌های آن را ببینید؛ از فروشگاه‌های اینترنتی تا پوستر و سئو." />
      <section className="container work-cats" aria-label="دسته‌بندی نمونه‌کارها">
        {CATEGORIES.map((c, i) => (
          <CategoryCard key={c.slug} c={c} i={i} />
        ))}
      </section>
      <section className="container work-latest">
        <header className="sec-head">
          <p className="eyebrow">تازه‌ترین پروژه‌ها</p>
          <h2 className="sec-title">آخرین کاشی‌هایی که چیدیم</h2>
        </header>
        <LatestProjects />
      </section>
      <Cta />
    </>
  );
}
