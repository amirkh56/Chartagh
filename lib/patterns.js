// Persian geometric ornaments, generated from math so they stay crisp at any size.
// Patterns are used as CSS masks: the SVG only defines shape, color comes from CSS (theme-aware).

export const fa = (v) => String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

// {n/2} star polygon (n=8 → the classic khatam / شمسه star). Points start at the top.
export function starPoints(cx, cy, R, n = 8, rot = 0) {
  const r = (R * Math.cos((2 * Math.PI) / n)) / Math.cos(Math.PI / n);
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = rot + (i * Math.PI) / n - Math.PI / 2;
    const rr = i % 2 ? r : R;
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  return pts;
}

export const starStr = (cx, cy, R, n = 8, rot = 0) =>
  starPoints(cx, cy, R, n, rot)
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

// Regular polygon (octagon etc.)
export const polyStr = (cx, cy, R, n, rot = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / n - Math.PI / 2;
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

// Scalloped circle (lobed medallion edge) as an SVG path.
export function lobedPath(cx, cy, R, n, bulge = 1.15) {
  const step = (2 * Math.PI) / n;
  const chord = 2 * R * Math.sin(step / 2);
  const rr = (chord / 2) * bulge;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = i * step - Math.PI / 2;
    const x = (cx + R * Math.cos(a)).toFixed(2);
    const y = (cy + R * Math.sin(a)).toFixed(2);
    d += i === 0 ? `M${x} ${y}` : ` A${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${x} ${y}`;
  }
  return d + 'Z';
}

const svgUrl = (body, w, h = w) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`
  )}")`;

const khatam = (() => {
  const R = 24;
  const stars = [
    [40, 40],
    [0, 0],
    [80, 0],
    [0, 80],
    [80, 80],
  ]
    .map(([x, y]) => `<polygon points='${starStr(x, y, R)}'/>`)
    .join('');
  return svgUrl(
    `<g fill='none' stroke='#000' stroke-width='1.6'>${stars}<path d='M40 16V0M40 64V80M16 40H0M64 40H80'/><circle cx='40' cy='40' r='6'/></g>`,
    80
  );
})();

const girih = (() => {
  const c = 48;
  return svgUrl(
    `<g fill='none' stroke='#000' stroke-width='1.5'><polygon points='${polyStr(c, c, 40, 8, Math.PI / 8)}'/><polygon points='${starStr(c, c, 30, 8, Math.PI / 8)}'/><polygon points='${starStr(c, c, 14, 8)}'/><path d='M0 0L14 14M96 0L82 14M0 96L14 82M96 96L82 82'/></g>`,
    96
  );
})();

const arcade = svgUrl(
  `<path d='M6 60V32C6 21 17 14 24 5C31 14 42 21 42 32V60' fill='none' stroke='#000' stroke-width='1.6'/><circle cx='24' cy='42' r='2.6'/>`,
  48,
  60
);

const lozenge = svgUrl(
  `<path d='M20 2L38 20L20 38L2 20Z' fill='none' stroke='#000' stroke-width='1.4'/><path d='M20 13L27 20L20 27L13 20Z'/>`,
  40
);

const rosette = (() => {
  const petals = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return `<circle cx='${(28 + 8 * Math.cos(a)).toFixed(2)}' cy='${(28 + 8 * Math.sin(a)).toFixed(2)}' r='4.4'/>`;
  }).join('');
  return svgUrl(`${petals}<circle cx='28' cy='28' r='2.6'/><circle cx='0' cy='0' r='2'/><circle cx='56' cy='0' r='2'/><circle cx='0' cy='56' r='2'/><circle cx='56' cy='56' r='2'/>`, 56);
})();

export const PATTERNS = {
  khatam: { url: khatam, size: '80px' },
  girih: { url: girih, size: '96px' },
  arcade: { url: arcade, size: '48px 60px' },
  lozenge: { url: lozenge, size: '40px' },
  rosette: { url: rosette, size: '56px' },
};
