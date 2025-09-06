import { getTranslations } from 'next-intl/server';
// 使用 header 翻译文件
// 使用 hero 翻译文件
// 使用 footer 翻译文件

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // 获取翻译函数
  const tHeader = await getTranslations('header');
  const tHero = await getTranslations('hero');
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
                  {t('header.header-basic_1754396863300-v9rnzumgi.logo')}
                </a>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                
                <a 
                  href="#features" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754396863300-v9rnzumgi.navigation.0.label')}
                </a>
                
                <a 
                  href="#pricing" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754396863300-v9rnzumgi.navigation.1.label')}
                </a>
                
                <a 
                  href="#about" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754396863300-v9rnzumgi.navigation.2.label')}
                </a>
                
                <a 
                  href="#contact" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('header.header-basic_1754396863300-v9rnzumgi.navigation.3.label')}
                </a>
                
              </nav>

              
              <div className="flex items-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  {t('header.header-basic_1754396863300-v9rnzumgi.ctaText')}
                </a>
              </div>
              
            </div>
          </div>
        </header>

        {/* Hero Simple 组件 */}
        <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('hero.hero-simple_1754396868785-grjyfby90.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('hero.hero-simple_1754396868785-grjyfby90.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {t('hero.hero-simple_1754396868785-grjyfby90.primaryButtonText')}
                </a>
                
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium"
                >
                  {t('hero.hero-simple_1754396868785-grjyfby90.secondaryButtonText')}
                </a>
                
              </div>
            </div>
          </div>
        </section>

        {/* Footer Basic 组件 */}
        <footer className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  {t('footer.footer-basic_1754396866457-p8oj1bhzf.companyName')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('footer.footer-basic_1754396866457-p8oj1bhzf.description')}
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
                      {t('footer.footer-basic_1754396866457-p8oj1bhzf.links.0.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#pricing" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754396866457-p8oj1bhzf.links.1.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#about" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754396866457-p8oj1bhzf.links.2.label')}
                    </a>
                  </li>
                  
                  <li>
                    <a 
                      href="#contact" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.footer-basic_1754396866457-p8oj1bhzf.links.3.label')}
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {t('footer.footer-basic_1754396866457-p8oj1bhzf.copyright')}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}