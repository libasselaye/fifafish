import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'es', 'zh'],
  defaultLocale: 'fr',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|favicon.ico|uploads).*)']
};
