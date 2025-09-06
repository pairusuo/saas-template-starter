'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { componentRegistry } from '@/utils/page-builder/component-registry';
import { ComponentSchema } from '@/types/page-builder';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// Removed Tabs-based layout; using collapsible sections instead
import { Search, Grip } from 'lucide-react';
import { defaultLocale } from '@/lib/i18n-config';

interface DraggableComponentProps {
  schema: ComponentSchema;
}

function DraggableComponent({ schema }: DraggableComponentProps) {
  const t = useTranslations('page-builder');
  // Helper: convert kebab-case type to camelCase keys used in locales
  const camelKey = (type: string) =>
    type.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  const typeKey = camelKey(schema.type);

  // Safely get localized name/description; fallback to schema fields
  let localizedName = schema.displayName || schema.name;
  try {
    const candidate = t(`componentPanel.components.${typeKey}` as any);
    if (candidate && typeof candidate === 'string') localizedName = candidate;
  } catch {}

  let localizedDescription = schema.description;
  try {
    const candidate = t(`componentPanel.descriptions.${typeKey}` as any);
    if (candidate && typeof candidate === 'string') localizedDescription = candidate;
  } catch {}
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: schema.type,
    data: {
      type: 'component-template',
      defaultProps: schema.defaultProps,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // 检查是否为固定位置组件
  const isFixedPosition = schema.positionType === 'top' || schema.positionType === 'bottom';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group relative p-4 border rounded-lg cursor-grab active:cursor-grabbing
        hover:border-primary/50 hover:bg-accent/50 transition-colors
        ${isDragging ? 'opacity-50' : ''}
        ${isFixedPosition ? 'border-dashed border-muted-foreground/50' : ''}
      `}
    >
      {/* 拖拽图标 */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Grip className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* 固定位置标识（组件库预览中不显示） */}

      {/* 组件预览图 */}
      <div className="aspect-video bg-muted rounded mb-3 flex items-center justify-center">
        {schema.thumbnail || schema.preview ? (
          <div className="w-full h-full relative rounded overflow-hidden">
            <img
              src={schema.thumbnail || schema.preview}
              alt={localizedName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="text-xs text-muted-foreground text-center">
            {localizedName}
          </div>
        )}
      </div>

      {/* 组件信息 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{localizedName}</h4>
          <Badge variant="secondary" className="text-xs">
            {t(`componentPanel.categories.${schema.category}`) || schema.category}
          </Badge>
        </div>
        
        {localizedDescription && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {localizedDescription}
          </p>
        )}
      </div>
    </div>
  );
}

export function ComponentPanel() {
  const t = useTranslations('page-builder');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;
  const [searchTerm, setSearchTerm] = useState('');
  // Collapsible state per category (default collapsed)
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const allComponents = componentRegistry.getAllComponents();
  const categories = componentRegistry.getCategories();

  // Filter by search only; include localized name/description/category for matching
  const filteredComponents = allComponents.filter((schema: ComponentSchema) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    // raw fields
    const rawName = (schema.displayName || schema.name || '').toLowerCase();
    const rawDesc = (schema.description || '').toLowerCase();

    // localized fields (best-effort)
    const camelKey = (type: string) => type.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const typeKey = camelKey(schema.type);
    let locName = '';
    let locDesc = '';
    let locCategory = '';
    try { locName = (t(`componentPanel.components.${typeKey}`) as unknown as string) || ''; } catch {}
    try { locDesc = (t(`componentPanel.descriptions.${typeKey}`) as unknown as string) || ''; } catch {}
    try { locCategory = (t(`componentPanel.categories.${schema.category}`) as unknown as string) || ''; } catch {}

    const haystack = [rawName, rawDesc, locName, locDesc, locCategory]
      .filter(Boolean)
      .join('||')
      .toLowerCase();

    return haystack.includes(term);
  });

  // 按类别分组
  const componentsByCategory = filteredComponents.reduce((acc: Record<string, ComponentSchema[]>, schema: ComponentSchema) => {
    if (!acc[schema.category]) {
      acc[schema.category] = [];
    }
    acc[schema.category].push(schema);
    return acc;
  }, {} as Record<string, ComponentSchema[]>);

  return (
    <div className="h-full flex flex-col">
      {/* 标题 */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">{t('componentPanel.title')}</h2>
        <p className="text-sm text-muted-foreground">
          {t('componentPanel.description')}
        </p>
      </div>

      {/* 搜索框 */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('componentPanel.search')}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 组件列表 - 按分类折叠 */}
      <div 
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
      >
        <div className="p-4">
          {categories.map((category) => {
            const comps = (componentsByCategory[category] || []).filter(c => filteredComponents.includes(c));
            const isOpen = !!openMap[category];
            const toggle = () => setOpenMap((m) => ({ ...m, [category]: !m[category] }));
            return (
              <div key={category} className="mb-3 border rounded-lg">
                <button
                  type="button"
                  onClick={toggle}
                  className="w-full flex items-center justify-between px-3 py-2 text-left"
                >
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t(`componentPanel.categories.${category}`) || category}
                  </span>
                  <span className="text-xs text-muted-foreground">{comps.length}</span>
                </button>
                {isOpen && comps.length > 0 && (
                  <div className="p-3 space-y-3 border-t">
                    {comps.map((schema: ComponentSchema) => (
                      <DraggableComponent key={schema.type} schema={schema} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="p-4 border-t bg-muted/30 sticky bottom-0">
        <div className="text-xs text-muted-foreground">
          {t('componentPanel.totalComponents', { count: filteredComponents.length })}
        </div>
      </div>
    </div>
  );
}