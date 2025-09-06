'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { PageComponent, PreviewMode } from '@/types/page-builder';
import { ComponentRenderer } from './ComponentRenderer';
import { Grip, Copy, Trash2, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CanvasComponentProps {
  component: PageComponent;
  index: number;
  isSelected: boolean;
  previewMode?: PreviewMode;
}

export function CanvasComponent({ component, index, isSelected, previewMode }: CanvasComponentProps) {
  const { selectComponent, removeComponent, duplicateComponent } = useBuilderStore();
  const t = useTranslations('page-builder');
  
  // 检查是否为固定位置组件
  const isFixedPosition = component.positionType === 'top' || component.positionType === 'bottom';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    data: {
      type: 'canvas-component',
      component,
      position: index,
    },
    disabled: isFixedPosition, // 禁用固定位置组件的拖拽
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = () => {
    selectComponent(component.id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateComponent(component.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(component.id);
  };
  
  // 获取位置类型的显示信息
  const getPositionInfo = () => {
    switch (component.positionType) {
      case 'top':
        return { label: t('fixedPosition.header') };
      case 'bottom':
        return { label: t('fixedPosition.footer') };
      default:
        return { label: component.type };
    }
  };
  
  const positionInfo = getPositionInfo();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative cursor-pointer
        ${isDragging ? 'opacity-50' : ''}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-1 hover:ring-primary/50'}
        ${isFixedPosition ? 'border-2 border-dashed border-muted-foreground/50' : ''}
        transition-all duration-200
      `}
      onClick={handleSelect}
    >
      {/* 组件内容 */}
      <div className="relative">
        <ComponentRenderer component={component} isPreview={true} previewMode={previewMode} />
        
        {/* 选中状态的覆盖层 */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        )}
      </div>

      {/* 工具栏 */}
      <div className={`
        absolute top-2 right-2 flex items-center gap-1 bg-background border rounded-lg shadow-sm z-50
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        transition-opacity duration-200
      `}>
        {/* 拖拽手柄 - 固定位置组件禁用 */}
        {!isFixedPosition && (
          <button
            {...attributes}
            {...listeners}
            className="p-2 hover:bg-accent rounded-md cursor-grab active:cursor-grabbing"
            title={t('actions.dragMove')}
          >
            <Grip className="w-4 h-4" />
          </button>
        )}
        
        {/* 固定位置指示器 */}
        {isFixedPosition && (
          <div 
            className="p-2 bg-muted rounded-md cursor-not-allowed opacity-60"
            title={`${t('fixedPosition.fixedComponent')} (${positionInfo.label})`}
          >
            <Grip className="w-4 h-4" />
          </div>
        )}

        {/* 设置按钮 */}
        <button
          onClick={handleSelect}
          className="p-2 hover:bg-accent rounded-md"
          title={t('actions.editProperties')}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* 复制按钮 */}
        <button
          onClick={handleDuplicate}
          className="p-2 hover:bg-accent rounded-md"
          title={t('actions.duplicateComponent')}
        >
          <Copy className="w-4 h-4" />
        </button>

        {/* 删除按钮 */}
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md"
          title={t('actions.deleteComponent')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* 组件标签（固定与非固定组件均显示文件名标识） */}
      {isSelected && (
        <div className={`
          absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white
          bg-primary shadow-sm z-50 pointer-events-none whitespace-nowrap
        `}>
          {component.type}
        </div>
      )}

      {/* 拖拽指示器 */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-primary bg-primary/10 rounded-lg" />
      )}
      
      {/* 固定位置组件的额外视觉提示 */}
      {isFixedPosition && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center text-white text-xs">
          📌
        </div>
      )}
    </div>
  );
}