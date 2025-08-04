import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about.content');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('heading')}
            </h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
              <p>{t('intro1')}</p>
              <p>{t('intro2')}</p>
            </div>
          </div>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('featuresHeading')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{t('features.authentication.title')}</h3>
                <p className="text-muted-foreground">{t('features.authentication.description')}</p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{t('features.ui.title')}</h3>
                <p className="text-muted-foreground">{t('features.ui.description')}</p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  {t('features.internationalization.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('features.internationalization.description')}
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{t('features.dashboard.title')}</h3>
                <p className="text-muted-foreground">{t('features.dashboard.description')}</p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{t('features.responsive.title')}</h3>
                <p className="text-muted-foreground">{t('features.responsive.description')}</p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{t('features.seo.title')}</h3>
                <p className="text-muted-foreground">{t('features.seo.description')}</p>
              </div>
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('techStackHeading')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
                  {t('techStack.frontend.title')}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(
                    ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] as const
                  ).map((tech) => (
                    <li key={tech} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">
                  {t('techStack.backend.title')}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(['NextAuth.js', 'API Routes', 'Middleware', 'JWT Sessions'] as const).map(
                    (tech) => (
                      <li key={tech} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {tech}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-300">
                  {t('techStack.tools.title')}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(['ESLint', 'Prettier', 'Husky', 'lint-staged', 'TypeScript'] as const).map(
                    (tech) => (
                      <li key={tech} className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {tech}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 text-orange-700 dark:text-orange-300">
                  {t('techStack.deployment.title')}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(['Vercel', 'Docker Support', 'Environment Config', 'CI/CD Ready'] as const).map(
                    (tech) => (
                      <li key={tech} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        {tech}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('whyChooseHeading')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t('whyChoose.timeToMarket.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('whyChoose.timeToMarket.description')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">✨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t('whyChoose.bestPractices.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('whyChoose.bestPractices.description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                      📈
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('whyChoose.scalable.title')}</h3>
                    <p className="text-muted-foreground">{t('whyChoose.scalable.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">
                      🤝
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('whyChoose.community.title')}</h3>
                    <p className="text-muted-foreground">{t('whyChoose.community.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('valuesHeading')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">💎</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{t('values.quality.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('values.quality.description')}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg border">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{t('values.performance.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('values.performance.description')}
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg border">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{t('values.security.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('values.security.description')}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-lg border">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{t('values.developer.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('values.developer.description')}</p>
              </div>
            </div>
          </section>

          {/* Get Started Section */}
          <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-12 rounded-2xl border">
            <h2 className="text-3xl font-bold mb-6">{t('getStartedHeading')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('getStartedText')}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <span>📚</span>
                <span>{t('features2.documentation').replace('📚 ', '')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <span>💬</span>
                <span>{t('features2.support').replace('💬 ', '')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <span>🎨</span>
                <span>{t('features2.customizable').replace('🎨 ', '')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <span>🚀</span>
                <span>{t('features2.production').replace('🚀 ', '')}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
