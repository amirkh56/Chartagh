import PageHead from '@/components/PageHead';
import { TransitionLink } from '@/components/Transition';

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="۴۰۴" title="این طاق هنوز ساخته نشده!" lead="صفحه‌ای که دنبالش بودی اینجا نیست رفیق. شاید آدرس اشتباه بوده، شاید هم هنوز داریم آجرش رو می‌چینیم." />
      <div className="container nf">
        <TransitionLink href="/" className="btn btn--primary">
          <span>برگرد خونه</span>
        </TransitionLink>
      </div>
    </>
  );
}
