import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cookies' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CookiesPage() {
  const t = await getTranslations('cookies.content');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground">
              {t('lastUpdated')}: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.whatAreCookies.title')}</h2>
              <p>{t('sections.whatAreCookies.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.howWeUse.title')}</h2>
              <p>{t('sections.howWeUse.intro')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>{t('sections.howWeUse.types.essential.title')}:</strong>{' '}
                  {t('sections.howWeUse.types.essential.description')}
                </li>
                <li>
                  <strong>{t('sections.howWeUse.types.analytics.title')}:</strong>{' '}
                  {t('sections.howWeUse.types.analytics.description')}
                </li>
                <li>
                  <strong>{t('sections.howWeUse.types.preference.title')}:</strong>{' '}
                  {t('sections.howWeUse.types.preference.description')}
                </li>
                <li>
                  <strong>{t('sections.howWeUse.types.marketing.title')}:</strong>{' '}
                  {t('sections.howWeUse.types.marketing.description')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.managing.title')}</h2>
              <p>{t('sections.managing.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.contact.title')}</h2>
              <p>{t('sections.contact.content')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
