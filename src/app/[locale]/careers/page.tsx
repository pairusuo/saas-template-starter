import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'careers' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CareersPage() {
  const t = await getTranslations('careers.content');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="space-y-8">
            <div>
              <p className="text-lg text-muted-foreground mb-6">{t('intro')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('whyWorkWithUs.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{t('whyWorkWithUs.innovation.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('whyWorkWithUs.innovation.description')}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{t('whyWorkWithUs.growth.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('whyWorkWithUs.growth.description')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{t('whyWorkWithUs.flexibility.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('whyWorkWithUs.flexibility.description')}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{t('whyWorkWithUs.benefits.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('whyWorkWithUs.benefits.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('openPositions.title')}</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('openPositions.seniorFrontend.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('openPositions.seniorFrontend.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Next.js
                    </span>
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    {t('openPositions.seniorFrontend.applyNow')}
                  </button>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t('openPositions.backendEngineer.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('openPositions.backendEngineer.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      AWS
                    </span>
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    {t('openPositions.seniorFrontend.applyNow')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
