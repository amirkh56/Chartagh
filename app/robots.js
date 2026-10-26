import { SITE_URL } from '@/lib/i18n';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/fa/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
