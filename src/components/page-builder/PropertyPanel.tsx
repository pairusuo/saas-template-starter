'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, Info, Languages } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface PropertyFieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  componentType: string;
  componentId: string;
  currentLocale: string;
}

function PropertyField({ label, value, onChange, componentType, componentId, currentLocale }: PropertyFieldProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const t = useTranslations('page-builder');

  const handleSave = async () => {
    onChange(localValue);
    setIsEditing(false);
    
    // 如果是文本内容，触发实时翻译
    if (typeof localValue === 'string' && localValue.trim()) {
      await updateTranslation(localValue);
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  // 实时翻译更新
  const updateTranslation = async (newValue: string) => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/page-builder/update-translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentType,
          componentId,
          props: { [label]: newValue },
          currentLocale
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(t('translation.updated'), {
          description: t('translation.updateSuccess', { count: data.data.updatedFiles.length })
        });
      } else {
        toast.error(t('translation.updateFailed'), {
          description: data.error || t('translation.unknownError')
        });
      }
    } catch (error) {
      console.error('Translation update failed:', error);
      toast.error(t('translation.updateFailed'), {
        description: t('translation.networkError')
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const renderField = () => {
    if (typeof value === 'boolean') {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={localValue}
            onChange={(e) => {
              setLocalValue(e.target.checked);
              onChange(e.target.checked);
            }}
            className="rounded border-gray-300"
          />
          <span className="text-sm">{localValue ? t('common.yes') : t('common.no')}</span>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div className="space-y-2">
          <Input
            type="number"
            value={localValue}
            onChange={(e) => setLocalValue(Number(e.target.value))}
            onBlur={handleSave}
            className="w-full"
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      if (value.length > 50) {
        // 长文本使用textarea
        return (
          <div className="space-y-2">
            <div className="relative">
              <textarea
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleSave}
                className="w-full p-2 border rounded-md resize-none pr-8"
                rows={3}
                disabled={isTranslating}
              />
              {isTranslating && (
                <div className="absolute top-2 right-2">
                  <Languages className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>
              )}
            </div>
            {isTranslating && (
              <div className="text-xs text-blue-600 flex items-center gap-1">
                <Languages className="w-3 h-3" />
                {t('common.updating')}
              </div>
            )}
          </div>
        );
      } else {
        // 短文本使用input
        return (
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleSave}
                className="w-full pr-8"
                disabled={isTranslating}
              />
              {isTranslating && (
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <Languages className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>
              )}
            </div>
            {isTranslating && (
              <div className="text-xs text-blue-600 flex items-center gap-1">
                <Languages className="w-3 h-3" />
                {t('common.updating')}
              </div>
            )}
          </div>
        );
      }
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-2">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={JSON.stringify(localValue, null, 2)}
                onChange={(e) => {
                  try {
                    setLocalValue(JSON.parse(e.target.value));
                  } catch {
                    // 忽略JSON解析错误
                  }
                }}
                className="w-full p-2 border rounded-md font-mono text-xs"
                rows={6}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} disabled={isTranslating}>
                  {isTranslating ? t('common.updating') : t('common.save')}
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>{t('common.cancel')}</Button>
              </div>
            </div>
          ) : (
            <div 
              className="p-2 bg-muted rounded text-xs font-mono cursor-pointer hover:bg-muted/80"
              onClick={() => setIsEditing(true)}
            >
              {JSON.stringify(value, null, 2)}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-2 bg-muted rounded text-sm">
        {String(value)}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium capitalize">
        {label.replace(/([A-Z])/g, ' $1').trim()}
      </label>
      {renderField()}
    </div>
  );
}

export function PropertyPanel() {
  const { currentLayout, selectedComponent: selectedComponentId, updateComponent } = useBuilderStore();
  const params = useParams();
  const currentLocale = params?.locale as string || 'en';
  const t = useTranslations('page-builder');

  const selectedComponent = currentLayout?.components.find(
    comp => comp.id === selectedComponentId
  );

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col">
        {/* 标题 */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{t('propertyPanel.title')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('propertyPanel.noSelection')}
              </p>
            </div>
          </div>
        </div>

        {/* 空状态 */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
          <div className="flex items-center justify-center min-h-[600px] p-8">
            <div className="text-center max-w-sm mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <Info className="w-10 h-10 text-primary/60" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('propertyPanel.noSelection')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('canvas.dropDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 标题 */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{t('propertyPanel.title')}</h2>
              <p className="text-sm text-muted-foreground">
                {t('propertyPanel.general')}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {selectedComponent.type}
          </Badge>
        </div>
      </div>

      {/* 属性编辑区域 */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="font-medium mb-3">{t('propertyPanel.general')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('propertyPanel.componentId')}:</span>
                <span className="font-mono text-xs">{selectedComponent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('propertyPanel.componentType')}:</span>
                <span>{selectedComponent.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('propertyPanel.position')}:</span>
                <span>{selectedComponent.position}</span>
              </div>
            </div>
          </div>

          {/* 位置调整 */}
          <div>
            <h3 className="font-medium mb-3">{t('propertyPanel.positionAdjustment')}</h3>
            {selectedComponent.positionType === 'top' || selectedComponent.positionType === 'bottom' ? (
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">
                  📌 {selectedComponent.positionType === 'top' ? t('fixedPosition.header') : t('fixedPosition.footer')} {t('fixedPosition.componentSuffix')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('fixedPosition.cannotMove')}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const { moveComponent } = useBuilderStore.getState();
                      const currentIndex = currentLayout?.components.findIndex(c => c.id === selectedComponent.id) || 0;
                      if (currentIndex > 0) {
                        moveComponent(selectedComponent.id, currentIndex - 1);
                      }
                    }}
                    disabled={selectedComponent.position === 0}
                    className="flex-1"
                  >
                    ↑ {t('propertyPanel.moveUp')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const { moveComponent } = useBuilderStore.getState();
                      const currentIndex = currentLayout?.components.findIndex(c => c.id === selectedComponent.id) || 0;
                      const totalComponents = currentLayout?.components.length || 0;
                      if (currentIndex < totalComponents - 1) {
                        moveComponent(selectedComponent.id, currentIndex + 1);
                      }
                    }}
                    disabled={selectedComponent.position === (currentLayout?.components.length || 1) - 1}
                    className="flex-1"
                  >
                    ↓ {t('propertyPanel.moveDown')}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {t('fixedPosition.currentPosition')}: {selectedComponent.position + 1} / {currentLayout?.components.length || 0}
                </div>
              </div>
            )}
          </div>

          {/* 属性配置 */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              {t('propertyPanel.propertyConfig')}
              <Badge variant="outline" className="text-xs">
                <Languages className="w-3 h-3 mr-1" />
                {t('propertyPanel.realTimeTranslation')}
              </Badge>
            </h3>
            <div className="space-y-4">
              {Object.entries(selectedComponent.props).map(([key, value]) => (
                <PropertyField
                  key={key}
                  label={key}
                  value={value}
                  componentType={selectedComponent.type}
                  componentId={selectedComponent.id}
                  currentLocale={currentLocale}
                  onChange={(newValue) => {
                    updateComponent(selectedComponent.id, { [key]: newValue });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="p-4 border-t space-y-2">
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          {t('propertyPanel.applyChanges')}
        </button>
        <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
          {t('propertyPanel.resetProperties')}
        </button>
      </div>
    </div>
  );
}