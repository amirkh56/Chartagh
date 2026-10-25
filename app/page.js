import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import WorkTeaser from '@/components/sections/WorkTeaser';
import Showcase from '@/components/sections/Showcase';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import Faq from '@/components/sections/Faq';
import Cta from '@/components/sections/Cta';

// What we do and what we've made come first; process and details follow.
export default function Home() {
  return (
    <>
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
