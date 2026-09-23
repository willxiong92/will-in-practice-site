#!/usr/bin/env node
/**
 * Post-build gate: the published dist must be the single-page showcase only (D-015).
 * Retired article and team routes must be gone, nothing sensitive may leak into any
 * shipped file, drafts must not render, and the sitemap must list only the homepage.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = join(process.cwd(), 'dist');
if (!existsSync(dist)) {
  console.error('check-dist: dist/ not found, run astro build first');
  process.exit(1);
}

const RETIRED_ROUTES = [
  'about', 'library', 'search', 'practice', 'ai', 'fde', 'trade-ops', 'global-platform', 'indie-site',
  'team', 'admin', 'access',
];
const RETIRED_FILES = ['_worker.js', 'access.js', 'admin-access.js', 'protected-session.js', 'images/hero-workbench.png'];
const SHIPPED_TEXT = /\.(html|js|xml|txt|svg|json|css)$/;

const LEAKS = [
  { rule: 'local-path', pattern: /\/Users\// },
  { rule: 'mailto-link', pattern: /mailto:/i },
  { rule: 'retired-email-domain', pattern: /willinpractice\.com/i },
  { rule: 'email-address', pattern: /[A-Za-z0-9._%+-]+@(gmail|qq|163|126|outlook|hotmail|icloud|yahoo|foxmail|privaterelay\.appleid)\.com/i },
  { rule: 'internal-term', pattern: /\bOKKI\b|\bAWB\b|飞书|FY2\d|钉钉/ },
  { rule: 'customer-mention', pattern: /客户(?!成功)/ },
  { rule: 'draft-marker', pattern: /data-preview/ },
];

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

const errors = [];

for (const route of RETIRED_ROUTES) {
  for (const candidate of [route, `${route}.html`]) {
    if (existsSync(join(dist, candidate))) errors.push(`retired route still built: ${candidate}`);
  }
}
for (const file of RETIRED_FILES) {
  if (existsSync(join(dist, file))) errors.push(`retired asset still shipped: ${file}`);
}

for (const file of walk(dist).filter((path) => SHIPPED_TEXT.test(path))) {
  const text = readFileSync(file, 'utf8');
  for (const { rule, pattern } of LEAKS) {
    const match = text.match(pattern);
    if (match) errors.push(`${relative(dist, file)} ${rule}: ${match[0]}`);
  }
}

const sitemaps = readdirSync(dist).filter((name) => /^sitemap-\d+\.xml$/.test(name));
if (sitemaps.length === 0) {
  errors.push('sitemap-0.xml missing');
} else {
  const locs = sitemaps.reduce(
    (total, name) => total + (readFileSync(join(dist, name), 'utf8').match(/<loc>/g) ?? []).length,
    0,
  );
  if (locs !== 1) errors.push(`sitemap must list only the homepage, found ${locs} <loc> entries`);
}

const indexPath = join(dist, 'index.html');
if (!existsSync(indexPath)) {
  errors.push('index.html missing');
} else {
  const html = readFileSync(indexPath, 'utf8');
  // The repo panel was merged into 作品集 (D-018); a repo card in the output means stale markup shipped.
  if (html.includes('data-card="repo"')) errors.push('index.html still renders a repo card');
  const workCards = (html.match(/data-card="work"/g) ?? []).length;
  const learningCards = (html.match(/data-card="learning"/g) ?? []).length;
  console.log(
    `check-dist: homepage renders ${learningCards} learning card(s) and ${workCards} work card(s)`,
  );
  if (learningCards + workCards === 0) {
    console.log('check-dist: nothing is approved yet, only the about panel is public');
  }
}
if (!existsSync(join(dist, '404.html'))) errors.push('404.html missing');

if (errors.length) {
  console.error(`check-dist: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  ${line}`);
  process.exit(1);
}

console.log('check-dist: ok');
