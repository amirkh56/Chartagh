import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { LEFT, RIGHT, TOP, CELLS, GAP } from '@/lib/logo';

// Social preview card. Text is Latin on purpose: the OG renderer cannot join Persian letters.
export const alt = 'Chartagh — creative agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAG = {
  fa: 'Creative Agency · Web Design · Posters · SEO',
  en: 'Creative Agency · Web Design · Posters · SEO',
};

export default async function OG({ params }) {
  const { lang } = await params;
  const font = await readFile(join(process.cwd(), 'lib/og/yekan-black.ttf'));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 64, background: '#7E2414', fontFamily: 'Yekan' }}>
        <svg width="300" height="330" viewBox="8 -4 184 208">
          <path d={LEFT} fill="#B5391F" />
          <path d={RIGHT} fill="#5f1a0e" />
          <path d={TOP} fill="#E2492D" />
          {CELLS.map((d) => (
            <path key={d} d={d} fill="#F8DDD3" />
          ))}
          <path d={GAP} fill="none" stroke="#7E2414" strokeWidth="3" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', color: '#F8DDD3' }}>
          <div style={{ fontSize: 120, lineHeight: 1, letterSpacing: -2 }}>CHARTAGH</div>
          <div style={{ fontSize: 34, marginTop: 24, color: '#D9C5A0' }}>{TAG[lang] ?? TAG.en}</div>
          <div style={{ display: 'flex', marginTop: 40, height: 10, width: 520, background: '#E2492D', borderRadius: 6 }} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Yekan', data: font, weight: 900, style: 'normal' }] }
  );
}
