import { getTranslations } from 'next-intl/server';
// 使用 header 翻译文件
// 使用 footer 翻译文件

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // 获取翻译函数
  const tHeader = await getTranslations('header');
  const tFooter = await getTranslations('footer');
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
                  {t('header.header-basic_1754397406209-yqz089rbs.logo')}
                </a>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                
                <a 
                  href="#features" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754397406209-yqz089rbs.navigation.0.label')}
                </a>
                
                <a 
                  href="#pricing" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754397406209-yqz089rbs.navigation.1.label')}
                </a>
                
                <a 
                  href="#about" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754397406209-yqz089rbs.navigation.2.label')}
                </a>
                
                <a 
                  href="#contact" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754397406209-yqz089rbs.navigation.3.label')}
                </a>
                
              </nav>

              
              <div className="flex items-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  {t('header.header-basic_1754397406209-yqz089rbs.ctaText')}
                </a>
              </div>
              
            </div>
          </div>
        </header>

        {/* Footer Basic 组件 */}
        <footer className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  {t('footer.footer-basic_1754397409793-th2sca6ny.companyName')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('footer.footer-basic_1754397409793-th2sca6ny.description')}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">链接</h4>
                <ul className="space-y-2">
                  
                  <li>
                    <a 
                      href="#product" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754397409793-th2sca6ny.links.0.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#pricing" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754397409793-th2sca6ny.links.1.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#about" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754397409793-th2sca6ny.links.2.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#contact" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754397409793-th2sca6ny.links.3.label')}
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {t('footer.footer-basic_1754397409793-th2sca6ny.copyright')}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}