import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Palette, Zap, Code, Smartphone, Globe, Users, Star, Play, Download, Github } from 'lucide-react';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations('homepage');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* 英雄区域 - 突出拖拽构建器功能 */}
        <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(var(--primary),0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(var(--secondary),0.1)_0%,_transparent_50%)]" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* 徽章 */}
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <Palette className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                asChild
              >
                <a href={`/${locale}/page-builder`}>
                  🎨 {t('hero.pageBuilder')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-medium"
                asChild
              >
                <a href={`/${locale}/basic-components`}>
                  <Play className="mr-2 w-4 h-4" />
                  {t('hero.viewDemo')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-medium"
                asChild
              >
                <a href="https://github.com/your-repo/saas-template-starter" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-4 h-4" />
                  {t('hero.github')}
                </a>
              </Button>
            </div>
            
            {/* 技术栈标签 */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="px-3 py-1">{t('techStack.nextjs')}</Badge>
              <Badge variant="outline" className="px-3 py-1">{t('techStack.react')}</Badge>
              <Badge variant="outline" className="px-3 py-1">{t('techStack.typescript')}</Badge>
              <Badge variant="outline" className="px-3 py-1">{t('techStack.tailwind')}</Badge>
              <Badge variant="outline" className="px-3 py-1">{t('techStack.shadcn')}</Badge>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('features.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 拖拽构建器 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Palette className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.pageBuilder.title')}</CardTitle>
                  <CardDescription>
                    {t('features.pageBuilder.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('features.pageBuilder.dragDrop')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('features.pageBuilder.realTime')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('features.pageBuilder.export')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 组件库 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.componentLibrary.title')}</CardTitle>
                  <CardDescription>
                    {t('features.componentLibrary.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('features.componentLibrary.rich')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('features.componentLibrary.customizable')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('features.componentLibrary.typeSafe')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 响应式设计 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.responsive.title')}</CardTitle>
                  <CardDescription>
                    {t('features.responsive.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('features.responsive.mobile')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('features.responsive.tablet')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('features.responsive.desktop')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 国际化支持 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.i18n.title')}</CardTitle>
                  <CardDescription>
                    {t('features.i18n.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {t('features.i18n.multiLanguage')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {t('features.i18n.autoTranslation')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                      {t('features.i18n.seoOptimized')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 性能优化 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.performance.title')}</CardTitle>
                  <CardDescription>
                    {t('features.performance.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                      {t('features.performance.fast')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                      {t('features.performance.optimized')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                      {t('features.performance.seo')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 社区支持 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('features.community.title')}</CardTitle>
                  <CardDescription>
                    {t('features.community.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2" />
                      {t('features.community.active')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2" />
                      {t('features.community.documentation')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2" />
                      {t('features.community.support')}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 快速开始 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('quickStart.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('quickStart.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('quickStart.step1.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('quickStart.step1.description')}
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('quickStart.step2.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('quickStart.step2.description')}
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('quickStart.step3.title')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('quickStart.step3.description')}
                </p>
              </div>
            </div>
            
            {/* 代码示例 */}
            <div className="mt-12 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t('quickStart.installTitle')}</CardTitle>
                    <Badge variant="outline">Terminal</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-sm bg-muted/50 p-4 rounded-lg">
                    <div className="text-muted-foreground">{t('quickStart.cloneComment')}</div>
                    <div className="text-foreground">git clone https://github.com/your-repo/saas-template-starter.git</div>
                    <div className="text-muted-foreground">{t('quickStart.installComment')}</div>
                    <div className="text-foreground">npm install</div>
                    <div className="text-muted-foreground">{t('quickStart.runComment')}</div>
                    <div className="text-foreground">npm run dev</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 模板展示 */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('templates.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              {t('templates.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* 基础模板 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('templates.basic.title')}</CardTitle>
                  <CardDescription>
                    {t('templates.basic.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('templates.basic.features.zeroConfig')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('templates.basic.features.responsive')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {t('templates.basic.features.quickDeploy')}
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <a href={`/${locale}/basic-components`}>
                      {t('templates.basic.button')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* 高级模板 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('templates.advanced.title')}</CardTitle>
                  <CardDescription>
                    {t('templates.advanced.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('templates.advanced.features.richAnimations')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('templates.advanced.features.advancedComponents')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {t('templates.advanced.features.professionalDesign')}
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <a href={`/${locale}/advanced-components`}>
                      {t('templates.advanced.button')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* 自定义模板 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{t('templates.custom.title')}</CardTitle>
                  <CardDescription>
                    {t('templates.custom.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('templates.custom.features.fullyCustomizable')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('templates.custom.features.rawAccess')}
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {t('templates.custom.features.flexibleCombination')}
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <a href={`/${locale}/custom-components`}>
                      {t('templates.custom.button')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 额外说明 */}
            <div className="mt-12">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">{t('templates.howToChoose.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="font-medium text-green-600 mb-1">{t('templates.howToChoose.basic.title')}</div>
                      <div className="text-muted-foreground">{t('templates.howToChoose.basic.description')}</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <div className="font-medium text-blue-600 mb-1">{t('templates.howToChoose.advanced.title')}</div>
                      <div className="text-muted-foreground">{t('templates.howToChoose.advanced.description')}</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <div className="font-medium text-purple-600 mb-1">{t('templates.howToChoose.custom.title')}</div>
                      <div className="text-muted-foreground">{t('templates.howToChoose.custom.description')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
