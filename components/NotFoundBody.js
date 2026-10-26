'use client';
import PageHead from './PageHead';
import { TransitionLink } from './Transition';
import { useLang } from './Lang';

export default function NotFoundBody() {
  const { t, n } = useLang();
  return (
    <>
      <PageHead eyebrow={n('404')} title={t.notFound.title} lead={t.notFound.lead} />
      <div className="container nf">
        <TransitionLink href="/" className="btn btn--primary">
          <span>{t.notFound.back}</span>
        </TransitionLink>
      </div>
    </>
  );
}
