import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import WorkTeaser from '@/components/sections/WorkTeaser';
import Showcase from '@/components/sections/Showcase';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import Faq from '@/components/sections/Faq';
import Cta from '@/components/sections/Cta';
import { getDict } from '@/lib/dict';
import { SITE_URL, alternates, ldJson } from '@/lib/i18n';

// What we do and what we have made come first; process and details follow.
export default async function Home({ params }) {
  const { lang } = await params;
  const t = getDict(lang);
  const url = SITE_URL + alternates('/', lang).canonical;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#org`,
        name: t.meta.siteName,
        alternateName: lang === 'fa' ? 'Chartagh' : 'چارطاق',
        url,
        logo: `${SITE_URL}/icon.svg`,
        description: t.meta.description,
        email: 'hello@chartagh.ir',
        areaServed: ['IR', 'Worldwide'],
        knowsLanguage: ['fa', 'en'],
        foundingDate: '2021',
        makesOffer: Object.values(t.services.items).map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.desc } })),
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url, name: t.meta.siteName, inLanguage: lang, publisher: { '@id': `${SITE_URL}/#org` } },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(ld)} />
      <Hero />
      <Marquee />
      <Services />
      <WorkTeaser />
      <Showcase />
      <Stats />
      <Process />
      <Faq />
      <Cta />
    </>
  );
}
