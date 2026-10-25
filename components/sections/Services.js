'use client';
import { Reveal, Tilt, Words, spot } from '../motion';
import { Pattern, Arrow, Shamseh } from '../Ornaments';
import Logo from '../Logo';
import { TransitionLink } from '../Transition';
import { starStr } from '@/lib/patterns';

function WebIllo() {
  return (
    <svg viewBox="0 0 260 180" className="illo" aria-hidden>
      <g className="illo__l1">
        <rect x="10" y="14" width="240" height="156" rx="12" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M10 40H250" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="232" cy="27" r="4.5" fill="var(--brick)" />
        <circle cx="218" cy="27" r="4.5" fill="var(--firuzeh)" />
        <circle cx="204" cy="27" r="4.5" fill="var(--sand)" />
      </g>
      <g className="illo__l2">
        <path d="M30 156V100C30 82 46 72 60 58C74 72 90 82 90 100V156Z" fill="var(--firuzeh)" />
        <polygon points={starStr(60, 108, 14)} fill="var(--kahgel)" />
      </g>
      <g className="illo__l3" fill="var(--ink)">
        <rect x="120" y="62" width="110" height="12" rx="6" />
        <rect x="150" y="82" width="80" height="12" rx="6" opacity=".6" />
        <rect x="140" y="110" width="90" height="6" rx="3" opacity=".3" />
        <rect x="160" y="122" width="70" height="6" rx="3" opacity=".3" />
        <rect x="176" y="140" width="54" height="18" rx="9" fill="var(--brick)" />
      </g>
      <path className="illo__l4" d="M120 128l22 8-9 4-4 9z" fill="var(--ink)" stroke="var(--surface)" strokeWidth="2" />
    </svg>
  );
}

function PosterIllo() {
  return (
    <svg viewBox="0 0 260 200" className="illo" aria-hidden>
      <g className="illo__l1" transform="rotate(8 150 100)">
        <rect x="110" y="18" width="110" height="160" rx="6" fill="var(--firuzeh)" />
        <circle cx="165" cy="80" r="30" fill="none" stroke="var(--kahgel)" strokeWidth="3" />
      </g>
      <g className="illo__l2" transform="rotate(-6 110 100)">
        <rect x="46" y="12" width="120" height="172" rx="6" fill="var(--lajvard)" />
        <polygon points={starStr(106, 72, 34)} fill="var(--brick)" />
        <polygon points={starStr(106, 72, 18, 8, Math.PI / 8)} fill="var(--kahgel)" />
        <rect x="66" y="126" width="80" height="10" rx="5" fill="var(--kahgel)" />
        <rect x="80" y="144" width="52" height="7" rx="3.5" fill="var(--kahgel)" opacity=".6" />
      </g>
    </svg>
  );
}

function SeoIllo() {
  const bars = [40, 62, 86, 116];
  return (
    <svg viewBox="0 0 260 180" className="illo" aria-hidden>
      <g className="illo__l1">
        {bars.map((h, i) => (
          <path
            key={i}
            d={`M${34 + i * 46} 170V${170 - h}C${34 + i * 46} ${158 - h} ${46 + i * 46} ${154 - h} ${49 + i * 46} ${146 - h}C${52 + i * 46} ${154 - h} ${64 + i * 46} ${158 - h} ${64 + i * 46} ${170 - h}V170Z`}
            fill={i === 3 ? 'var(--brick)' : 'var(--ink)'}
            opacity={i === 3 ? 1 : 0.25 + i * 0.15}
          />
        ))}
      </g>
      <g className="illo__l3">
        <circle cx="200" cy="52" r="30" fill="var(--surface)" fillOpacity=".5" stroke="var(--ink)" strokeWidth="5" />
        <path d="M178 74L150 102" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
        <polygon points={starStr(200, 52, 12)} fill="var(--firuzeh)" />
      </g>
    </svg>
  );
}

function ThreeIllo() {
  return (
    <div className="illo illo--3d" aria-hidden>
      <svg viewBox="0 0 260 200" className="illo__orbit">
        <ellipse cx="130" cy="112" rx="118" ry="38" fill="none" stroke="var(--ink)" strokeOpacity=".35" strokeDasharray="5 7" />
        <circle cx="20" cy="104" r="7" fill="var(--firuzeh)" />
        <circle cx="236" cy="128" r="5" fill="var(--lajvard)" />
      </svg>
      <Logo className="illo__l2 illo__cube" />
    </div>
  );
}

