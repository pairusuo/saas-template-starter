'use client';

import React, { useEffect, useState } from 'react';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { ComponentRenderer } from './ComponentRenderer';
import { Button } from '@/components/ui/button';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';
import { PageLayout } from '@/types/page-builder';
import { useTranslations } from 'next-intl';
import { PreviewThemeProvider, usePreviewTheme } from './preview/PreviewThemeProvider';

function PreviewContent() {
  const t = useTranslations('page-builder');
  const { 
    previewMode, 
    setPreviewMode, 
    togglePreviewMode 
  } = useBuilderStore();
  
  const [currentLayout, setCurrentLayout] = useState<PageLayout | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 必须在所有条件判断之前调用hook
  const { theme } = usePreviewTheme();

  useEffect(() => {
    // 从sessionStorage获取预览数据（用于新页签预览）
    const previewDataStr = sessionStorage.getItem('page-builder-preview');
    
    if (previewDataStr) {
      try {
        const previewData = JSON.parse(previewDataStr);
        setCurrentLayout(previewData.layout);
      } catch (error) {
        console.error('Failed to parse preview data:', error);
      }
    } else {
      // 如果没有sessionStorage数据，尝试使用store中的数据
      const storeState = useBuilderStore.getState();
      setCurrentLayout(storeState.currentLayout);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('preview.loading')}</p>
        </div>
      </div>
    );
  }

  if (!currentLayout) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('preview.noData')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('preview.backToBuilder')}
          </p>
          <Button onClick={togglePreviewMode}>
            {t('preview.backToEditor')}
          </Button>
        </div>
      </div>
    );
  }

  // 根据预览模式设置容器样式
  const getPreviewStyles = () => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '320px', // 更符合常见移动设备宽度
          minHeight: '568px', // iPhone SE 等小屏设备高度
          maxHeight: '667px', // iPhone 8 等标准设备高度
        };
      case 'tablet':
        return {
          width: '768px',
          minHeight: '1024px',
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          minHeight: '100vh',
        };
    }
  };

  const previewStyles = getPreviewStyles();
  const isFramed = previewMode !== 'desktop';

  return (
    <div className="h-screen bg-muted/30 flex flex-col">
      {/* 预览工具栏 */}
      <div className="bg-background border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-lg">{t('preview.title')}</h2>
          
          {/* 设备切换 */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="w-4 h-4 mr-2" />
              {t('preview.responsive.desktop')}
            </Button>
            <Button
              variant={previewMode === 'tablet' ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
            >
              <Tablet className="w-4 h-4 mr-2" />
              {t('preview.responsive.tablet')}
            </Button>
            <Button
              variant={previewMode === 'mobile' ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              {t('preview.responsive.mobile')}
            </Button>
          </div>
        </div>

        {/* 关闭预览 */}
        <Button
          variant="outline"
          onClick={() => {
            // 如果是在新页签中，关闭窗口
            if (window.opener) {
              window.close();
            } else {
              // 否则调用togglePreviewMode
              togglePreviewMode();
            }
          }}
        >
          <X className="w-4 h-4 mr-2" />
          {t('preview.exitPreview')}
        </Button>
      </div>

      {/* 预览内容 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div
            className={`
              bg-background shadow-lg ${theme === 'dark' ? 'dark' : ''}
              ${isFramed ? 'rounded-lg border' : ''}
            `}
            style={previewStyles}
          >
            {/* 设备框架装饰 */}
            {isFramed && (
              <div className="p-4 border-b bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-center text-sm text-muted-foreground">
                    {previewMode === 'mobile' ? t('preview.responsive.mobile') : t('preview.responsive.tablet')}
                  </div>
                </div>
              </div>
            )}

            {/* 页面内容 */}
            <div className={isFramed ? 'overflow-auto' : ''}>
              {currentLayout.components.map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isPreview
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 预览信息 */}
      <div className="bg-background border-t p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            {t('preview.summary.components', { count: currentLayout.components.length })}
          </div>
          <div>
            {t('preview.summary.currentView')}: {previewMode === 'desktop' ? t('preview.responsive.desktop') : previewMode === 'tablet' ? t('preview.responsive.tablet') : t('preview.responsive.mobile')}
            {isFramed && ` (${previewStyles.width})`}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewPanel() {
  return (
    <PreviewThemeProvider>
      <PreviewContent />
    </PreviewThemeProvider>
  );
}