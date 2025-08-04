import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'docs' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function DocsPage() {
  const t = await getTranslations('docs.content');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('gettingStarted.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('gettingStarted.quickStart.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('gettingStarted.quickStart.description')}
                  </p>
                  <a href="#" className="text-primary hover:underline">
                    {t('gettingStarted.quickStart.readMore')}
                  </a>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('gettingStarted.configuration.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('gettingStarted.configuration.description')}
                  </p>
                  <a href="#" className="text-primary hover:underline">
                    {t('gettingStarted.configuration.readMore')}
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('coreFeatures.title')}</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('coreFeatures.auth.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('coreFeatures.auth.description')}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('coreFeatures.database.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('coreFeatures.database.description')}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('coreFeatures.payment.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('coreFeatures.payment.description')}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('coreFeatures.i18n.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('coreFeatures.i18n.description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('apiReference.title')}</h2>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {t('apiReference.availableEndpoints')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                      GET
                    </span>
                    <code>/api/auth</code>
                    <span className="text-sm text-muted-foreground">
                      {t('apiReference.endpoints.auth')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                      POST
                    </span>
                    <code>/api/users</code>
                    <span className="text-sm text-muted-foreground">
                      {t('apiReference.endpoints.users')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">
                      GET
                    </span>
                    <code>/api/billing</code>
                    <span className="text-sm text-muted-foreground">
                      {t('apiReference.endpoints.billing')}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
