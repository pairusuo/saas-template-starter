import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy.content');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('heading')}</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="text-muted-foreground space-y-2">
              <p>
                {t('lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
              <p>{t('effectiveDate')}</p>
            </div>

            {/* Introduction */}
            <section>
              <p>{t('introduction.content')}</p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.infoCollect.title')}</h2>
              <p className="mb-4">{t('sections.infoCollect.intro')}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    {t('sections.infoCollect.subsections.personalInfo.title')}
                  </h3>
                  <p className="mb-2">
                    {t('sections.infoCollect.subsections.personalInfo.content')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {Array.from({ length: 4 }, (_, i) => (
                      <li key={i}>
                        {t(`sections.infoCollect.subsections.personalInfo.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    {t('sections.infoCollect.subsections.usageInfo.title')}
                  </h3>
                  <p className="mb-2">{t('sections.infoCollect.subsections.usageInfo.content')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {Array.from({ length: 4 }, (_, i) => (
                      <li key={i}>{t(`sections.infoCollect.subsections.usageInfo.items.${i}`)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    {t('sections.infoCollect.subsections.thirdPartyInfo.title')}
                  </h3>
                  <p className="mb-2">
                    {t('sections.infoCollect.subsections.thirdPartyInfo.content')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {Array.from({ length: 3 }, (_, i) => (
                      <li key={i}>
                        {t(`sections.infoCollect.subsections.thirdPartyInfo.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.howWeUse.title')}</h2>
              <p className="mb-4">{t('sections.howWeUse.intro')}</p>

              <div className="space-y-4">
                {['serviceProvision', 'communication', 'analytics'].map((category) => (
                  <div key={category}>
                    <h3 className="text-xl font-medium mb-2">
                      {t(`sections.howWeUse.categories.${category}.title`)}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {Array.from({ length: 4 }, (_, i) => (
                        <li key={i}>{t(`sections.howWeUse.categories.${category}.items.${i}`)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Legal Basis for Processing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.legalBasis.title')}</h2>
              <p className="mb-4">{t('sections.legalBasis.intro')}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <li key={i}>{t(`sections.legalBasis.items.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.infoSharing.title')}</h2>
              <p className="mb-4">{t('sections.infoSharing.intro')}</p>

              <div className="space-y-4">
                {['serviceProviders', 'legalRequirements', 'businessTransfer', 'consent'].map(
                  (circumstance) => (
                    <div key={circumstance}>
                      <h3 className="text-xl font-medium mb-2">
                        {t(`sections.infoSharing.circumstances.${circumstance}.title`)}
                      </h3>
                      <p>{t(`sections.infoSharing.circumstances.${circumstance}.content`)}</p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.dataRetention.title')}</h2>
              <p>{t('sections.dataRetention.content')}</p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.dataSecurity.title')}</h2>
              <p className="mb-4">{t('sections.dataSecurity.intro')}</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>{t(`sections.dataSecurity.measures.${i}`)}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                {t('sections.dataSecurity.disclaimer')}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.yourRights.title')}</h2>
              <p className="mb-4">{t('sections.yourRights.intro')}</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                {Array.from({ length: 7 }, (_, i) => (
                  <li key={i}>{t(`sections.yourRights.rights.${i}`)}</li>
                ))}
              </ul>
              <p>{t('sections.yourRights.exercising')}</p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.cookies.title')}</h2>
              <p className="mb-4">{t('sections.cookies.intro')}</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                {['essential', 'analytics', 'functional', 'marketing'].map((type) => (
                  <li key={type}>{t(`sections.cookies.types.${type}`)}</li>
                ))}
              </ul>
              <p>{t('sections.cookies.control')}</p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('sections.thirdPartyServices.title')}
              </h2>
              <p>{t('sections.thirdPartyServices.content')}</p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('sections.internationalTransfers.title')}
              </h2>
              <p>{t('sections.internationalTransfers.content')}</p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.minors.title')}</h2>
              <p>{t('sections.minors.content')}</p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('sections.contactUs.title')}</h2>
              <p className="mb-4">{t('sections.contactUs.intro')}</p>
              <div className="space-y-2">
                <p>{t('sections.contactUs.methods.email')}</p>
                <p>{t('sections.contactUs.methods.address')}</p>
                <p>{t('sections.contactUs.methods.phone')}</p>
              </div>
              <p className="mt-4 text-sm">{t('sections.contactUs.dpo')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
