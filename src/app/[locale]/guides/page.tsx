import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'guides' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GuidesPage() {
  const t = await getTranslations('guides.content');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('gettingStartedGuides.title')}</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {t('gettingStartedGuides.environment.title')}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t('gettingStartedGuides.environment.description')}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.environment.readTime')}
                        </span>
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.environment.level')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {t('gettingStartedGuides.database.title')}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t('gettingStartedGuides.database.description')}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.database.readTime')}
                        </span>
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.database.level')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {t('gettingStartedGuides.auth.title')}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t('gettingStartedGuides.auth.description')}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.auth.readTime')}
                        </span>
                        <span className="text-muted-foreground">
                          {t('gettingStartedGuides.auth.level')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('advancedGuides.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('advancedGuides.security.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('advancedGuides.security.description')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {t('advancedGuides.security.meta')}
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('advancedGuides.analytics.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('advancedGuides.analytics.description')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {t('advancedGuides.analytics.meta')}
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('advancedGuides.deployment.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('advancedGuides.deployment.description')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {t('advancedGuides.deployment.meta')}
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('advancedGuides.components.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('advancedGuides.components.description')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {t('advancedGuides.components.meta')}
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
