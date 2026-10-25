import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Manifesto from '@/components/sections/Manifesto';
import Services from '@/components/sections/Services';
import Showcase from '@/components/sections/Showcase';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import WorkTeaser from '@/components/sections/WorkTeaser';
import Faq from '@/components/sections/Faq';
import Cta from '@/components/sections/Cta';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Showcase />
      <Stats />
      <Process />
      <WorkTeaser />
      <Faq />
      <Cta />
    </>
  );
}
