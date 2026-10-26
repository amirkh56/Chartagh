import { NextResponse } from 'next/server';

const FILE = /\.[a-z0-9]+$/i;

// Persian is served without a prefix: "/work" is rewritten to "/fa/work" internally.
// "/fa/..." is redirected to the clean URL so each page has exactly one address.
export function proxy(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  if (FILE.test(pathname)) return NextResponse.next(); // images, robots.txt, sitemap.xml, icon.svg…
  if (pathname === '/fa' || pathname.startsWith('/fa/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next();
  url.pathname = `/fa${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|_next/webpack-hmr|_next/data|__nextjs).*)'],
};
