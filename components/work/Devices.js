import { shot } from '@/lib/work';

// Desktop shots are 1440×900 per screen; mobile shots are 780×1688 per screen (390px @2x).
const DESK_SCREEN = 900;
const MOBILE_SCREEN = 1688;

// how far (in % of the image height) the screenshot travels to reach the page bottom
const shift = (screen, total) => `-${((1 - screen / total) * 100).toFixed(2)}%`;
const dur = (total, screen) => `${Math.max(8, (total / screen) * 2.4).toFixed(1)}s`;

export function Browser({ p, full = true, className = '', delay = '0s', alt = '' }) {
  return (
    <div className={`dev-browser ${className}`}>
      <div className="dev-browser__bar">
        <span className="dev-browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="dev-browser__url" dir="ltr">
          {p.domain}
        </span>
      </div>
      <div
        className={`dev-screen ${full ? 'dev-screen--scroll' : ''}`}
        style={{ '--shift': shift(DESK_SCREEN, p.shots.desktopH), '--dur': dur(p.shots.desktopH, DESK_SCREEN), '--delay': delay, aspectRatio: '1440 / 900' }}
      >
        <img width="1440" height={full ? p.shots.desktopH : 900} src={shot(p, full ? 'desktop-full' : 'desktop-hero')} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export function Phone({ p, full = true, className = '', delay = '0s', alt = '' }) {
  return (
    <div className={`dev-phone ${className}`}>
      <span className="dev-phone__notch" />
      <div
        className={`dev-screen ${full ? 'dev-screen--scroll' : ''}`}
        style={{ '--shift': shift(MOBILE_SCREEN, p.shots.mobileH), '--dur': dur(p.shots.mobileH, MOBILE_SCREEN), '--delay': delay, aspectRatio: '780 / 1688' }}
      >
        <img width="780" height={full ? p.shots.mobileH : 1688} src={shot(p, full ? 'mobile-full' : 'mobile-hero')} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export function Tablet({ p, className = '', alt = '' }) {
  return (
    <div className={`dev-tablet ${className}`}>
      <div className="dev-screen" style={{ aspectRatio: '834 / 1194' }}>
        <img width="834" height="1194" src={shot(p, 'tablet')} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

// A window onto one region of the full-page shot (no extra images needed).
export function Slice({ p, at, mobile = false, className = '', label = '' }) {
  return (
    <div
      className={`dev-slice ${mobile ? 'dev-slice--m' : ''} ${className}`}
      style={{ backgroundImage: `url(${shot(p, mobile ? 'mobile-full' : 'desktop-full')})`, backgroundPosition: `50% ${at}%` }}
      role="img"
      aria-label={label}
    />
  );
}
