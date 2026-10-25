import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'تماس با ما' };

export default function ContactPage() {
  return (
    <>
      <PageHead eyebrow="تماس با ما" title="بیا رفیق شیم" lead="فرم رو پر کن یا مستقیم بهمون پیام بده. کمتر از یه روز کاری جواب می‌دیم؛ با یه عالمه ایده." />
      <ContactForm />
    </>
  );
}
