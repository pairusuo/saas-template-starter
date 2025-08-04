'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowRight, Search, Compass, Clock, Sparkles, Star } from 'lucide-react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const t = useTranslations('errors');
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const homePath = locale === 'en' ? '/' : `/${locale}`;
          router.push(homePath);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, locale]);

  const handleRedirectNow = () => {
    const homePath = locale === 'en' ? '/' : `/${locale}`;
    router.push(homePath);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-accent/5 dark:bg-accent/10 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Floating stars */}
        <div className="absolute top-20 left-20">
          <Star className="w-4 h-4 text-primary/20 animate-pulse delay-300" />
        </div>
        <div className="absolute top-40 right-32">
          <Sparkles className="w-6 h-6 text-secondary/30 animate-pulse delay-700" />
        </div>
        <div className="absolute bottom-32 left-1/3">
          <Star className="w-3 h-3 text-accent/25 animate-pulse delay-1200" />
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full">
          {/* Main content card with enhanced styling */}
          <Card className="bg-card/90 dark:bg-card/60 backdrop-blur-md border-border/60 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              {/* 404 Animation with enhanced effects */}
              <div className="text-center space-y-6">
                <div className="relative">
                  <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-pulse drop-shadow-sm">
                    404
                  </h1>
                  <div className="absolute -top-6 -right-6 animate-bounce">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
                      <Search className="relative w-12 h-12 text-primary/70" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t('pageNotFoundTitle')}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                    {t('pageNotFoundDescription')}
                  </p>
                </div>
              </div>

              {/* Enhanced countdown section */}
              <div className="space-y-4">
                <Card className="bg-muted/40 dark:bg-muted/20 border-border/40">
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{t('autoRedirectCountdown')}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center border-2 border-primary/20">
                            <span className="text-xl font-bold text-primary">{countdown}</span>
                          </div>
                          <div
                            className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin"
                            style={{
                              background: `conic-gradient(from 0deg, transparent ${((5 - countdown) / 5) * 360}deg, rgba(var(--primary), 0.1) ${((5 - countdown) / 5) * 360}deg)`,
                            }}
                          />
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {t('secondsUntilRedirect')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced progress bar */}
                <div className="relative">
                  <div className="w-full bg-secondary/30 dark:bg-secondary/20 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-full transition-all duration-1000 ease-out shadow-sm relative"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced action buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleRedirectNow}
                  className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  size="lg"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {t('redirectNow')}
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="w-full h-12 text-base font-medium border-border/60 hover:bg-muted/60 dark:hover:bg-muted/40 transition-all duration-300 hover:border-primary/30"
                  size="lg"
                >
                  <a
                    href={locale === 'en' ? '/' : `/${locale}`}
                    className="flex items-center justify-center"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    {t('goHome')}
                  </a>
                </Button>
              </div>

              {/* Quick links section */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    {t('helpfulLinks')}
                  </h3>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-muted/50 dark:hover:bg-muted/30"
                    >
                      <Search className="w-3 h-3 mr-1" />
                      {t('searchSite')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-muted/50 dark:hover:bg-muted/30"
                    >
                      <Compass className="w-3 h-3 mr-1" />
                      {t('browseCategories')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Help text */}
              <div className="text-center pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('errorContactSupport')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced floating elements */}
          <div className="absolute -z-10 top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping delay-500" />
          <div className="absolute -z-10 top-3/4 right-1/4 w-1 h-1 bg-secondary/60 rounded-full animate-ping delay-1000" />
          <div className="absolute -z-10 bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/50 rounded-full animate-ping delay-1500" />
          <div className="absolute -z-10 top-1/2 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-ping delay-2000" />
        </div>
      </div>
    </div>
  );
}
