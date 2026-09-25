import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deploy targets
 * - GPT Sites (default / production): base `/`
 * - GitHub Pages (fallback): base `/will-in-practice-site/`
 *
 * PUBLIC_SITE_URL is the public origin (no trailing slash).
 * Production origin is the public GPT Sites address (2026-09-25).
 * The old will-in-practice.pages.dev now only redirects there.
 * Override with env when needed (Preview URLs, custom domain later).
 */
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'github';

const SITES_ORIGIN = 'https://will-in-practice.willxiong92.chatgpt.site';
const GITHUB_ORIGIN = 'https://willxiong92.github.io';
const GITHUB_BASE = '/will-in-practice-site';

const explicit = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');

// Origin only. GitHub Pages project sites keep path in `base`, not in `site`.
const site = explicit || (isGitHubPages ? GITHUB_ORIGIN : SITES_ORIGIN);
const base = isGitHubPages ? `${GITHUB_BASE}/` : '/';
const homePath = base.replace(/\/$/, '');
// Under a sub-path base with trailingSlash 'never', the sitemap sees the homepage twice
// (with and without the trailing slash); remember what was kept so it is listed once.
const sitemapSeen = new Set();

export default defineConfig({
  srcDir: './site',
  publicDir: './public',
  output: 'static',
  site,
  base,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Single-page site: only the homepage belongs in the sitemap (404 and retired routes stay out).
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        if (path !== homePath || sitemapSeen.has(path)) return false;
        sitemapSeen.add(path);
        return true;
      },
    }),
  ],
});
