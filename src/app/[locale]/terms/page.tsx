import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function TermsPage() {
  const t = await getTranslations('terms.content');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <div className="text-muted-foreground space-y-2">
              <p>
                {t('lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
              <p>{t('effectiveDate')}</p>
            </div>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.acceptance.title')}</h2>
              <p>{t('sections.acceptance.content')}</p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.description.title')}</h2>
              <p>{t('sections.description.content')}</p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.userAccounts.title')}</h2>
              <p className="mb-4">{t('sections.userAccounts.intro')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>{t(`sections.userAccounts.requirements.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Acceptable Use Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.acceptableUse.title')}</h2>
              <p className="mb-4">{t('sections.acceptableUse.intro')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <li key={i}>{t(`sections.acceptableUse.prohibited.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Subscription and Billing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('sections.subscriptionBilling.title')}
              </h2>
              <p className="mb-4">{t('sections.subscriptionBilling.intro')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <li key={i}>{t(`sections.subscriptionBilling.terms.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Intellectual Property Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('sections.intellectualProperty.title')}
              </h2>
              <p>{t('sections.intellectualProperty.content')}</p>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.userContent.title')}</h2>
              <p className="mb-2">{t('sections.userContent.intro')}</p>
              <p className="mb-2">{t('sections.userContent.license')}</p>
              <p>{t('sections.userContent.responsibility')}</p>
            </section>

            {/* Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.privacy.title')}</h2>
              <p>{t('sections.privacy.content')}</p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.termination.title')}</h2>
              <p className="mb-4">{t('sections.termination.intro')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <li key={i}>{t(`sections.termination.grounds.${i}`)}</li>
                ))}
              </ul>
              <p>{t('sections.termination.effect')}</p>
            </section>

            {/* Disclaimers and Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.disclaimers.title')}</h2>
              <p className="mb-4">{t('sections.disclaimers.disclaimer')}</p>
              <p>{t('sections.disclaimers.limitation')}</p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.indemnification.title')}</h2>
              <p>{t('sections.indemnification.content')}</p>
            </section>

            {/* Modifications to Terms */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.modifications.title')}</h2>
              <p>{t('sections.modifications.content')}</p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.governingLaw.title')}</h2>
              <p>{t('sections.governingLaw.content')}</p>
            </section>

            {/* Contact Information */}
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
