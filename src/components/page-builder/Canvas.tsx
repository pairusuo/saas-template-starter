'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslations } from 'next-intl';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { CanvasComponent } from './CanvasComponent';
import { EmptyCanvas } from './EmptyCanvas';

export function Canvas() {
  const { currentLayout, selectedComponent, previewMode } = useBuilderStore();
  const t = useTranslations('page-builder');

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas',
    },
  });

  // 根据预览模式设置画布宽度
  const getCanvasWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-xs'; // ~320px，与预览面板保持一致
      case 'tablet':
        return 'max-w-2xl'; // ~672px
      case 'desktop':
      default:
        return 'max-w-6xl'; // ~1152px
    }
  };

  // 根据预览模式设置画布样式
  const getCanvasStyle = () => {
    const baseStyle = 'mx-auto transition-all duration-300';
    const widthClass = getCanvasWidth();
    
    switch (previewMode) {
      case 'mobile':
        return `${baseStyle} ${widthClass} border-x border-border/20`;
      case 'tablet':
        return `${baseStyle} ${widthClass} border-x border-border/20`;
      case 'desktop':
      default:
        return `${baseStyle} ${widthClass}`;
    }
  };

  if (!currentLayout || currentLayout.components.length === 0) {
    return (
      <div ref={setNodeRef} className="h-full">
        <EmptyCanvas isOver={isOver} />
      </div>
    );
  }

  // 按固定位置类型排序组件：top -> flexible -> bottom
  const sortedComponents = [...currentLayout.components].sort((a, b) => {
    const getPositionPriority = (positionType?: string) => {
      switch (positionType) {
        case 'top': return 0;
        case 'bottom': return 2;
        default: return 1; // flexible or undefined
      }
    };
    
    const priorityA = getPositionPriority(a.positionType);
    const priorityB = getPositionPriority(b.positionType);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // 同类型组件按position排序
    return a.position - b.position;
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-full bg-background relative
        ${isOver ? 'bg-primary/5' : ''}
      `}
    >
      {/* 画布内容 */}
      <div className={getCanvasStyle()}>
        <SortableContext
          items={sortedComponents.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedComponents.map((component, index) => (
            <CanvasComponent
              key={component.id}
              component={component}
              index={index}
              isSelected={selectedComponent === component.id}
              previewMode={previewMode}
            />
          ))}
        </SortableContext>
      </div>

      {/* 拖拽指示器 */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-primary/50 bg-primary/5 pointer-events-none">
          <div className="flex items-center justify-center h-full">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
              {t('canvas.dropToAdd')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}