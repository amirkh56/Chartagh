import { ComingFrames } from '@/components/sections/WorkTeaser';
import PageHead from '@/components/PageHead';
import Cta from '@/components/sections/Cta';

export const metadata = { title: 'نمونه‌کارها' };

const CATS = ['همه', 'طراحی سایت', 'طراحی پوستر', 'سئو'];

export default function WorkPage() {
  return (
    <>
      <PageHead eyebrow="نمونه‌کارها" title="ویترین چارطاق در حال آماده‌شدن است" lead="به‌زودی نمونه‌کارهای ما در این صفحه نمایان می‌شوند. در حال چیدن کاشی‌ها هستیم؛ کمی بعد دوباره سر بزنید." />
      <section className="container work-page">
        <ul className="cats" aria-label="دسته‌بندی‌ها (به‌زودی)">
          {CATS.map((c, i) => (
            <li key={c} className={i === 0 ? 'is-on' : ''}>
              {c}
            </li>
          ))}
        </ul>
        <ComingFrames count={6} big />
      </section>
      <Cta />
    </>
  );
}
