'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { pageDataManager } from '@/lib/page-data-manager';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config';
import { 
  Eye, 
  Save, 
  Download, 
  Settings,
  RotateCcw,
  Languages,
  Globe,
  Rocket,
  Github,
  Home,
  PanelLeft,
  PanelRight
} from 'lucide-react';

export function Toolbar() {
  const t = useTranslations('page-builder');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;
  const { 
    currentLayout, 
    saveLayout,
    clearLayout,
    showComponentPanel,
    showPropertiesPanel,
    toggleComponentPanel,
    togglePropertiesPanel
  } = useBuilderStore();
  
  const [isTranslating, setIsTranslating] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isExportingGithub, setIsExportingGithub] = useState(false);

  // 导出独立项目（ZIP）
  const handleExportProjectZip = async () => {
    if (isExportingZip) return; // guard against double-invocation
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsToExport') || 'No components to export');
      return;
    }
    try {
      setIsExportingZip(true);
      // Use Edge-compatible full export (no Node fs)
      const res = await fetch('/api/page-builder/export-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentLayout),
        cache: 'no-store'
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Export failed: ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `landing-export-full-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export ZIP failed', e);
      alert((e as Error)?.message || 'Export failed');
    } finally {
      setIsExportingZip(false);
    }
  };

  // 导出到 GitHub 私有仓库
  const handleExportGithub = async () => {
    if (isExportingGithub) return;
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsToExport') || 'No components to export');
      return;
    }
    try {
      setIsExportingGithub(true);
      const res = await fetch('/api/page-builder/export-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentLayout.name, layout: currentLayout }),
        cache: 'no-store'
      });
      if (res.status === 403) {
        let data: any = {};
        try { data = await res.json(); } catch {}
        if (data?.needs_upgrade && data?.authorize_url) {
          if (confirm(t('messages.githubAuthUpgrade') || '需要额外授权以创建私有仓库，立即前往授权？')) {
            window.location.href = data.authorize_url;
          }
          return;
        }
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Export to GitHub failed: ${res.status}`);
      }
      const json = await res.json();
      const url = json?.url as string | undefined;
      if (url) {
        window.open(url, '_blank');
      } else {
        alert('Exported, but missing repository URL');
      }
    } catch (e) {
      console.error('Export GitHub failed', e);
      alert((e as Error)?.message || 'Export to GitHub failed');
    } finally {
      setIsExportingGithub(false);
    }
  };
  
  // 预览功能 - 在新页签中打开预览
  const handlePreview = () => {
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsPreview'));
      return;
    }

    // 将当前布局数据保存到sessionStorage，供预览页面使用
    const previewData = {
      layout: currentLayout,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('page-builder-preview', JSON.stringify(previewData));
    
    // 获取当前语言环境和完整路径
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // 确定语言环境（第一个路径段，如果不是语言代码则默认为 'en'）
    const currentLocale = ['en', 'zh'].includes(pathParts[0]) ? pathParts[0] : 'en';
    
    // 构建预览 URL - 确保不重复 page-builder
    const previewUrl = `/${currentLocale}/page-builder/preview?t=${Date.now()}`;
    window.open(previewUrl, '_blank');
  };

  // 保存功能 - 保存TSX文件到项目目录
  const handleSave = async () => {
    if (!currentLayout) {
      alert(t('messages.noLayoutToSave'));
      return;
    }

    if (!currentLayout.components.length) {
      alert(t('messages.noComponentsToSave'));
      return;
    }

    try {
      // 显示保存中状态
      const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement;
      if (saveButton) {
        saveButton.disabled = true;
        saveButton.textContent = t('toolbar.saving');
      }

      const result = (await saveLayout(currentLayout)) as { success: boolean; filePath?: string; fileName?: string; error?: string } | undefined;
      
      if (result?.success) {
        // Use a concise alert showing path and filename with localized labels
        alert(`${t('messages.saved')}\n\n${t('common.path')}: ${result.filePath}\n${t('common.file')}: ${result.fileName}`);
      } else {
        alert(t('messages.saveFailed', {error: result?.error || t('messages.unknownError')}));
      }
    } catch (error) {
      console.error('保存过程中出错:', error);
      alert(t('messages.saveFailed', {error: (error as Error)?.message || t('messages.unknownError')}));
    } finally {
      // 恢复按钮状态
      const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement;
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.textContent = t('toolbar.save');
      }
    }
  };

  // 导出代码功能
  const handleExportCode = () => {
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsToExport'));
      return;
    }

    // 生成React代码
    const generateCode = () => {
      const imports = new Set<string>();
      const componentCode = currentLayout.components.map(component => {
        // 根据组件类型添加正确的导入路径
        let componentName = '';
        let importPath = '';
        
        switch (component.type) {
          case 'hero-simple':
            componentName = 'HeroSimple';
            importPath = '@/components/page-builder/components/HeroSimple';
            break;
          case 'hero-centered':
            componentName = 'HeroCentered';
            importPath = '@/components/page-builder/components/HeroCentered';
            break;
          case 'header-basic':
            componentName = 'HeaderBasic';
            importPath = '@/components/page-builder/components/HeaderBasic';
            break;
          case 'footer-basic':
            componentName = 'FooterBasic';
            importPath = '@/components/page-builder/components/FooterBasic';
            break;
          case 'features-grid':
            componentName = 'FeaturesGrid';
            importPath = '@/components/page-builder/components/features/FeaturesGrid';
            break;
          case 'features-list':
            componentName = 'FeaturesList';
            importPath = '@/components/page-builder/components/features/FeaturesList';
            break;
          case 'stats-minimal':
            componentName = 'StatsMinimal';
            importPath = '@/components/page-builder/components/stats/StatsMinimal';
            break;
          case 'stats-basic':
            componentName = 'StatsBasic';
            importPath = '@/components/page-builder/components/stats/StatsBasic';
            break;
          case 'testimonials-simple':
            componentName = 'TestimonialsSimple';
            importPath = '@/components/page-builder/components/testimonials/TestimonialsSimple';
            break;
          case 'testimonials-grid':
            componentName = 'TestimonialsGrid';
            importPath = '@/components/page-builder/components/testimonials/TestimonialsGrid';
            break;
          case 'social-proof-avatars':
            componentName = 'SocialProofAvatars';
            importPath = '@/components/page-builder/components/social-proof/SocialProofAvatars';
            break;
          case 'social-proof-logos':
            componentName = 'SocialProofLogos';
            importPath = '@/components/page-builder/components/social-proof/SocialProofLogos';
            break;
          case 'cta-simple':
            componentName = 'CtaSimple';
            importPath = '@/components/page-builder/components/cta/CtaSimple';
            break;
          case 'cta-split':
            componentName = 'CtaSplit';
            importPath = '@/components/page-builder/components/cta/CtaSplit';
            break;
          case 'pricing-cards':
            componentName = 'PricingCardsBuilder';
            importPath = '@/components/page-builder/components/pricing/PricingCardsBuilder';
            break;
          case 'faq-accordion':
            componentName = 'FAQAccordion';
            importPath = '@/components/page-builder/components/faq/FAQAccordion';
            break;
          case 'contact-form-builder' as any:
            componentName = 'ContactFormBuilder';
            importPath = '@/components/page-builder/components/contact/ContactFormBuilder';
            break;
          case 'contact-form' as any:
            componentName = 'ContactFormBuilder';
            importPath = '@/components/page-builder/components/contact/ContactFormBuilder';
            break;
          default:
            // 对于其他组件，使用原有的命名规则
            const typeStr = typeof component.type === 'string' ? component.type : '';
            componentName = typeStr.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            importPath = `@/components/landing/${typeStr.split('-')[0]}/${typeStr}`;
        }
        
        imports.add(`import { ${componentName} } from '${importPath}';`);
        
        // 生成组件JSX
        const propsString = Object.entries(component.props)
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => {
            if (typeof value === 'string') {
              return `\n        ${key}="${value}"`;
            } else if (typeof value === 'boolean') {
              return value ? `\n        ${key}` : `\n        ${key}={false}`;
            } else if (Array.isArray(value)) {
              return `\n        ${key}={${JSON.stringify(value, null, 10).replace(/\n/g, '\n          ')}}`;
            } else if (typeof value === 'object') {
              return `\n        ${key}={${JSON.stringify(value, null, 10).replace(/\n/g, '\n          ')}}`;
            } else {
              return `\n        ${key}={${JSON.stringify(value)}}`;
            }
          })
          .join('');
        
        return `      <${componentName}${propsString}${propsString ? '\n      ' : ' '}/>`;
      }).join('\n\n');

      return `'use client';

import React from 'react';
${Array.from(imports).join('\n')}

export default function GeneratedPage() {
  return (
    <div className="min-h-screen">
${componentCode}
    </div>
  );
}`;
    };

    const code = generateCode();
    
    // 创建下载链接
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-page-${Date.now()}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // 显示成功消息
    alert(t('messages.codeExported'));
  };

  // 设置功能
  const handleSettings = () => {
    // 这里可以打开设置面板
    alert(t('messages.settingsInDevelopment'));
  };

  // 翻译功能
  const handleTranslate = async () => {
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsToTranslate'));
      return;
    }

    // 获取当前语言环境
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const currentLocale = ['en', 'zh'].includes(pathParts[0]) ? pathParts[0] : 'en';
    const targetLang = currentLocale === 'zh' ? 'en' : 'zh';
    const targetLangName = targetLang === 'zh' ? t('i18n.languages.zh') : t('i18n.languages.en');
    
    if (!confirm(t('messages.confirmTranslate', {targetLang: targetLangName}))) {
      return;
    }

    setIsTranslating(true);
    
    try {
      const response = await fetch('/api/page-builder/translate-layout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          components: currentLayout.components.map(comp => ({
            type: comp.type,
            id: comp.id,
            props: comp.props
          })),
          targetLang,
          sourceLang: currentLocale
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // 创建新的翻译页面布局
        const translatedLayout = {
          ...currentLayout,
          id: `${currentLayout.id}-${targetLang}`,
          name: `${currentLayout.name} (${targetLangName})`,
          components: result.data.translatedComponents.map((comp: any, index: number) => ({
            ...currentLayout.components[index],
            props: comp.props,
            updatedAt: new Date()
          })),
          metadata: {
            ...currentLayout.metadata,
            locale: targetLang,
            title: result.data.translatedComponents.find((c: any) => c.type.includes('hero'))?.props?.title || currentLayout.metadata.title
          },
          updatedAt: new Date()
        };

        // 保存翻译后的布局到新窗口预览
        const previewData = {
          layout: translatedLayout,
          timestamp: Date.now(),
          isTranslated: true,
          originalLang: currentLocale,
          targetLang
        };
        
        sessionStorage.setItem('page-builder-preview', JSON.stringify(previewData));
        
        // 构建预览 URL
        const previewUrl = `/${targetLang}/page-builder/preview?translated=true&t=${Date.now()}`;
        window.open(previewUrl, '_blank');
        
        const originalLangName = currentLocale === 'zh' ? t('i18n.languages.zh') : t('i18n.languages.en');
        alert(t('messages.translateSuccess', {
          originalLang: originalLangName,
          targetLang: targetLangName,
          provider: result.data.provider
        }));
      } else {
        alert(t('messages.translateFailed', {
          error: result.error,
          details: result.details || t('messages.unknownError')
        }));
      }
    } catch (error) {
      console.error('翻译请求失败:', error);
      alert(t('messages.translateRequestFailed', {
        error: (error as Error)?.message || t('messages.networkError')
      }));
    } finally {
      setIsTranslating(false);
    }
  };

  // 清空画布
  const handleClear = () => {
    if (confirm(t('messages.confirmClear'))) {
      clearLayout();
    }
  };

  // 应用到项目主页
  const handleApplyToProject = async () => {
    if (!currentLayout || !currentLayout.components.length) {
      alert(t('messages.noComponentsToApply'));
      return;
    }

    if (!confirm(t('messages.confirmApplyToProject'))) {
      return;
    }

    try {
      await pageDataManager.applyToProjectHome(currentLayout.components, locale);
      alert(t('messages.applyToProjectSuccess'));
      
      // 可选：打开项目主页预览
      const homeUrl = `/${locale}`;
      if (confirm(t('messages.openProjectHome'))) {
        window.open(homeUrl, '_blank');
      }
    } catch (error) {
      console.error('应用到项目主页失败:', error);
      alert(t('messages.applyToProjectFailed', {
        error: (error as Error)?.message || t('messages.unknownError')
      }));
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      {/* 左侧操作 */}
      <div className="flex items-center gap-2">
        {/* 侧边栏切换按钮 */}
        <Button 
          variant={showComponentPanel ? "default" : "outline"}
          size="sm"
          onClick={toggleComponentPanel}
          title={t('actions.toggleComponentPanel')}
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePreview}
        >
          <Eye className="w-4 h-4 mr-1" />
          {t('toolbar.preview')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleClear}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {t('toolbar.clear')}
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button 
          variant="default" 
          size="sm"
          onClick={handleApplyToProject}
          className="bg-primary hover:bg-primary/90"
        >
          <Rocket className="w-4 h-4 mr-1" />
          {t('toolbar.applyToProject')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <>
              <Globe className="w-4 h-4 mr-1 animate-spin" />
              {t('toolbar.translating')}
            </>
          ) : (
            <>
              <Languages className="w-4 h-4 mr-1" />
              {t('toolbar.translatePage')}
            </>
          )}
        </Button>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSave}
          data-save-button
        >
          <Save className="w-4 h-4 mr-1" />
          {t('toolbar.save')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExportCode}
        >
          <Download className="w-4 h-4 mr-1" />
          {t('toolbar.export')}
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={handleExportProjectZip}
          disabled={isExportingZip}
          className="bg-primary/90 hover:bg-primary"
        >
          <Download className="w-4 h-4 mr-1" />
          {isExportingZip ? 'Exporting…' : 'Export ZIP'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExportGithub}
          disabled={isExportingGithub}
        >
          <Github className="w-4 h-4 mr-1" />
          {isExportingGithub ? 'Exporting…' : 'Export to GitHub'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSettings}
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* 属性面板切换按钮 */}
        <Button 
          variant={showPropertiesPanel ? "default" : "outline"}
          size="sm"
          onClick={togglePropertiesPanel}
          title={t('actions.togglePropertiesPanel')}
        >
          <PanelRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
