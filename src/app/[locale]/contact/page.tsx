import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('info.title')}</h2>
                <div className="space-y-3">
                  <p>
                    <strong>{t('info.emailLabel')}:</strong> {t('info.email')}
                  </p>
                  <p>
                    <strong>{t('info.phoneLabel')}:</strong> {t('info.phone')}
                  </p>
                  <p>
                    <strong>{t('info.addressLabel')}:</strong> {t('info.address')}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">{t('responseTime.title')}</h2>
                <div className="space-y-2">
                  <p>{t('responseTime.description')}</p>
                  <p>{t('responseTime.email')}</p>
                  <p>{t('responseTime.phone')}</p>
                </div>
              </div>
            </div>

            <form className="space-y-4 mt-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {t('form.submit')}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
