import { NextRequest, NextResponse } from 'next/server';
import { requireBuilderAccess } from '@/lib/auth/guard';
import { queryOne } from '@/lib/db';
import { decryptText } from '@/lib/util/crypto';
import JSZip from 'jszip';

export const runtime = 'edge';

interface BuilderComponent { id: string; type: string; props?: Record<string, any>; }
interface BuilderLayout { components: BuilderComponent[]; settings?: { seo?: { title?: string; description?: string } } }

function fileNameSafeDate() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function buildProject(layout: BuilderLayout) {
  // Reuse simplified template from export-full to minimize API calls
  const files: Record<string, string | Uint8Array> = {};
  const pkg = {
    name: 'landing-export', version: '1.0.0', private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
    dependencies: {
      next: '14.1.4', react: '^18.2.0', 'react-dom': '^18.2.0', 'next-intl': '^3.26.5', 'next-themes': '^0.3.0',
      tailwindcss: '^3.4.1', postcss: '^8.4.38', autoprefixer: '^10.4.19'
    }
  };
  files['package.json'] = JSON.stringify(pkg, null, 2);
  files['next.config.js'] = `/** @type {import('next').NextConfig} */\nmodule.exports = {};\n`;
  files['postcss.config.js'] = `module.exports={plugins:{tailwindcss:{},autoprefixer:{}}};\n`;
  files['tailwind.config.js'] = `module.exports={darkMode:['class'],content:['./src/**/*.{ts,tsx}'],theme:{extend:{}},plugins:[]};\n`;
  files['src/app/globals.css'] = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
  files['middleware.ts'] = `import createMiddleware from 'next-intl/middleware';\nexport default createMiddleware({locales:['en','zh'],defaultLocale:'en',localePrefix:'always'});\nexport const config={matcher:['/(?!_next|.*\\..*).*']};\n`;
  files['src/components/theme/ThemeProvider.tsx'] = `"use client";import * as React from 'react';import { ThemeProvider as NextThemeProvider } from 'next-themes';export function ThemeProvider({children}:{children:React.ReactNode}){return <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemeProvider>}`;
  files['src/app/[locale]/layout.tsx'] = `import './globals.css';\nimport { NextIntlClientProvider } from 'next-intl';\nimport { ThemeProvider } from '../../components/theme/ThemeProvider';\nimport enMessages from '../../messages/en';\nimport zhMessages from '../../messages/zh';\nexport default function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: 'en'|'zh' } }) {\n  const messages = locale === 'zh' ? (zhMessages as any) : (enMessages as any);\n  return (<html lang={locale}><body><ThemeProvider><NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider></ThemeProvider></body></html>);\n}\n`;
  files['src/app/api/checkout/route.ts'] = `import { NextResponse } from 'next/server';export async function POST(){return NextResponse.json({ok:false,message:'Payment not enabled in exported project.'},{status:501});}`;

  // Generate a minimal page from layout
  const body = (layout.components||[]).map(c=>`<section className=\"py-12\"><div className=\"text-center\">${c.type}</div></section>`).join('');
  files['src/app/[locale]/page.tsx'] = `export default function Page(){return <main className=\"container mx-auto px-4\">${body||'<section className="py-20 text-center"><h1 className="text-3xl font-bold">Exported</h1></section>'}</main>}`;

  // i18n messages (flat per type)
  const ns = new Set<string>();
  (layout.components||[]).forEach(c=>ns.add(c.type));
  for (const n of ns) {
    files[`src/messages/en/${n}.json`] = JSON.stringify({ [n]: {} }, null, 2);
    files[`src/messages/zh/${n}.json`] = JSON.stringify({ [n]: {} }, null, 2);
  }
  const enIndex = Array.from(ns).map(n=>`import ${n.replace(/[^a-zA-Z0-9_$]/g,'_')} from './${n}.json';`).join('\n')+`\n\nconst messages={\n`+Array.from(ns).map(n=>`  '${n}': ${n.replace(/[^a-zA-Z0-9_$]/g,'_')},`).join('\n')+`\n};\nexport default messages;\n`;
  const zhIndex = enIndex;
  files['src/messages/en/index.ts'] = enIndex;
  files['src/messages/zh/index.ts'] = zhIndex;

  files['.env.example'] = 'AUTH_SECRET=\n';

  return files;
}

