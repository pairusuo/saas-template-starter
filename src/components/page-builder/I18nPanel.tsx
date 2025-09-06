'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { toast } from 'sonner';
import { 
  Languages, 
  FileText, 
  Download, 
  RefreshCw, 
  Home,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function I18nPanel() {
  const { currentLayout } = useBuilderStore();
  const params = useParams();
  const currentLocale = params?.locale as string || 'en';
  const t = useTranslations('page-builder');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [translationKeys, setTranslationKeys] = useState<Record<string, any>>({});

  const handleGenerateI18nPage = async (replaceHomePage: boolean = false) => {
    if (!currentLayout || currentLayout.components.length === 0) {
      toast.error(t('messages.noComponentsToTranslate'));
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/page-builder/generate-i18n-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layout: currentLayout,
          replaceHomePage,
          currentLocale
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 显示成功消息
        toast.success(data.message, {
          description: data.description
        });

        // 显示翻译文件保存状态
        if (data.data.translationsSaved) {
          toast.success(data.translationMessage, {
            description: t('translation.updateSuccess', { count: data.data.savedTranslationFiles?.length || 0 })
          });
        }

        // 显示备份信息
        if (data.data.backupPath) {
          toast.info(t('messages.saved'), {
            description: data.data.backupPath
          });
        }

        // 更新生成的代码
        setGeneratedCode(data.generatedCode);
        setTranslationKeys(data.translationKeys);
      } else {
        toast.error(t('translation.updateFailed'), {
          description: data.error || t('translation.unknownError')
        });
      }
    } catch (error) {
      console.error('Generate i18n page error:', error);
      toast.error(t('translation.updateFailed'), {
        description: t('translation.networkError')
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadGeneratedCode = () => {
    if (!generatedCode) {
      toast.error(t('i18n.download.emptyError'));
      return;
    }

    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-page.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(t('i18n.download.success'));
  };

  const componentCount = currentLayout?.components.length || 0;
  const hasComponents = componentCount > 0;

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Languages className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{t('i18n.generatorTitle')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('i18n.generatorSubtitle')}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* 当前状态 */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              {t('i18n.statusTitle')}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div>
                  <span className="text-sm font-medium">{t('i18n.stats.componentCount')}</span>
                  <p className="text-xs text-muted-foreground">{t('i18n.stats.componentCountDesc')}</p>
                </div>
                <Badge variant={hasComponents ? "default" : "secondary"} className="ml-2">
                  {t('i18n.stats.countWithUnit', { count: componentCount })}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div>
                  <span className="text-sm font-medium">{t('i18n.currentLanguage')}</span>
                  <p className="text-xs text-muted-foreground">{t('i18n.currentLanguageDesc')}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {currentLocale === 'zh' ? `${t('i18n.languages.zh')} (ZH)` : `${t('i18n.languages.en')} (EN)`}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* 智能生成功能 */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {t('i18n.generateTitle')}
            </h3>
            
            <div className="space-y-4">
              {/* 智能更新主页 */}
              <div className="p-5 border rounded-lg space-y-4 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{t('i18n.smartUpdateHome.title')}</span>
                  </div>
                  <Badge variant="default" className="text-xs">{t('i18n.smartUpdateHome.recommended')}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('i18n.smartUpdateHome.description')}
                </p>
                <Button 
                  onClick={() => handleGenerateI18nPage(true)}
                  disabled={!hasComponents || isGenerating}
                  className="w-full"
                  size="default"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      {t('i18n.generating')}
                    </>
                  ) : (
                    <>
                      <Home className="w-4 h-4 mr-2" />
                      {t('i18n.smartUpdateHome.button')}
                    </>
                  )}
                </Button>
              </div>

              {/* 生成独立页面 */}
              <div className="p-5 border rounded-lg space-y-4 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{t('i18n.generateStandalone.title')}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('i18n.generateStandalone.description')}
                </p>
                <Button 
                  onClick={() => handleGenerateI18nPage(false)}
                  disabled={!hasComponents || isGenerating}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t('i18n.generateStandalone.button')}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* 功能特点 */}
          <div>
            <h3 className="font-medium mb-3">{t('i18n.features.title')}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t('i18n.features.realtime')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t('i18n.features.merge')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t('i18n.features.backup')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t('i18n.features.bidirectional')}</span>
              </div>
            </div>
          </div>

          {/* 使用说明 */}
          <div>
            <h3 className="font-medium mb-3">{t('i18n.instructions.title')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">1</span>
                <span>{t('i18n.instructions.step1')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">2</span>
                <span>{t('i18n.instructions.step2')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">3</span>
                <span>{t('i18n.instructions.step3')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">4</span>
                <span>{t('i18n.instructions.step4')}</span>
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">{t('i18n.notes.title')}</span>
            </div>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• {t('i18n.notes.itemBackup')}</li>
              <li>• {t('i18n.notes.itemSave')}</li>
              <li>• {t('i18n.notes.itemPreview')}</li>
              <li>• {t('i18n.notes.itemRestart')}</li>
            </ul>
          </div>

          {/* 生成的代码预览 */}
          {generatedCode && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{t('i18n.codePreview.title')}</h3>
                <Button
                  onClick={downloadGeneratedCode}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('i18n.codePreview.download')}
                </Button>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{generatedCode.slice(0, 500)}...</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}