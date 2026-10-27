// Runs after `next build` (static export).
// Next 16 stores per-segment navigation data as nested files, e.g.
//   contact/__next.$d$lang/contact/__PAGE__.txt
// but the browser requests them by a flat dotted name:
//   contact/__next.$d$lang.contact.__PAGE__.txt
// A Node host maps one to the other; on Apache we simply write the flat copies too.
import { readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
let made = 0;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith('__next.')) {
      for (const file of filesUnder(p)) {
        const flat = `${name}.${relative(p, file).split(sep).join('.')}`;
        copyFileSync(file, join(dir, flat));
        made++;
      }
    } else {
      walk(p);
    }
  }
}

walk(OUT);
console.log(`postbuild: wrote ${made} flat navigation files`);
