import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const sitemapPath = `${base}sitemap-index.xml`;
  const sitemap = site ? new URL(sitemapPath, site).href : sitemapPath;
  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
