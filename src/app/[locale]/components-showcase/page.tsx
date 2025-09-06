import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Settings, Code } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface ComponentsShowcasePageProps {
  params: {
    locale: string;
  };
}

export default async function ComponentsShowcasePage({ params: { locale } }: ComponentsShowcasePageProps) {
  const t = await getTranslations('components-showcase');
  const componentTypes = [
    {
      title: t('componentTypes.basic.title'),
      description: t('componentTypes.basic.description'),
      icon: Zap,
      href: `/${locale}/basic-components`,
      badge: t('componentTypes.basic.badge'),
      features: [
        t('componentTypes.basic.features.zeroConfig'),
        t('componentTypes.basic.features.simpleDesign'),
        t('componentTypes.basic.features.quickDeploy'),
        t('componentTypes.basic.features.easyMaintain')
      ],
      color: 'text-green-600'
    },
    {
      title: t('componentTypes.advanced.title'),
      description: t('componentTypes.advanced.description'),
      icon: Settings,
      href: `/${locale}/advanced-components`,
      badge: t('componentTypes.advanced.badge'),
      features: [
        t('componentTypes.advanced.features.richConfig'),
        t('componentTypes.advanced.features.animations'),
        t('componentTypes.advanced.features.multiLayout'),
        t('componentTypes.advanced.features.fullInteraction')
      ],
      color: 'text-blue-600'
    },
    {
      title: t('componentTypes.custom.title'),
      description: t('componentTypes.custom.description'),
      icon: Code,
      href: `/${locale}/custom-components`,
      badge: t('componentTypes.custom.badge'),
      features: [
        t('componentTypes.custom.features.fullCustom'),
        t('componentTypes.custom.features.rawExport'),
        t('componentTypes.custom.features.flexibleUse'),
        t('componentTypes.custom.features.complexNeeds')
      ],
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* 页面标题 */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                {t('badges.react')}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                {t('badges.typescript')}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                {t('badges.tailwind')}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                {t('badges.responsive')}
              </Badge>
            </div>
          </div>
        </section>

        {/* 组件类型展示 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {componentTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-muted ${type.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline">{type.badge}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{type.title}</CardTitle>
                      <CardDescription className="text-base">
                        {type.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={type.href}>
                        <Button className="w-full group-hover:bg-primary/90 transition-colors">
                          {t('buttons.viewComponents')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* 使用指南 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('guide.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('guide.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('guide.steps.step1.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('guide.steps.step1.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('guide.steps.step2.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('guide.steps.step2.description')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('guide.steps.step3.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('guide.steps.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 区域 */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/basic-components`}>
                <Button size="lg" className="min-w-[200px]">
                  {t('cta.startBasic')}
                </Button>
              </Link>
              <Link href={`/${locale}/advanced-components`}>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  {t('cta.viewAdvanced')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}