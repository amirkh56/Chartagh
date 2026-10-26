import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import { getDict } from '@/lib/dict';
import { pageMeta } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = getDict(lang).contact;
  return pageMeta({ lang, path: '/contact', title: c.title, description: c.lead });
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const c = getDict(lang).contact;
  return (
    <>
      <PageHead eyebrow={c.eyebrow} title={c.heading} lead={c.lead} />
      <ContactForm />
    </>
  );
}
