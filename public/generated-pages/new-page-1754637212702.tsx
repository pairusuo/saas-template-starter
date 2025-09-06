'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HeaderBasic } from '@/components/page-builder/components/headers/HeaderBasic';
import { HeroSimple } from '@/components/page-builder/components/heroes/HeroSimple';
import { FooterBasic } from '@/components/page-builder/components/footers/FooterBasic';

/**
 * New Page
 * Page created with drag-and-drop builder
 * 
 * 由页面构建器生成于: 2025/8/8 15:13:32
 * 组件数量: 3
 * 
 * 注意：此页面使用 next-intl 进行国际化
 * 翻译文件位于: messages/[locale]/
 */
export default function NewPagePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <HeaderBasic />

      <HeroSimple />

      <FooterBasic />
    </div>
  );
}