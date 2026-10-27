import NotFoundBody from '@/components/NotFoundBody';
import { getDict } from '@/lib/dict';

// Static 404 page: Apache serves /fa/missing.html or /en/missing.html for unknown addresses.
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDict(lang).notFound.title, robots: { index: false, follow: true } };
}

export default function Missing() {
  return <NotFoundBody />;
}
