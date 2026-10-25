import { PATTERNS, starStr, lobedPath, BOTEH, PETAL } from '@/lib/patterns';

// Tiled ornament; color comes from CSS (--pat-color) so it follows day/night.
export function Pattern({ name = 'herati', size, className = '', style }) {
  const p = PATTERNS[name];
  return <span aria-hidden className={`pat ${className}`} style={{ '--pat-url': p.url, '--pat-size': size || p.size, ...style }} />;
}

const ring = (n, r, fn) =>
  Array.from({ length: n }, (_, i) => {
    const deg = (i * 360) / n;
    const a = ((deg - 90) * Math.PI) / 180;
    // fixed precision so server and client render identical markup
    return fn(i, deg, (200 + r * Math.cos(a)).toFixed(2), (200 + r * Math.sin(a)).toFixed(2));
  });

// ترنج — the medallion at the heart of a Persian carpet: lobed edge, a ring of botehs, a khatai flower.
export function Toranj({ className = '', spin = true }) {
  return (
    <svg className={`toranj ${spin ? 'toranj--spin' : ''} ${className}`} viewBox="0 0 400 400" aria-hidden>
      <g className="toranj__outer">
        <path d={lobedPath(200, 200, 192, 20)} fill="var(--brick-dark)" />
        <circle cx="200" cy="200" r="174" fill="var(--sand)" />
        {ring(16, 0, (i, deg) => (
          <path key={i} d={BOTEH} transform={`rotate(${deg} 200 200) translate(186 36)`} fill={i % 2 ? 'var(--terracotta)' : 'var(--brick)'} />
        ))}
        {ring(16, 164, (i, deg, x, y) => (
          <circle key={`d${i}`} cx={x} cy={y} r="3.5" fill="var(--brick-dark)" />
        ))}
      </g>
      <g className="toranj__inner">
        <path d={lobedPath(200, 200, 116, 12)} fill="var(--kahgel)" />
        {ring(8, 0, (i, deg) => (
          <path key={i} d={PETAL} transform={`translate(200 200) rotate(${deg}) scale(5.4)`} fill="var(--brick)" />
        ))}
        {ring(8, 0, (i, deg) => (
          <path key={`s${i}`} d={PETAL} transform={`translate(200 200) rotate(${deg + 22.5}) scale(3.6)`} fill="var(--terracotta)" />
        ))}
        <circle cx="200" cy="200" r="24" fill="var(--sand)" />
        <circle cx="200" cy="200" r="9" fill="var(--firuzeh)" />
      </g>
      <g fill="none" stroke="var(--dood)" strokeOpacity=".28" strokeWidth="1.2">
        <circle cx="200" cy="200" r="174" />
        <path d={lobedPath(200, 200, 116, 12)} />
      </g>
    </svg>
  );
}

// حاشیه‌ی فرش: a carpet border band — stripes, a running eslimi vine and boteh-flower rhythm.
export function TileBand({ className = '' }) {
  return (
    <div className={`band ${className}`} aria-hidden>
      <i className="band__stripe" />
      <Pattern name="eslimi" className="band__vine" />
      <i className="band__stripe" />
    </div>
  );
}

export function StarIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden>
      <polygon points={starStr(0, 0, 48)} fill="currentColor" />
    </svg>
  );
}