const SERVICES = [
  {
    id: 'web',
    n: '۰۱',
    title: 'طراحی سایت',
    lead: 'سایتی که هم خوشگله، هم سریعه، هم می‌فروشه.',
    desc: 'از لندینگ یه‌صفحه‌ای تا فروشگاه و وب‌اپ؛ طراحی اختصاصی، انیمیشن‌های نرم و کد تمیز با ری‌اکت و نکست‌جی‌اس.',
    tags: ['UI/UX', 'وب‌اپ', 'فروشگاه', 'لندینگ'],
    pattern: 'khatam',
    Illo: WebIllo,
  },
  {
    id: 'poster',
    n: '۰۲',
    title: 'طراحی پوستر',
    lead: 'پوسترهایی که از اون سر خیابون داد می‌زنن «منو ببین!»',
    desc: 'پوستر تبلیغاتی، کاور شبکه‌های اجتماعی، بنر و اعلان؛ با تایپوگرافی فارسی و نقش‌مایه‌های ایرانی.',
    tags: ['پوستر', 'سوشال', 'تایپوگرافی', 'بنر'],
    pattern: 'arcade',
    Illo: PosterIllo,
  },
  {
    id: '3d',
    n: '۰۳',
    title: 'طراحی سه‌بعدی',
    lead: 'محصولت رو می‌چرخونیم، نور می‌دیم، جون می‌دیم.',
    desc: 'مدل‌سازی محصول، رندر، موشن سه‌بعدی و صحنه‌های تعاملی وب؛ مثل همین چارطاقی که بالای صفحه می‌چرخه.',
    tags: ['مدل‌سازی', 'رندر', 'موشن', 'WebGL'],
    pattern: 'girih',
    Illo: ThreeIllo,
  },
  {
    id: 'seo',
    n: '۰۴',
    title: 'سئو',
    lead: 'کاری می‌کنیم گوگل اسمت رو از بر باشه.',
    desc: 'سئوی فنی، محتوا، سرعت و ساختار؛ یه نقشه‌ی قدم‌به‌قدم تا صفحه‌ی اول، بدون قول‌های الکی.',
    tags: ['سئوی فنی', 'محتوا', 'سرعت سایت', 'لینک‌سازی'],
    pattern: 'lozenge',
    Illo: SeoIllo,
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <header className="sec-head">
          <Reveal as="p" className="eyebrow">
            چهار ستون چارطاق
          </Reveal>
          <h2 className="sec-title">
            <Words text="هر چی برای درخشیدن لازم داری، زیر یه سقف" />
          </h2>
          <Reveal as="p" className="sec-lead" delay={0.15}>
            مثل یه چهل‌تیکه‌ی رنگارنگ؛ هر تیکه یه هنر، ولی همه با یه نخ به هم دوخته شدن: برند تو.
          </Reveal>
        </header>

        <div className="patchwork">
          {SERVICES.map(({ Illo, ...s }, i) => (
            <Reveal key={s.id} className={`patch patch--${s.id}`} delay={i * 0.08}>
              <Tilt className="patch__card" data-cursor="ببین" {...spot}>
                <Pattern name={s.pattern} className="patch__pat" />
                <Pattern name={s.pattern} className="patch__pat patch__pat--spot" />
                <span className="patch__stitch" aria-hidden />
                <div className="patch__top">
                  <span className="patch__n">{s.n}</span>
                  <ul className="patch__tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="patch__art">
                  <Illo />
                </div>
                <div className="patch__body">
                  <h3 className="patch__title">{s.title}</h3>
                  <p className="patch__lead">{s.lead}</p>
                  <p className="patch__desc">{s.desc}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="services__more">
          <Shamseh className="services__mini" />
          <p>نمی‌دونی از کدوم شروع کنی؟ عیبی نداره، با هم پیداش می‌کنیم.</p>
          <TransitionLink href="/contact" className="link-arrow">
            بیا گپ بزنیم <Arrow />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
