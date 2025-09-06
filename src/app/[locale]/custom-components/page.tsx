import { HeroSimple, HeroCentered } from '@/components/page-builder/components/heroes';
import { FeaturesGrid, FeaturesList } from '@/components/page-builder/components/features';
import { StatsMinimal, StatsBasic } from '@/components/page-builder/components/stats';
import { TestimonialsGrid, TestimonialsSimple } from '@/components/page-builder/components/testimonials';
import { SocialProofAvatars, SocialProofLogos } from '@/components/page-builder/components/social-proof';
import { HeaderAdvanced, FooterAdvanced } from '@/components/page-builder/components';
import { getTranslations } from 'next-intl/server';

interface CustomComponentsPageProps {
  params: {
    locale: string;
  };
}

export default async function CustomComponentsPage({ params: { locale } }: CustomComponentsPageProps) {
  const t = await getTranslations('custom-components');
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdvanced 
        showLanguageSwitcher={true}
        showThemeToggle={true}
      />
      
      <main className="flex-1">
        {/* 页面说明 */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
          </div>
        </section>

        {/* 英雄区域组件展示 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('sections.hero.title')}</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.hero.simple')}</h3>
                <HeroSimple />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.hero.centered')}</h3>
                <HeroCentered />
              </div>
            </div>
          </div>
        </section>

        {/* 功能特性组件展示 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('sections.features.title')}</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.features.grid')}</h3>
                <FeaturesGrid 
                  columns={2}
                  showIcons={false}
                  layout="minimal"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.features.list')}</h3>
                <FeaturesList />
              </div>
            </div>
          </div>
        </section>

        {/* 数据统计组件展示 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('sections.stats.title')}</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.stats.minimal')}</h3>
                <StatsMinimal showIcons={false} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.stats.basic')}</h3>
                <StatsBasic 
                  variant="compact"
                  showBadge={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 用户评价组件展示 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('sections.testimonials.title')}</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.testimonials.simple')}</h3>
                <TestimonialsSimple />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.testimonials.grid')}</h3>
                <TestimonialsGrid 
                  showAvatars={false}
                  showCompany={false}
                  showRating={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 社会证明组件展示 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('sections.socialProof.title')}</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.socialProof.avatars')}</h3>
                <SocialProofAvatars 
                  showRating={false}
                  showUserCount={false}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('sections.socialProof.logos')}</h3>
                <SocialProofLogos />
              </div>
            </div>
          </div>
        </section>

        {/* 自定义说明 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t('customization.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('customization.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('customization.features.rawExport.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('customization.features.rawExport.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('customization.features.fullControl.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('customization.features.fullControl.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('customization.features.flexibleCombination.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('customization.features.flexibleCombination.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('customization.features.developerFriendly.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('customization.features.developerFriendly.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FooterAdvanced showSocialLinks={true} />
    </div>
  );
}