'use client';
import { Reveal, Words, spot } from './motion';
import { Pattern, Toranj } from './Ornaments';
import { useLoaded } from './Loader';

export default function PageHead({ eyebrow, title, lead }) {
  const loaded = useLoaded();
  return (
    <header className="page-head" {...spot}>
      <Pattern name="herati" className="hero__pat" />
      <Pattern name="herati" className="hero__pat hero__pat--spot" />
      <Toranj className="page-head__sun" />
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
        <h1 className="page-head__title">
          <Words text={title} animate={loaded} delay={0.1} />
        </h1>
        <Reveal as="p" className="sec-lead" delay={0.2}>
          {lead}
        </Reveal>
      </div>
    </header>
  );
}
