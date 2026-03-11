#!/usr/bin/env node
/**
 * Guard against @astrojs/sitemap crash when _routes is undefined (e.g. with Starlight static build).
 * Replaces _routes.reduce with (_routes ?? []).reduce in the sitemap dist file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const nm = path.join(root, 'node_modules');

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let code = fs.readFileSync(filePath, 'utf8');
  const target = 'const routeUrls = _routes.reduce(';
  const replacement = 'const routeUrls = (_routes ?? []).reduce(';
  if (code.includes(target) && !code.includes(replacement)) {
    fs.writeFileSync(filePath, code.replace(target, replacement));
    return true;
  }
  return false;
}

// Try direct path (npm / flat node_modules)
if (patchFile(path.join(nm, '@astrojs', 'sitemap', 'dist', 'index.js'))) process.exit(0);

// Try pnpm: node_modules/.pnpm/@astrojs+sitemap@*
const pnpmDir = path.join(nm, '.pnpm');
if (fs.existsSync(pnpmDir)) {
  const dirs = fs.readdirSync(pnpmDir);
  for (const d of dirs) {
    if (d.startsWith('@astrojs+sitemap@')) {
      const candidate = path.join(pnpmDir, d, 'node_modules', '@astrojs', 'sitemap', 'dist', 'index.js');
      if (patchFile(candidate)) process.exit(0);
    }
  }
}

process.exit(0);
