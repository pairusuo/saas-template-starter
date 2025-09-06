import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { requireBuilderAccess } from '@/lib/auth/guard';

export const runtime = 'edge';

interface BuilderComponent {
  id: string;
  type: string;
  props?: Record<string, any>;
}

interface BuilderLayout {
  id?: string;
  name?: string;
  locale?: 'en' | 'zh';
  components: BuilderComponent[];
  settings?: { seo?: { title?: string; description?: string } };
}

function fileNameSafeDate() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
}

function extractTextsFromProps(prefix: string, props: any, out: Record<string, string>) {
  if (!props || typeof props !== 'object') return;
  const join = (a: string, b: string) => (a ? `${a}.${b}` : b);
  for (const [k, v] of Object.entries(props)) {
    const key = join(prefix, k);
    if (typeof v === 'string') {
      out[key] = v;
    } else if (Array.isArray(v)) {
      v.forEach((item, idx) => extractTextsFromProps(join(key, String(idx)), item, out));
    } else if (v && typeof v === 'object') {
      extractTextsFromProps(key, v, out);
    }
  }
}

function generateMessagesByNamespace(layout: BuilderLayout) {
  const byNs: Record<string, Record<string, string>> = {};
  layout.components.forEach((c) => {
    const ns = c.type; // namespace per component type
    byNs[ns] ||= {};
    extractTextsFromProps('', c.props || {}, byNs[ns]);
  });
  if (layout.settings?.seo) {
    byNs['seo'] ||= {};
    if (layout.settings.seo.title) byNs['seo']['title'] = layout.settings.seo.title;
    if (layout.settings.seo.description) byNs['seo']['description'] = layout.settings.seo.description;
  }
  return byNs;
}

function genPackageJson() {
  const deps: Record<string, string> = {
    next: '14.1.4',
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    'next-intl': '^3.26.5',
    'next-themes': '^0.3.0',
    tailwindcss: '^3.4.1',
    postcss: '^8.4.38',
    autoprefixer: '^10.4.19',
  };
  return {
    name: 'landing-export',
    version: '1.0.0',
    private: true,
    scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
    dependencies: deps,
  };
}

const README_MD = `# Landing Page (Exported) | 落地页导出项目\n\nEnglish | 中文\n\n## Quick Start\n- Install: \`npm i\`\n- Dev: \`npm run dev\` (http://localhost:3000)\n- Build/Start: \`npm run build && npm start\`\n\n## Features\n- i18n (en/zh) via next-intl with \`/[locale]/*\`\n- Light/Dark theme via next-themes\n- Tailwind CSS for styles\n\n## Customize\n- Edit texts: \`src/messages/{en,zh}/*.json\`\n- Edit page: \`src/app/[locale]/page.tsx\`\n- Styles: \`src/app/globals.css\`, \`tailwind.config.js\`\n`;

const NEXT_CONFIG = `/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;\n`;

const POSTCSS = `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n`;

const TAILWIND = `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: ['class'],\n  content: ['./src/**/*.{ts,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n`;

