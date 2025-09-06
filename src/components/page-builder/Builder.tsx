'use client';

import React, { useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslations } from 'next-intl';
import { useBuilderStore } from '@/stores/page-builder/builder-store';
import { ComponentPanel } from './ComponentPanel';
import { Canvas } from './Canvas';
import { PreviewPanel } from './PreviewPanel';
import { Toolbar } from './Toolbar';
import { RightPanel } from './RightPanel';
import { generateId } from '@/utils/page-builder/helpers';
import { PageComponent } from '@/types/page-builder';
import { initializePageBuilder } from '@/utils/page-builder/init';
import { componentRegistry } from '@/utils/page-builder/component-registry';

interface BuilderProps {
  className?: string;
}

export function Builder({ className }: BuilderProps) {
  const t = useTranslations('page-builder');
  const {
    currentLayout,
    selectedComponent,
    draggedComponent,
    addComponent,
    moveComponent,
    selectComponent,
    setDraggedComponent,
    isPreviewMode,
    createNewLayout,
    showComponentPanel,
    showPropertiesPanel,
  } = useBuilderStore();

  // 初始化页面构建器
  useEffect(() => {
    initializePageBuilder();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    if (active.data.current?.type === 'component-template') {
      // 从组件面板拖拽
      const componentConfig = componentRegistry.get(active.id as string);
      if (componentConfig) {
        setDraggedComponent(componentConfig);
      }
    } else if (active.data.current?.type === 'canvas-component') {
      // 从画布拖拽 - 需要将PageComponent转换为ComponentSchema格式
      const component = currentLayout?.components.find(c => c.id === active.id);
      if (component) {
        // 从组件注册表获取组件配置信息
        const componentConfig = componentRegistry.get(component.type);
        if (componentConfig) {
          setDraggedComponent({
            ...componentConfig,
            defaultProps: component.props, // 使用当前组件的属性作为默认属性
          });
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // 处理拖拽悬停逻辑
    // 可以在这里添加视觉反馈
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !currentLayout) {
      setDraggedComponent(null);
      return;
    }

    if (active.data.current?.type === 'component-template') {
      // 从组件面板添加新组件
      const schema = {
        type: active.id as string,
        name: active.id as string,
        displayName: active.id as string,
        description: '',
        category: 'layout' as any,
        icon: '',
        defaultProps: active.data.current.defaultProps || {},
        propSchema: { type: 'object' as const, properties: {}, required: [] },
        preview: '',
        thumbnail: '',
        tags: [],
        version: '1.0.0',
        positionType: active.data.current.positionType || 'flexible'
      };
      
      let targetPosition = currentLayout.components.length;
      
      // 根据组件类型确定插入位置
      const componentConfig = componentRegistry.get(active.id as string);
      if (componentConfig?.positionType === 'top') {
        // Header组件始终在顶部
        targetPosition = 0;
      } else if (componentConfig?.positionType === 'bottom') {
        // Footer组件始终在底部
        targetPosition = currentLayout.components.length;
      } else if (over.data.current?.type === 'canvas-component') {
        // 普通组件可以拖拽到指定位置
        const targetComponent = currentLayout.components.find(c => c.id === over.id);
        if (targetComponent && targetComponent.positionType !== 'top' && targetComponent.positionType !== 'bottom') {
          targetPosition = targetComponent.position + 1;
        }
      }
      
      addComponent({...schema, positionType: componentConfig?.positionType || 'flexible'}, targetPosition);
    } else if (active.data.current?.type === 'canvas-component' && over.data.current?.type === 'canvas-component') {
      // 在画布内移动组件 - 只有当拖拽到另一个组件上时才移动
      if (active.id !== over.id) {
        const activeComponent = currentLayout.components.find(c => c.id === active.id);
        const overComponent = currentLayout.components.find(c => c.id === over.id);
        
        if (activeComponent && overComponent) {
          // 只有flexible组件可以被移动
          if (activeComponent.positionType === 'top' || activeComponent.positionType === 'bottom') {
            console.warn('Fixed position components cannot be moved');
            setDraggedComponent(null);
            return;
          }
          
          // 计算新位置：如果向下拖拽，插入到目标组件之后；如果向上拖拽，插入到目标组件之前
          const activeIndex = activeComponent.position;
          const overIndex = overComponent.position;
          const newPosition = activeIndex < overIndex ? overIndex : overIndex;
          
          moveComponent(active.id as string, newPosition);
        }
      }
    } else if (active.data.current?.type === 'canvas-component' && over.id === 'canvas') {
      // 拖拽到空画布区域，移动到最后
      const activeComponent = currentLayout.components.find(c => c.id === active.id);
      if (activeComponent && activeComponent.positionType !== 'top' && activeComponent.positionType !== 'bottom') {
        moveComponent(active.id as string, currentLayout.components.length - 1);
      }
    }

    setDraggedComponent(null);
  };

  const handleDragCancel = () => {
    setDraggedComponent(null);
  };

  if (!currentLayout) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('welcome.title')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('welcome.description')}
          </p>
          <button
            onClick={() => {
              createNewLayout(t('welcome.defaultPageName'), t('welcome.defaultPageDescription'));
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            {t('welcome.createNewPage')}
          </button>
        </div>
      </div>
    );
  }

  if (isPreviewMode) {
    return (
      <div className={className}>
        <PreviewPanel />
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={`flex h-screen bg-background ${className}`}>
        {/* 左侧组件面板 - 可折叠 */}
        {showComponentPanel && (
          <div className="w-72 border-r bg-card flex-shrink-0 transition-all duration-300">
            <ComponentPanel />
          </div>
        )}

        {/* 中间画布区域 - 动态宽度 */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* 工具栏 */}
          <div className="border-b bg-card">
            <Toolbar />
          </div>

          {/* 画布 */}
          <div className="flex-1 overflow-auto">
            <SortableContext
              items={currentLayout.components.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <Canvas />
            </SortableContext>
          </div>
        </div>

        {/* 右侧面板 - 可折叠 */}
        {showPropertiesPanel && (
          <div className="w-96 flex-shrink-0 transition-all duration-300">
            <RightPanel className="w-full" />
          </div>
        )}
      </div>
    </DndContext>
  );
}