import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function BlogPage() {
  const t = useTranslations('blog');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('latestPosts')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48"></div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t('posts.post1.date')}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t('posts.post1.title')}</h3>
                    <p className="text-muted-foreground mb-4">{t('posts.post1.description')}</p>
                    <a href="#" className="text-primary hover:underline">
                      {t('readMore')}
                    </a>
                  </div>
                </article>

                <article className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 h-48"></div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t('posts.post2.date')}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t('posts.post2.title')}</h3>
                    <p className="text-muted-foreground mb-4">{t('posts.post2.description')}</p>
                    <a href="#" className="text-primary hover:underline">
                      {t('readMore')}
                    </a>
                  </div>
                </article>

                <article className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 h-48"></div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t('posts.post3.date')}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{t('posts.post3.title')}</h3>
                    <p className="text-muted-foreground mb-4">{t('posts.post3.description')}</p>
                    <a href="#" className="text-primary hover:underline">
                      {t('readMore')}
                    </a>
                  </div>
                </article>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('categories')}</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {t('categoryLabels.development')}
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {t('categoryLabels.design')}
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {t('categoryLabels.business')}
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {t('categoryLabels.security')}
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                  {t('categoryLabels.performance')}
                </span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('newsletter.title')}</h2>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-muted-foreground mb-4">{t('newsletter.description')}</p>
                <form className="flex space-x-4">
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {t('newsletter.subscribe')}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
