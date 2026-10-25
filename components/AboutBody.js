'use client';
import { Reveal, Tilt } from './motion';
import { Icon, Pattern } from './Ornaments';
import Logo from './Logo';

const VALUES = [
  { icon: 'boteh', t: 'اصالت', d: 'الهام از هنر ایرانی، با زبانی امروزی.' },
  { icon: 'compass', t: 'دقت', d: 'کاشی به کاشی و بدون شتاب‌زدگی.' },
  { icon: 'tea', t: 'همراهی', d: 'پیش و پس از تحویل، در کنار شما.' },
  { icon: 'lantern', t: 'شفافیت', d: 'زمان و هزینه‌ی روشن از روز نخست.' },
];

export default function AboutBody() {
  return (
    <section className="about container">
      <div className="about__story">
        <Reveal className="about__mark">
          <Pattern name="herati" className="about__mark-pat" />
          <Logo animated className="about__logo" />
        </Reveal>
        <Reveal className="about__text" delay={0.1}>
          <h2>چرا «چارطاق»؟</h2>
          <p>
            چارطاق در معماری ایرانی بنایی است با چهار طاق و یک سقف؛ ساده، استوار و ماندگار. عدد «۴» روی نشان ما نیز به همین چهار طاق اشاره دارد.
          </p>
          <p>ما همین ویژگی‌ها را برای برندها می‌خواهیم: پایه‌ای محکم، ظاهری اصیل و حضوری که در ذهن مخاطب بماند.</p>
        </Reveal>
      </div>

      <div className="values">
        {VALUES.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <Tilt className="value" max={6}>
              <Icon name={v.icon} className="value__icon" />
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
