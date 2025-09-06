import { getTranslations } from 'next-intl/server';
// 使用 header 翻译文件

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // 获取翻译函数
  const tHeader = await getTranslations('header');
  const t = await getTranslations('homepage');

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">

        {/* Header Basic 组件 */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">
                  {t('header.header-basic_1754443045727-s5oy8jzpt.logo')}
                </a>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                
                <a 
                  href="#features" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754443045727-s5oy8jzpt.navigation.0.label')}
                </a>
                
                <a 
                  href="#pricing" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754443045727-s5oy8jzpt.navigation.1.label')}
                </a>
                
                <a 
                  href="#about" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754443045727-s5oy8jzpt.navigation.2.label')}
                </a>
                
                <a 
                  href="#contact" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754443045727-s5oy8jzpt.navigation.3.label')}
                </a>
                
              </nav>

              
              <div className="flex items-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  {t('header.header-basic_1754443045727-s5oy8jzpt.ctaText')}
                </a>
              </div>
              
            </div>
          </div>
        </header>
      </main>
    </div>
  );
}