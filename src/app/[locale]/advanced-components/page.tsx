import { HeroCentered } from '@/components/page-builder/components/heroes/HeroCentered';
import { FeaturesList } from '@/components/page-builder/components/features/FeaturesList';
import { StatsBasic } from '@/components/page-builder/components/stats/StatsBasic';
import { TestimonialsGrid } from '@/components/page-builder/components/testimonials/TestimonialsGrid';
import { SocialProofLogos } from '@/components/page-builder/components/social-proof/SocialProofLogos';
import { HeaderAdvanced } from '@/components/page-builder/components/headers/HeaderAdvanced';
import { FooterAdvanced } from '@/components/page-builder/components/footers/FooterAdvanced';
import { getTranslations } from 'next-intl/server';

interface AdvancedComponentsPageProps {
  params: {
    locale: string;
  };
}

export default async function AdvancedComponentsPage({ params: { locale } }: AdvancedComponentsPageProps) {
  const t = await getTranslations('advanced-components');
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdvanced 
        showLanguageSwitcher={true}
        showThemeToggle={true}
      />
      
      <main className="flex-1">
        {/* 高级英雄区域 */}
        <HeroCentered />
        
        {/* 高级社会证明 */}
        <SocialProofLogos />
        
        {/* 高级功能特性 */}
        <FeaturesList />
        
        {/* 高级数据统计 */}
        <StatsBasic 
          variant="detailed"
          showBadge={true}
        />
        
        {/* 高级用户评价 */}
        <TestimonialsGrid 
          showAvatars={true}
          showCompany={true}
          showRating={true}
        />
        
        {/* 页面说明 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.richFeatures.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.richFeatures.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.visualEffects.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.visualEffects.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.flexibleConfig.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.flexibleConfig.description')}
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