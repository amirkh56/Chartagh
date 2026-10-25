import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'تماس با ما' };

export default function ContactPage() {
  return (
    <>
      <PageHead eyebrow="تماس با ما" title="گفت‌وگو را شروع کنیم" lead="فرم زیر را پر کنید یا مستقیم برای ما پیام بفرستید. در کمتر از یک روز کاری پاسخ می‌دهیم." />
      <ContactForm />
    </>
  );
}
