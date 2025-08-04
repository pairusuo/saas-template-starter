'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('topbar.theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { key: 'light', icon: Sun, label: t('light') },
    { key: 'dark', icon: Moon, label: t('dark') },
    { key: 'system', icon: Monitor, label: t('system') },
  ] as const;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-1 bg-background border rounded-full p-1 shadow-lg">
        {themes.map(({ key, icon: Icon, label }) => (
          <Button
            key={key}
            variant={theme === key ? 'default' : 'ghost'}
            size="sm"
            className="h-7 w-7 rounded-full p-0 transition-all"
            onClick={() => setTheme(key)}
            title={label}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="sr-only">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