async function ghJson(token: string, url: string, init: RequestInit = {}) {
  const resp = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });
  return resp;
}

function toBase64(content: string | Uint8Array): string {
  if (typeof content === 'string') {
    // UTF-8 safe base64
    const enc = new TextEncoder().encode(content);
    let bin = '';
    for (let i = 0; i < enc.length; i++) bin += String.fromCharCode(enc[i]);
    return btoa(bin);
  }
  let bin = '';
  for (let i = 0; i < content.length; i++) bin += String.fromCharCode(content[i]);
  return btoa(bin);
}

export async function POST(req: NextRequest) {
  const guard = await requireBuilderAccess(req);
  if (!guard.ok) return guard.res as NextResponse;
  const userId = guard.userId!;

  let body: { name?: string; layout?: BuilderLayout } = {} as any;
  try { body = await req.json(); } catch {}
  const repoName = body.name || `landing-export-${fileNameSafeDate()}`;
  const layout: BuilderLayout = body.layout || { components: [] };

  // Fetch encrypted token from D1
  const acc = await queryOne<{ access_token_enc?: string; provider_account_id?: string }>(
    'SELECT access_token_enc, provider_account_id FROM accounts WHERE user_id = ? AND provider = ? LIMIT 1;',
    [userId, 'github']
  );
  if (!acc?.access_token_enc) {
    return NextResponse.json({ error: 'missing_token', needs_upgrade: true, authorize_url: '/api/auth/github/authorize-repo' }, { status: 403 });
  }
  let token = '';
  try { token = await decryptText(acc.access_token_enc); } catch {
    return NextResponse.json({ error: 'token_decrypt_failed', needs_upgrade: true, authorize_url: '/api/auth/github/authorize-repo' }, { status: 403 });
  }

  // Get owner login
  const meResp = await ghJson(token, 'https://api.github.com/user');
  if (!meResp.ok) {
    return NextResponse.json({ error: 'github_user_fetch_failed' }, { status: 400 });
  }
  const me = await meResp.json();
  const owner = me?.login;
  if (!owner) return NextResponse.json({ error: 'github_user_missing' }, { status: 400 });

  // Create repo
  const createResp = await ghJson(token, 'https://api.github.com/user/repos', {
    method: 'POST',
    body: JSON.stringify({ name: repoName, private: true, auto_init: false, description: 'Exported from Landing Builder' }),
  });
  if (!createResp.ok) {
    const t = await createResp.text();
    return NextResponse.json({ error: 'repo_create_failed', detail: t }, { status: 400 });
  }

  const files = buildProject(layout);
  const entries = Object.entries(files);
  // Create main branch by uploading README first (ensures repo has default branch)
  const firstPath = 'README.md';
  const firstContent = '# Exported Project\n';
  await ghJson(token, `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(firstPath)}`, {
    method: 'PUT',
    body: JSON.stringify({ message: 'chore: init', content: toBase64(firstContent) }),
  });

  // Upload the rest (simple sequential to avoid secondary rate complications)
  for (const [path, content] of entries) {
    if (path === firstPath) continue;
    const resp = await ghJson(token, `https://api.github.com/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}`, {
      method: 'PUT',
      body: JSON.stringify({ message: `feat: add ${path}`, content: toBase64(content) }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      return NextResponse.json({ error: 'file_upload_failed', path, detail: t }, { status: 400 });
    }
  }

  const html_url = `https://github.com/${owner}/${repoName}`;
  return NextResponse.json({ ok: true, repo: `${owner}/${repoName}`, url: html_url });
}

