import PageHead from '@/components/PageHead';
import { TransitionLink } from '@/components/Transition';

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="۴۰۴" title="این طاق هنوز ساخته نشده است" lead="صفحه‌ای که به دنبال آن بودید پیدا نشد. ممکن است نشانی اشتباه باشد یا این صفحه هنوز در دست ساخت باشد." />
      <div className="container nf">
        <TransitionLink href="/" className="btn btn--primary">
          <span>بازگشت به صفحه‌ی اصلی</span>
        </TransitionLink>
      </div>
    </>
  );
}
