// Production builds are a static export (plain files in /out) for cPanel/Apache hosting.
// Apache does what a Node server would: clean Persian URLs, headers, caching, 404 —
// see public/.htaccess. In `next dev` the same clean URLs come from the rewrites below.
const isDev = process.env.NODE_ENV !== 'production';

// Persian pages live under /fa internally but are served without the prefix.
const FA_PAGES = ['/about', '/contact', '/work', '/work/:path*', '/missing', '/opengraph-image'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isDev
    ? {
        async rewrites() {
          return { beforeFiles: [{ source: '/', destination: '/fa' }, ...FA_PAGES.map((source) => ({ source, destination: `/fa${source}` }))] };
        },
      }
    : { output: 'export', images: { unoptimized: true } }),
};

export default nextConfig;
