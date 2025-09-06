#!/usr/bin/env node
/*
 Simple namespace presence check for next-intl.
 - Scans source files for useTranslations('ns') and getTranslations({ namespace: 'ns' })
 - Verifies messages/{locale}/{ns}.json or messages/page-builder/{locale}/{ns}.json exists.
*/
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(process.cwd(), 'src');
const MSG_DIR = path.join(process.cwd(), 'messages');
const LOCALES = ['en', 'zh'];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.next')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (p.endsWith('.ts') || p.endsWith('.tsx')) files.push(p);
  }
  return files;
}

function extractNamespaces(content) {
  const found = new Set();
  const reUse = /useTranslations\(\s*['\"]([\w-]+)['\"]\s*\)/g;
  const reGet = /getTranslations\(\s*\{[^}]*namespace\s*:\s*['\"]([\w-]+)['\"][^}]*\}\s*\)/g;
  let m;
  while ((m = reUse.exec(content))) found.add(m[1]);
  while ((m = reGet.exec(content))) found.add(m[1]);
  return [...found];
}

function hasNamespaceFiles(ns) {
  // alias mapping for page-builder namespaces
  const aliasMap = { 'pb-contact': 'contact' };
  const checkNs = aliasMap[ns] || ns;
  for (const locale of LOCALES) {
    const core = path.join(MSG_DIR, locale, `${checkNs}.json`);
    const pb = path.join(MSG_DIR, 'page-builder', locale, `${checkNs}.json`);
    if (!fs.existsSync(core) && !fs.existsSync(pb)) return false;
  }
  return true;
}

const files = walk(SRC_DIR);
const namespaces = new Set();
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  extractNamespaces(content).forEach((ns) => namespaces.add(ns));
}

const missing = [];
for (const ns of namespaces) {
  if (!hasNamespaceFiles(ns)) missing.push(ns);
}

if (missing.length) {
  console.error(`Missing message files for namespaces (en/zh):`);
  missing.forEach((ns) => console.error(` - ${ns}`));
  process.exitCode = 1;
} else {
  console.log('All referenced namespaces have message files for en/zh.');
}
