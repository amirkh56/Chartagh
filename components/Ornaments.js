import { PATTERNS, starStr, polyStr, lobedPath } from '@/lib/patterns';

// Tiled geometric pattern; color comes from CSS (--pat-color) so it follows day/night.
export function Pattern({ name = 'khatam', size, className = '', style }) {
  const p = PATTERNS[name];
  return (
    <span
      aria-hidden
      className={`pat ${className}`}
      style={{ '--pat-url': p.url, '--pat-size': size || p.size, ...style }}
    />
  );
}

// شمسه — a Safavid sun medallion in minakari colors.
export function Shamseh({ className = '', spin = true }) {
  const dots = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    // fixed precision so server and client render identical markup
    return [(200 + 178 * Math.cos(a)).toFixed(2), (200 + 178 * Math.sin(a)).toFixed(2)];
  });
  return (
    <svg className={`shamseh ${spin ? 'shamseh--spin' : ''} ${className}`} viewBox="0 0 400 400" aria-hidden>
      <g className="shamseh__outer">
        <path d={lobedPath(200, 200, 192, 24)} fill="var(--lajvard)" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill={i % 2 ? 'var(--kahgel)' : 'var(--firuzeh)'} />
        ))}
        <circle cx="200" cy="200" r="166" fill="var(--kahgel)" />
        <path d={lobedPath(200, 200, 156, 16)} fill="var(--firuzeh)" />
      </g>
      <g className="shamseh__inner">
        <polygon points={starStr(200, 200, 140)} fill="var(--brick)" />
        <polygon points={starStr(200, 200, 112, 8, Math.PI / 8)} fill="var(--kahgel)" />
        <polygon points={polyStr(200, 200, 78, 8, Math.PI / 8)} fill="var(--lajvard)" />
        <polygon points={starStr(200, 200, 66)} fill="var(--firuzeh)" />
        <circle cx="200" cy="200" r="26" fill="var(--brick)" />
        <circle cx="200" cy="200" r="9" fill="var(--kahgel)" />
      </g>
      <g fill="none" stroke="var(--dood)" strokeOpacity=".35" strokeWidth="1.2">
        <polygon points={starStr(200, 200, 140)} />
        <circle cx="200" cy="200" r="166" />
      </g>
    </svg>
  );
}

// حاشیه — a thin decorative border band (like the frame of a tile panel).
export function TileBand({ className = '' }) {
  const id = 'band';
  return (
    <svg className={`band ${className}`} aria-hidden preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="36" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 9L9 0L18 9L9 18Z" fill="var(--brick)" />
          <path d="M18 9L27 0L36 9L27 18Z" fill="var(--firuzeh)" />
          <circle cx="18" cy="9" r="2" fill="var(--kahgel)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
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
