'use client';

import React from 'react';
import { useTranslations } from 'next-intl';import { HeaderBasic } from '@/components/page-builder/components/headers/HeaderBasic';

/**
 * 新页面
 * 使用拖拽构建器创建的页面
 * 
 * 由页面构建器生成于: 2025/8/8 15:19:08
 * 组件数量: 1
 * 
 * 注意：此页面使用 next-intl 进行国际化
 * 翻译文件位于: messages/[locale]/
 */
export default function Page() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <HeaderBasic />
    </div>
  );
}