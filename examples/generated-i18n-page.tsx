'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HeroSimple } from '@/components/page-builder/components/heroes/HeroSimple';

/**
 * 示例页面 - Page Builder 生成
 * 演示国际化Landing Page的完整实现
 * 
 * 由页面构建器生成于: 2024-01-05 15:30:00
 * 组件数量: 1
 * 
 * 注意：此页面使用 next-intl 进行国际化
 * 翻译文件位于: messages/[locale]/hero.json
 * 
 * 使用方法：
 * 1. 将此文件保存为 src/app/[locale]/page.tsx
 * 2. 确保messages目录下有对应的翻译文件
 * 3. 访问 /zh 和 /en 查看不同语言版本
 */
export default function GeneratedPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <HeroSimple
        title={t('hero.hero-simple_1754396868785-grjyfby90.title')}
        subtitle={t('hero.hero-simple_1754396868785-grjyfby90.subtitle')}
        primaryButtonText={t('hero.hero-simple_1754396868785-grjyfby90.primaryButtonText')}
        secondaryButtonText={t('hero.hero-simple_1754396868785-grjyfby90.secondaryButtonText')}
        showSecondaryButton={t('hero.hero-simple_1754396868785-grjyfby90.showSecondaryButton') === 'true'}
      />
    </div>
  );
}