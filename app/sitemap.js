import { CATEGORIES, PROJECTS, projectPath } from '@/lib/work';
import { SITE_URL } from '@/lib/i18n';
import { ARTICLES, magPath } from '@/lib/mag';

export const dynamic = 'force-static';

const PATHS = ['/', '/work', '/about', '/contact', ...CATEGORIES.map((c) => `/work/${c.slug}`), ...PROJECTS.map(projectPath), '/mag', ...ARTICLES.map(magPath)];
const en = (p) => (p === '/' ? '/en' : `/en${p}`);

export default function sitemap() {
  const now = new Date();
  return PATHS.flatMap((p) => {
    const languages = { fa: SITE_URL + p, en: SITE_URL + en(p) };
    const priority = p === '/' ? 1 : p.split('/').length > 3 ? 0.7 : 0.8;
    return [
      { url: SITE_URL + p, lastModified: now, changeFrequency: 'monthly', priority, alternates: { languages } },
      { url: SITE_URL + en(p), lastModified: now, changeFrequency: 'monthly', priority, alternates: { languages } },
    ];
  });
}
