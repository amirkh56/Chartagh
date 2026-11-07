// Profile picture for the Telegram channel and Instagram page: `node scripts/profile-image.mjs`
// Both platforms crop to a circle, so everything important stays inside r=540.
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { LEFT, RIGHT, TOP, CELLS, GAP } from '../lib/logo.js';
import { lobedPath, starStr } from '../lib/patterns.js';

const C = { brick: '#E2492D', mid: '#B5391F', dark: '#7E2414', terracotta: '#C0704C', sand: '#D9C5A0', kahgel: '#F8DDD3', dood: '#24130E' };

const logo = (scale, f) => `<g transform="translate(540 540) scale(${scale}) translate(-100 -100)">
<path d="${LEFT}" fill="${f.left}"/><path d="${RIGHT}" fill="${f.right}"/><path d="${TOP}" fill="${f.top}"/>
${CELLS.map((d) => `<path d="${d}" fill="${f.cell}"/>`).join('')}
<path d="${GAP}" fill="none" stroke="${f.gap}" stroke-width="3" stroke-linejoin="round"/></g>`;

const stars = (n, r, size, fill) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    return `<polygon points="${starStr(540 + r * Math.cos(a), 540 + r * Math.sin(a), size)}" fill="${fill}"/>`;
  }).join('');

const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">${body}</svg>`;
const full = { left: C.mid, right: C.dark, top: C.brick, cell: C.kahgel, gap: C.kahgel };

const variants = {
  profile: wrap(`<rect width="1080" height="1080" fill="${C.dood}"/>${stars(28, 491, 14, C.terracotta)}
${logo(3.35, { left: C.kahgel, right: C.sand, top: C.brick, cell: C.kahgel, gap: C.dood })}`),
  'profile-light': wrap(`<defs><radialGradient id="g" cx="50%" cy="50%" r="72%"><stop offset="0" stop-color="${C.mid}"/><stop offset="1" stop-color="${C.dark}"/></radialGradient></defs>
<rect width="1080" height="1080" fill="url(#g)"/>${stars(28, 491, 17, C.kahgel)}
<circle cx="540" cy="540" r="446" fill="${C.kahgel}"/>${logo(2.95, full)}`),
};

for (const [k, svg] of Object.entries(variants)) {
  writeFileSync(`brand/${k}.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`brand/${k}.png`);
}
