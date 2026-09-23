#!/usr/bin/env node
/**
 * Content gate for the single-page showcase (D-015).
 *
 * Zod schemas in site/content.config.ts already validate field shapes during `astro check`.
 * This script covers what a schema can't: public copy must never carry internal names,
 * customer mentions, local paths, email addresses or secret-looking strings, and the
 * data files must exist and hold at least one entry.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const SCAN_DIRS = ['site', 'public'];
const TEXT_FILE = /\.(astro|ts|mjs|js|ya?ml|css|svg|txt|md|json)$|(^|\/)_headers$/;
const DATA_FILES = ['site/data/repos.yaml', 'site/data/works.yaml', 'site/data/learning.yaml'];

const SENSITIVE = [
  { rule: 'internal-term', pattern: /\bOKKI\b|\bAWB\b|飞书|FY2\d|钉钉/g },
  // 「客户成功」 is Will's job title and allowed; any other 客户 mention is not.
  { rule: 'customer-mention', pattern: /客户(?!成功)/g },
  { rule: 'local-path', pattern: /\/Users\/|~\/(Desktop|Documents|Library|code|Developer)\//g },
  { rule: 'mailto-link', pattern: /mailto:/gi },
  {
    rule: 'email-address',
    // Skips retina asset names such as logo@2x.png.
    pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.(?!(png|jpe?g|webp|gif|svg|avif)\b)[A-Za-z]{2,}\b/g,
  },
  {
    rule: 'secret-like',
    pattern: /\b(sk-[A-Za-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,})\b|-----BEGIN [A-Z ]*PRIVATE KEY-----/g,
    redact: true,
  },
];

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else if (TEXT_FILE.test(relative(root, path))) files.push(path);
  }
  return files;
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

const errors = [];
const warnings = [];
const summary = [];

for (const dir of SCAN_DIRS) {
  const abs = join(root, dir);
  if (!existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const text = readFileSync(file, 'utf8');
    for (const { rule, pattern, redact } of SENSITIVE) {
      for (const match of text.matchAll(pattern)) {
        const where = `${relative(root, file)}:${lineOf(text, match.index)}`;
        errors.push(`${where} ${rule}: ${redact ? '[redacted]' : match[0]}`);
      }
    }
  }
}

for (const file of DATA_FILES) {
  const abs = join(root, file);
  if (!existsSync(abs)) {
    errors.push(`${file} is missing`);
    continue;
  }
  const text = readFileSync(abs, 'utf8');
  // Placeholder copy must never ride along to a public build; drafts stay approved: false instead.
  for (const match of text.matchAll(/待补|待填|待写|\bTODO\b|\bTBD\b|\bXXX\b/g)) {
    errors.push(`${file}:${lineOf(text, match.index)} placeholder: ${match[0]}`);
  }
  const entries = text
    .split(/^(?=- id:)/m)
    .filter((chunk) => chunk.startsWith('- id:'));
  if (entries.length === 0) {
    errors.push(`${file} has no entries`);
    continue;
  }
  const approved = entries.filter((entry) => /^\s+approved:\s*true\b/m.test(entry));
  for (const entry of approved) {
    if (/^\s+visibility:\s*private\b/m.test(entry)) {
      const id = entry.match(/^- id:\s*(\S+)/)?.[1];
      warnings.push(`${file} ${id}: approved but the repo is still private, so it stays hidden`);
    }
  }
  summary.push(`${file}: ${entries.length} entries, ${approved.length} approved`);
}

for (const line of summary) console.log(`check-content: ${line}`);
for (const line of warnings) console.warn(`check-content warning: ${line}`);

if (errors.length) {
  console.error(`check-content: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  ${line}`);
  process.exit(1);
}

console.log('check-content: ok');