const GLOBALS_CSS = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222.2 84% 4.9%;\n}\n\n.dark {\n  --background: 222.2 84% 4.9%;\n  --foreground: 210 40% 98%;\n}\n\nbody {\n  background-color: hsl(var(--background));\n  color: hsl(var(--foreground));\n}\n`;

const I18N_MIDDLEWARE = `import createMiddleware from 'next-intl/middleware';\nexport default createMiddleware({ locales: ['en', 'zh'], defaultLocale: 'en', localePrefix: 'always' });\nexport const config = { matcher: ['/(?!_next|.*\\..*).*'] };\n`;

const THEME_PROVIDER = `"use client";\nimport * as React from 'react';\nimport { ThemeProvider as NextThemeProvider } from 'next-themes';\n\nexport function ThemeProvider({ children }: { children: React.ReactNode }) {\n  return (\n    <NextThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n      {children}\n    </NextThemeProvider>\n  );\n}\n`;

function genLayoutTsx() {
  return `import './globals.css';\nimport { NextIntlClientProvider } from 'next-intl';\nimport { ThemeProvider } from '../../components/theme/ThemeProvider';\nimport enMessages from '../../messages/en';\nimport zhMessages from '../../messages/zh';\n\nexport const metadata = { title: 'Landing', description: 'Exported landing page' };\n\nexport default function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: 'en'|'zh' } }) {\n  const messages = locale === 'zh' ? (zhMessages as any) : (enMessages as any);\n  return (\n    <html lang={locale}>\n      <body>\n        <ThemeProvider>\n          <NextIntlClientProvider locale={locale} messages={messages}>\n            {children}\n          </NextIntlClientProvider>\n        </ThemeProvider>\n      </body>\n    </html>\n  );\n}\n`;
}

function pageTsxFromLayout(layout: BuilderLayout) {
  // Very small set of section renderers without external deps
  const renderers: Record<string, (id: string) => string> = {
    'hero-centered': (id) => `\n      <section key=\"${id}\" className=\"py-20 text-center\">\n        <h1 className=\"text-3xl font-bold\">{t('hero-centered.title') || 'Your product'}</h1>\n        <p className=\"mt-3 text-muted-foreground\">{t('hero-centered.subtitle') || 'Describe your value'}</p>\n      </section>`,
    'features-grid': (id) => `\n      <section key=\"${id}\" className=\"py-16\">\n        <h2 className=\"text-2xl font-semibold text-center\">{t('features-grid.title') || 'Features'}</h2>\n      </section>`,
    'stats-basic': (id) => `\n      <section key=\"${id}\" className=\"py-12 grid grid-cols-2 gap-6\">\n        <div className=\"text-center\"><div className=\"text-3xl font-bold\">99%</div><div className=\"text-sm text-muted-foreground\">{t('stats-basic.label') || 'Uptime'}</div></div>\n        <div className=\"text-center\"><div className=\"text-3xl font-bold\">2x</div><div className=\"text-sm text-muted-foreground\">{t('stats-basic.label2') || 'Faster'}</div></div>\n      </section>`,
    'testimonials-grid': (id) => `\n      <section key=\"${id}\" className=\"py-16\">\n        <h2 className=\"text-2xl font-semibold text-center\">{t('testimonials-grid.title') || 'What users say'}</h2>\n      </section>`,
    'pricing-cards': (id) => `\n      <section key=\"${id}\" className=\"py-16\">\n        <h2 className=\"text-2xl font-semibold text-center\">{t('pricing-cards.title') || 'Pricing'}</h2>\n      </section>`,
    'cta-simple': (id) => `\n      <section key=\"${id}\" className=\"py-12 text-center\">\n        <a href=\"#\" className=\"inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2\">{t('cta-simple.text') || 'Get started'}</a>\n      </section>`,
    'footer-basic': (id) => `\n      <footer key=\"${id}\" className=\"py-10 text-center text-sm text-muted-foreground\">© ${new Date().getFullYear()} Exported</footer>`
  };

  const body = layout.components.map((c) => renderers[c.type]?.(c.id) || '').join('\n');

  return `import { useTranslations } from 'next-intl';\n\nexport default function Page() {\n  const t = useTranslations();\n  return (\n    <main className=\"container mx-auto px-4\">\n      ${body || '<section className="py-20 text-center"><h1 className="text-3xl font-bold">Exported Landing</h1></section>'}\n    </main>\n  );\n}\n`;
}

function genMessagesIndex(nsList: string[], locale: 'en' | 'zh') {
  const imports: string[] = [];
  const spreads: string[] = [];
  for (const ns of nsList) {
    const varName = ns.replace(/[^a-zA-Z0-9_$]/g, '_');
    imports.push(`import ${varName} from './${ns}.json';`);
    spreads.push(`  ${JSON.stringify(ns)}: ${varName},`);
  }
  return `${imports.join('\n')}\n\nconst messages = {\n${spreads.join('\n')}\n};\nexport default messages;\n`;
}

export async function POST(req: NextRequest) {
  // Guard: must be authenticated and entitled
  const guard = await requireBuilderAccess(req);
  if (!guard.ok) return guard.res as NextResponse;

  let layout: BuilderLayout;
  try {
    layout = (await req.json()) as BuilderLayout;
    if (!layout || !Array.isArray(layout.components)) throw new Error('Invalid layout');
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const zip = new JSZip();

  // Base project files
  zip.file('package.json', JSON.stringify(genPackageJson(), null, 2));
  zip.file('README.md', README_MD);
  zip.file('next.config.js', NEXT_CONFIG);
  zip.file('postcss.config.js', POSTCSS);
  zip.file('tailwind.config.js', TAILWIND);
  zip.file('src/app/globals.css', GLOBALS_CSS);
  zip.file('middleware.ts', I18N_MIDDLEWARE);
  zip.file('src/components/theme/ThemeProvider.tsx', THEME_PROVIDER);

  // i18n messages by namespace (extracted from layout only)
  const byNs = generateMessagesByNamespace(layout);
  const nsList = Object.keys(byNs);
  for (const ns of nsList) {
    const obj = byNs[ns];
    zip.file(`src/messages/en/${ns}.json`, JSON.stringify({ ...obj, [ns]: obj }, null, 2));
    zip.file(`src/messages/zh/${ns}.json`, JSON.stringify({ ...obj, [ns]: obj }, null, 2));
  }
  zip.file('src/messages/en/index.ts', genMessagesIndex(nsList, 'en'));
  zip.file('src/messages/zh/index.ts', genMessagesIndex(nsList, 'zh'));

  // App router structure
  zip.file('src/app/[locale]/layout.tsx', genLayoutTsx());
  zip.file('src/app/[locale]/page.tsx', pageTsxFromLayout(layout));

  // Placeholder API to avoid Stripe in exported project
  zip.file('src/app/api/checkout/route.ts', `import { NextResponse } from 'next/server';\nexport async function POST(){return NextResponse.json({ok:false,message:'Payment not enabled in exported project.'},{status:501});}`);
  zip.file('.env.example', 'AUTH_SECRET=\n');

  const buf = await zip.generateAsync({ type: 'uint8array' });
  const fileName = `landing-export-full-${fileNameSafeDate()}.zip`;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(buf);
      controller.close();
    }
  });
  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
