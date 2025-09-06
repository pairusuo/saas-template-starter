import { HeroSimple } from '@/components/page-builder/components/heroes/HeroSimple';
import { FeaturesGrid } from '@/components/page-builder/components/features/FeaturesGrid';
import { StatsMinimal } from '@/components/page-builder/components/stats/StatsMinimal';
import { TestimonialsSimple } from '@/components/page-builder/components/testimonials/TestimonialsSimple';
import { SocialProofAvatars } from '@/components/page-builder/components/social-proof/SocialProofAvatars';
import { HeaderAdvanced } from '@/components/page-builder/components/headers/HeaderAdvanced';
import { FooterAdvanced } from '@/components/page-builder/components/footers/FooterAdvanced';
import { getTranslations } from 'next-intl/server';

interface BasicComponentsPageProps {
  params: {
    locale: string;
  };
}

export default async function BasicComponentsPage({ params: { locale } }: BasicComponentsPageProps) {
  const t = await getTranslations('basic-components');
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdvanced 
        showLanguageSwitcher={true}
        showThemeToggle={true}
      />
      
      <main className="flex-1">
        {/* 基础英雄区域 */}
        <HeroSimple />
        
        {/* 基础社会证明 */}
        <SocialProofAvatars 
          showRating={true}
          showUserCount={true}
        />
        
        {/* 基础功能特性 */}
        <FeaturesGrid 
          columns={3}
          showIcons={true}
          layout="card"
        />
        
        {/* 基础数据统计 */}
        <StatsMinimal showIcons={true} />
        
        {/* 基础用户评价 */}
        <TestimonialsSimple />
        
        {/* 页面说明 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.simpleDesign.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.simpleDesign.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.minimalConfig.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.minimalConfig.description')}
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="font-semibold mb-2">{t('features.quickDeploy.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.quickDeploy.description')}
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