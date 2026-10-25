// Iranian ornament library — herati, boteh (بته‌جقه), eslimi, khatai and toranj —
// drawn from simple math so it stays crisp. Tile patterns are CSS masks: shape only,
// color comes from CSS so it follows the day/night theme.

export const fa = (v) => String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

// {n/2} star polygon (8 → شمسه). Points start at the top.
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

// Scalloped circle (lobed toranj edge) as an SVG path.
export function lobedPath(cx, cy, R, n, bulge = 1.15) {
  const step = (2 * Math.PI) / n;
  const rr = R * Math.sin(step / 2) * bulge;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = i * step - Math.PI / 2;
    const x = (cx + R * Math.cos(a)).toFixed(2);
    const y = (cy + R * Math.sin(a)).toFixed(2);
    d += i === 0 ? `M${x} ${y}` : ` A${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${x} ${y}`;
  }
  return d + 'Z';
}

// بته‌جقه in a 28×40 box, curled tip at the top-right.
export const BOTEH =
  'M14 40C5.5 40 0 33.5 0 25.5C0 15.5 7.5 9.5 14.5 6.5C18.5 4.8 21.5 2.6 23 0C26.4 3.6 25.6 8.4 21.6 11.4C26.6 15.4 29 21.6 28 28.4C26.9 35.4 21.4 40 14 40Z';
// a petal / almond (used for khatai flowers and herati leaves), pointing up from (0,0)
export const PETAL = 'M0 0C-4 -5 -4 -11 0 -16C4 -11 4 -5 0 0Z';

const svgUrl = (body, w, h = w) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`
  )}")`;

const flower = (cx, cy, s, n = 4, rot = 0) =>
  Array.from({ length: n }, (_, i) => `<path d='${PETAL}' transform='translate(${cx} ${cy}) rotate(${rot + (i * 360) / n}) scale(${s})'/>`).join('');

// هراتی: lozenge lattice, rosette in the middle, four curved leaves around it
const herati = (() => {
  const leaf = 'M0 0C6 -2 12 2 14 9C8 10 2 6 0 0Z';
  const leaves = [0, 90, 180, 270].map((r) => `<path d='${leaf}' transform='translate(36 36) rotate(${r}) translate(5 -21)'/>`).join('');
  return svgUrl(
    `<g fill='none' stroke='#000' stroke-width='1.3'><path d='M36 4L68 36L36 68L4 36Z'/><circle cx='36' cy='36' r='10'/></g>` +
      `<g fill='#000'>${flower(36, 36, 0.5, 8)}<circle cx='36' cy='36' r='2.6'/>${leaves}` +
      [[0, 0], [72, 0], [0, 72], [72, 72]].map(([x, y]) => flower(x, y, 0.42, 4, 45) + `<circle cx='${x}' cy='${y}' r='2'/>`).join('') +
      `</g>`,
    72
  );
})();

// بته‌جقه field: rows of botehs, alternate rows mirrored (like termeh)
const boteh = svgUrl(
  `<g fill='none' stroke='#000' stroke-width='1.3'>` +
    `<path d='${BOTEH}' transform='translate(8 6)'/>` +
    `<path d='${BOTEH}' transform='translate(12 13) scale(.55)'/>` +
    `<path d='${BOTEH}' transform='translate(56 46) scale(-1 1)'/>` +
    `<path d='${BOTEH}' transform='translate(52 53) scale(-.55 .55)'/>` +
    `</g><g fill='#000'><circle cx='22' cy='38' r='1.6'/><circle cx='42' cy='78' r='1.6'/><circle cx='62' cy='22' r='1.4'/><circle cx='2' cy='62' r='1.4'/></g>`,
  64,
  88
);

// اسلیمی: scrolling vine with curls and leaves (for bands and borders)
const eslimi = svgUrl(
  `<g fill='none' stroke='#000' stroke-width='1.6' stroke-linecap='round'>` +
    `<path d='M0 16C12 2 36 2 48 16S84 30 96 16'/>` +
    `<path d='M24 6.5C30 4 34 9 31 12.5C28.5 15 25 12.5 27 10.5'/>` +
    `<path d='M72 25.5C66 28 62 23 65 19.5C67.5 17 71 19.5 69 21.5'/>` +
    `</g><g fill='#000'><path d='M44 13C47 7 53 6 57 8C54 13 49 15 44 13Z'/><path d='M92 19C89 25 83 26 79 24C82 19 87 17 92 19Z'/>` +
    `<circle cx='12' cy='22' r='1.6'/><circle cx='60' cy='26' r='1.6'/></g>`,
  96,
  32
);

// ختایی: small eight-petal flowers on a diagonal grid
const khatai = svgUrl(`<g fill='#000'>${flower(24, 24, 0.55, 8)}<circle cx='24' cy='24' r='2.4'/>${flower(0, 0, 0.35, 4, 45)}${flower(48, 0, 0.35, 4, 45)}${flower(0, 48, 0.35, 4, 45)}${flower(48, 48, 0.35, 4, 45)}</g>`, 48);

export const PATTERNS = {
  herati: { url: herati, size: '72px' },
  boteh: { url: boteh, size: '64px 88px' },
  eslimi: { url: eslimi, size: '96px 32px' },
  khatai: { url: khatai, size: '48px' },
};
