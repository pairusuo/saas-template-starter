import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'examples' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ExamplesPage() {
  const t = await getTranslations('examples.content');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('liveExamples.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32"></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{t('liveExamples.dashboard.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('liveExamples.dashboard.description')}
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">
                      {t('liveExamples.dashboard.viewDemo')}
                    </a>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 h-32"></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{t('liveExamples.authFlow.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('liveExamples.authFlow.description')}
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">
                      {t('liveExamples.authFlow.viewDemo')}
                    </a>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 h-32"></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{t('liveExamples.billing.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('liveExamples.billing.description')}
                    </p>
                    <a href="#" className="text-primary hover:underline text-sm">
                      {t('liveExamples.billing.viewDemo')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">{t('codeExamples.title')}</h2>
              <div className="space-y-6">
                <div className="border rounded-lg">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h3 className="font-semibold">{t('codeExamples.apiRoute.title')}</h3>
                  </div>
                  <div className="p-4">
                    <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                      <code className="text-foreground">{`import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json({ user: session.user });
}`}</code>
                    </pre>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <div className="bg-muted px-4 py-2 border-b">
                    <h3 className="font-semibold">{t('codeExamples.databaseQuery.title')}</h3>
                  </div>
                  <div className="p-4">
                    <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                      <code className="text-foreground">{`import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getUser(id: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
    
  return user[0];
}`}</code>
                    </pre>
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
