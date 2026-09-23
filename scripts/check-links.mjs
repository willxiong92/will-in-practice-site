#!/usr/bin/env node
/**
 * Check internal hrefs in dist HTML resolve to existing files.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'github';
const basePrefix = isGitHubPages ? '/will-in-practice-site' : '';

if (!fs.existsSync(dist)) {
  console.error('dist/ missing');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function resolveTarget(href) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return null;
  }
  let clean = href.split('#')[0].split('?')[0];
  if (!clean) return null;
  if (basePrefix && clean.startsWith(basePrefix)) {
    clean = clean.slice(basePrefix.length) || '/';
  }
  if (!clean.startsWith('/')) return null;
  // map URL path to dist file
  let filePath = path.join(dist, clean.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!path.extname(filePath)) {
    // trailing-slash-never pages are .../name/index.html or name.html
    if (fs.existsSync(filePath + '.html')) return filePath + '.html';
    if (fs.existsSync(path.join(filePath, 'index.html'))) return path.join(filePath, 'index.html');
  }
  return filePath;
}

// src covers card illustrations, so a typo in a data file's image path fails the build.
const hrefRe = /(?:href|src)="([^"]+)"/g;
const errors = [];
const htmlFiles = walk(dist);
let checked = 0;

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = hrefRe.exec(text))) {
    const href = m[1];
    const target = resolveTarget(href);
    if (!target) continue;
    checked += 1;
    if (!fs.existsSync(target)) {
      errors.push(`${path.relative(root, file)} -> ${href}`);
    }
  }
}

console.log(`Link check: ${checked} internal hrefs and srcs across ${htmlFiles.length} pages.`);

if (errors.length) {
  console.error(`\nBroken links (${errors.length}):`);
  for (const e of errors.slice(0, 50)) console.error(`  - ${e}`);
  if (errors.length > 50) console.error(`  ... and ${errors.length - 50} more`);
  process.exit(1);
}

console.log('Link check passed.');