export function Arrow({ className = '' }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 24 24" aria-hidden>
      <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Animated line icons. Each part that moves carries an `ic-*` class (keyframes live in globals.css).
const ICONS = {
  web: (
    <>
      <rect x="4" y="8" width="40" height="32" rx="4" />
      <path d="M4 15h40" />
      <circle cx="9" cy="11.5" r=".8" fill="currentColor" />
      <circle cx="12.5" cy="11.5" r=".8" fill="currentColor" />
      <path d="M11 36V27c0-3 2.5-4.5 4.5-7 2 2.5 4.5 4 4.5 7v9" />
      <path className="ic-draw" d="M25 22h13M25 27h9M25 32h11" />
      <path className="ic-cursor" d="M33 30l7 2.6-3 1.2-1.3 3z" fill="currentColor" />
    </>
  ),
  poster: (
    <g className="ic-swing">
      <path d="M24 3v5" />
      <rect x="10" y="8" width="28" height="36" rx="2" />
      <circle cx="24" cy="21" r="7" />
      <path className="ic-spin" d="M24 15.5v11M18.5 21h11M20 17l8 8M28 17l-8 8" strokeWidth="1.2" />
      <path d="M16 33h16M19 38h10" />
    </g>
  ),
  seo: (
    <>
      <path className="ic-bar" style={{ '--d': '0s' }} d="M8 42V32" />
      <path className="ic-bar" style={{ '--d': '.15s' }} d="M15 42V27" />
      <path className="ic-bar" style={{ '--d': '.3s' }} d="M22 42V21" />
      <circle cx="31" cy="15" r="9" />
      <path d="M37.5 21.5L44 28" strokeWidth="3" />
      <path className="ic-draw" d="M27 16l3 3 5-6" />
    </>
  ),
  megaphone: (
    <>
      <path d="M6 20v8h6l14 9V11L12 20z" />
      <path d="M12 28l3 9h5l-2-7" />
      <path className="ic-wave" style={{ '--d': '0s' }} d="M32 18c2 3 2 9 0 12" />
      <path className="ic-wave" style={{ '--d': '.25s' }} d="M37 14c4 5 4 15 0 20" />
      <path className="ic-wave" style={{ '--d': '.5s' }} d="M42 10c5 7 5 21 0 28" />
    </>
  ),
  pen: (
    <>
      <path className="ic-draw" d="M4 42c6-2 10-8 16-6s8 4 12 2" />
      <g className="ic-nib">
        <path d="M30 6l12 12-14 14-8 2 2-8z" />
        <path d="M22 26l6 6M34 10l4 4" />
      </g>
    </>
  ),
  tea: (
    <>
      <path className="ic-steam" style={{ '--d': '0s' }} d="M19 10c-2-2 2-4 0-6" />
      <path className="ic-steam" style={{ '--d': '.4s' }} d="M25 10c-2-2 2-4 0-6" />
      <path d="M14 14h20c0 6-4 8-4 13s4 7 4 13H14c0-6 4-8 4-13s-4-7-4-13z" />
      <path d="M17 33h14" />
      <path d="M9 44h30" />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="24" r="19" />
      <g className="ic-spin-slow">
        <path d="M24 9l4 15-4 15-4-15z" />
        <path d="M24 9l4 15h-8z" fill="currentColor" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill="currentColor" />
    </>
  ),
  bricks: (
    <>
      <rect className="ic-drop" style={{ '--d': '.3s' }} x="14" y="8" width="20" height="9" rx="1" />
      <rect className="ic-drop" style={{ '--d': '.15s' }} x="4" y="20" width="19" height="9" rx="1" />
      <rect className="ic-drop" style={{ '--d': '.15s' }} x="25" y="20" width="19" height="9" rx="1" />
      <rect x="4" y="32" width="40" height="9" rx="1" />
      <path d="M24 32v9M14 32v9M34 32v9" />
    </>
  ),
  burst: (
    <>
      <polygon className="ic-pulse" points={starStr(24, 24, 11)} />
      <path className="ic-ray" d="M24 3v5M24 40v5M3 24h5M40 24h5M9 9l3.5 3.5M35.5 35.5L39 39M39 9l-3.5 3.5M12.5 35.5L9 39" />
    </>
  ),
  boteh: (
    <g className="ic-swing">
      <path d={BOTEH} transform="translate(10 4) scale(1)" />
      <path d={BOTEH} transform="translate(17 17) scale(.5)" />
    </g>
  ),
  lantern: (
    <>
      <path d="M24 3v5M18 8h12M17 12h14l-2 4H19z" />
      <path d="M19 16c-4 4-4 18 0 22h10c4-4 4-18 0-22z" />
      <path className="ic-glow" d="M24 21c-2 3-2 7 0 10 2-3 2-7 0-10z" fill="currentColor" />
      <path d="M20 38h8l-1 4h-6z" />
    </>
  ),
};

export function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}
