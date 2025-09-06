import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { 
  BuilderState, 
  PageLayout, 
  PageComponent, 
  ComponentSchema, 
  PreviewMode,
  ComponentAction
} from '@/types/page-builder';
import { componentRegistry } from '@/utils/page-builder/component-registry';
import { generateId } from '@/utils/page-builder/helpers';

interface BuilderActions {
  // 布局操作
  setCurrentLayout: (layout: PageLayout | null) => void;
  createNewLayout: (name: string, description?: string) => void;
  updateLayoutMetadata: (metadata: Partial<PageLayout['metadata']>) => void;
  
  // 组件操作
  addComponent: (schema: ComponentSchema, position?: number) => void;
  addComponentWithConfirmation: (schema: ComponentSchema, position?: number) => Promise<boolean>;
  removeComponent: (componentId: string) => void;
  updateComponent: (componentId: string, props: Record<string, any>) => void;
  moveComponent: (componentId: string, newPosition: number) => void;
  duplicateComponent: (componentId: string) => void;
  
  // 选择操作
  selectComponent: (componentId: string | null) => void;
  
  // 拖拽操作
  setDraggedComponent: (schema: ComponentSchema | null) => void;
  
  // 预览操作
  setPreviewMode: (mode: PreviewMode) => void;
  togglePreviewMode: () => void;
  
  // 界面设置
  toggleComponentBorders: () => void;
  toggleAutoSave: () => void;
  toggleComponentPanel: () => void;
  togglePropertiesPanel: () => void;
  
  // 重置操作
  reset: () => void;
  
  // 保存操作
  saveLayout: (layout: PageLayout) => void;
  loadLayout: (layoutId: string) => PageLayout | null;
  getSavedLayouts: () => PageLayout[];
  deleteLayout: (layoutId: string) => void;
  clearLayout: () => void;
}

interface BuilderStore extends BuilderState, BuilderActions {
  // 剪贴板
  clipboard: PageComponent | null;
  // 辅助方法
  isTextProperty: (key: string) => boolean;
  getComponentTranslationFile: (componentType: string) => string;
}

const initialState: BuilderState = {
  currentLayout: null,
  selectedComponent: null,
  draggedComponent: null,
  previewMode: 'desktop',
  isPreviewMode: false,
  showComponentBorders: true,
  autoSave: true,
  showComponentPanel: true,
  showPropertiesPanel: true,
};

export const useBuilderStore = create<BuilderStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...initialState,
      clipboard: null,

      // 布局操作
      setCurrentLayout: (layout) => {
        set({ currentLayout: layout, selectedComponent: null });
      },

      createNewLayout: (name, description = '') => {
        const newLayout: PageLayout = {
          id: generateId(),
          name,
          description,
          components: [],
          metadata: {
            title: name,
            description,
            keywords: [],
            locale: 'zh',
            tags: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set({ currentLayout: newLayout, selectedComponent: null });
      },

      updateLayoutMetadata: (metadata) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const updatedLayout = {
          ...currentLayout,
          metadata: { ...currentLayout.metadata, ...metadata },
          updatedAt: new Date(),
        };
        
        set({ currentLayout: updatedLayout });
      },

      // 组件操作
      addComponent: (schema, position) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const newComponent: PageComponent = {
          id: generateId(),
          type: schema.type as any,
          props: { ...schema.defaultProps },
          position: position ?? currentLayout.components.length,
          positionType: schema.positionType || 'flexible',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        let components = [...currentLayout.components];
        
        // 根据组件的固定位置类型确定插入位置
        if (newComponent.positionType === 'top') {
          // Header组件放在所有top组件的最后，但在flexible组件之前
          const topComponents = components.filter(c => c.positionType === 'top');
          const otherComponents = components.filter(c => c.positionType !== 'top');
          components = [...topComponents, newComponent, ...otherComponents];
        } else if (newComponent.positionType === 'bottom') {
          // Footer组件放在所有bottom组件的最前，但在flexible组件之后
          const bottomComponents = components.filter(c => c.positionType === 'bottom');
          const otherComponents = components.filter(c => c.positionType !== 'bottom');
          components = [...otherComponents, newComponent, ...bottomComponents];
        } else {
          // 灵活组件按指定位置插入到flexible区域
          const topComponents = components.filter(c => c.positionType === 'top');
          const bottomComponents = components.filter(c => c.positionType === 'bottom');
          const flexibleComponents = components.filter(c => c.positionType === 'flexible' || !c.positionType);
          
          if (position !== undefined && position <= flexibleComponents.length) {
            flexibleComponents.splice(position, 0, newComponent);
          } else {
            flexibleComponents.push(newComponent);
          }
          
          components = [...topComponents, ...flexibleComponents, ...bottomComponents];
        }
        
        // 重新计算所有组件的位置索引
        components.forEach((comp, index) => {
          comp.position = index;
        });
        
        const updatedLayout = {
          ...currentLayout,
          components,
          updatedAt: new Date(),
        };
        
        set({ 
          currentLayout: updatedLayout,
          selectedComponent: newComponent.id 
        });
      },

      addComponentWithConfirmation: async (schema, position) => {
        // 这是一个占位符实现，可以根据需要添加确认逻辑
        const { addComponent } = get();
        addComponent(schema, position);
        return true;
      },

      removeComponent: (componentId) => {
        const { currentLayout, selectedComponent } = get();
        if (!currentLayout) return;
        
        const components = currentLayout.components
          .filter(comp => comp.id !== componentId)
          .map((comp, index) => ({ ...comp, position: index }));
        
        const updatedLayout = {
          ...currentLayout,
          components,
          updatedAt: new Date(),
        };
        
        set({ 
          currentLayout: updatedLayout,
          selectedComponent: selectedComponent === componentId ? null : selectedComponent
        });
      },

      updateComponent: (componentId, props) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const components = currentLayout.components.map(comp =>
          comp.id === componentId
            ? { ...comp, props: { ...comp.props, ...props }, updatedAt: new Date() }
            : comp
        );
        
        const updatedLayout = {
          ...currentLayout,
          components,
          updatedAt: new Date(),
        };
        
        set({ currentLayout: updatedLayout });
      },

      moveComponent: (componentId, newPosition) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const components = [...currentLayout.components];
        const componentIndex = components.findIndex(comp => comp.id === componentId);
        
        if (componentIndex === -1) return;
        
        const movedComponent = components[componentIndex];
        
        // 如果是固定位置组件，直接返回，不允许移动
        if (movedComponent.positionType === 'top' || movedComponent.positionType === 'bottom') {
          console.warn(`Fixed position component (${movedComponent.positionType === 'top' ? 'Header' : 'Footer'}) cannot be moved`);
          return;
        }
        
        // 只有flexible组件才能自由移动
        const topComponents = components.filter(c => c.positionType === 'top');
        const bottomComponents = components.filter(c => c.positionType === 'bottom');
        const flexibleComponents = components.filter(c => 
          (c.positionType === 'flexible' || !c.positionType) && c.id !== componentId
        );
        
        // 计算在flexible区域内的新位置
        const flexibleNewPosition = Math.max(0, Math.min(newPosition - topComponents.length, flexibleComponents.length));
        flexibleComponents.splice(flexibleNewPosition, 0, movedComponent);
        
        // 重新组合组件数组
        const newComponents = [...topComponents, ...flexibleComponents, ...bottomComponents];
        
        // 更新所有组件的位置
        newComponents.forEach((comp, index) => {
          comp.position = index;
        });
        
        const updatedLayout = {
          ...currentLayout,
          components: newComponents,
          updatedAt: new Date(),
        };
        
        set({ currentLayout: updatedLayout });
      },

      duplicateComponent: (componentId) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const originalComponent = currentLayout.components.find(comp => comp.id === componentId);
        if (!originalComponent) return;
        
        const duplicatedComponent: PageComponent = {
          ...originalComponent,
          id: generateId(),
          position: originalComponent.position + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        const components = [...currentLayout.components];
        components.splice(originalComponent.position + 1, 0, duplicatedComponent);
        
        // 更新后续组件的位置
        components.forEach((comp, index) => {
          comp.position = index;
        });
        
        const updatedLayout = {
          ...currentLayout,
          components,
          updatedAt: new Date(),
        };
        
        set({ 
          currentLayout: updatedLayout,
          selectedComponent: duplicatedComponent.id 
        });
      },

      // 选择操作
      selectComponent: (componentId) => {
        set({ selectedComponent: componentId });
      },

      // 拖拽操作
      setDraggedComponent: (schema) => {
        set({ draggedComponent: schema });
      },

      // 预览操作
      setPreviewMode: (mode) => {
        set({ previewMode: mode });
      },

      togglePreviewMode: () => {
        set(state => ({ isPreviewMode: !state.isPreviewMode }));
      },

      // 界面设置
      toggleComponentBorders: () => {
        set(state => ({ showComponentBorders: !state.showComponentBorders }));
      },

      toggleAutoSave: () => {
        set(state => ({ autoSave: !state.autoSave }));
      },

      toggleComponentPanel: () => {
        set(state => ({ showComponentPanel: !state.showComponentPanel }));
      },

      togglePropertiesPanel: () => {
        set(state => ({ showPropertiesPanel: !state.showPropertiesPanel }));
      },

      // 重置操作
      reset: () => {
        set({
          ...initialState,
          clipboard: null,
        });
      },

      // 保存操作 - 保存TSX文件到项目目录
      saveLayout: async (layout) => {
        try {
          // 生成TSX文件内容
          const generateTSXContent = (layout: PageLayout) => {
            const imports = new Set<string>();
            imports.add(`import { useTranslations } from 'next-intl';`);
            
            const componentCode = layout.components.map(component => {
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
                default:
                  // 对于其他组件，使用原有的命名规则
                  componentName = component.type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join('');
                  importPath = `@/components/landing/${component.type.split('-')[0]}/${component.type}`;
              }
              
              imports.add(`import { ${componentName} } from '${importPath}';`);
              
              // 生成组件翻译键
              const translationKey = `${component.type}_${component.id}`;
              const componentTranslationFile = get().getComponentTranslationFile(component.type);
              
              // 生成组件JSX，使用翻译键而不是硬编码值
              const propsWithTranslation = Object.entries(component.props)
                .filter(([key, value]) => value !== undefined && value !== null)
                .map(([key, value]) => {
                  // 对于文本属性，使用翻译键
                  if (typeof value === 'string' && get().isTextProperty(key)) {
                    return `\n        ${key}={t('${componentTranslationFile}.${translationKey}.${key}')}`;
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
              
              return `      <${componentName}${propsWithTranslation}${propsWithTranslation ? '\n      ' : ' '}/>`;
            }).join('\n\n');

            return `'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
${Array.from(imports).join('\n')}

/**
 * ${layout.name}
 * ${layout.description}
 * 
 * 由页面构建器生成于: ${new Date().toLocaleString('zh-CN')}
 * 组件数量: ${layout.components.length}
 * 
 * 注意：此页面使用 next-intl 进行国际化
 * 翻译文件位于: messages/[locale]/
 */
export default function ${layout.name.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
${componentCode}
    </div>
  );
}`;
          };

          const tsxContent = generateTSXContent(layout);
          
          // 生成文件名（安全的文件名）
          const safeFileName = layout.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase();
          const fileName = `${safeFileName}-${Date.now()}.tsx`;
          
          // 调用API保存文件到项目目录
          const response = await fetch('/api/page-builder/save-file', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName,
              content: tsxContent,
              directory: 'public/generated-pages', // 保存到public/generated-pages目录
              metadata: {
                layoutId: layout.id,
                layoutName: layout.name,
                componentCount: layout.components.length,
                createdAt: new Date().toISOString(),
              }
            }),
          });

          if (!response.ok) {
            throw new Error(`保存失败: ${response.statusText}`);
          }

          const result = await response.json();
          
          // 同时保存布局信息到localStorage作为备份
          const savedLayoutsStr = localStorage.getItem('page-builder-saved-layouts');
          const savedLayouts: PageLayout[] = savedLayoutsStr ? JSON.parse(savedLayoutsStr) : [];
          
          const updatedLayout = {
            ...layout,
            updatedAt: new Date(),
            savedFilePath: result.filePath, // 保存文件路径信息
          };
          
          const existingIndex = savedLayouts.findIndex(saved => saved.id === layout.id);
          if (existingIndex >= 0) {
            savedLayouts[existingIndex] = updatedLayout;
          } else {
            savedLayouts.push(updatedLayout);
          }
          
          localStorage.setItem('page-builder-saved-layouts', JSON.stringify(savedLayouts));
          
          console.log(`TSX文件已保存到: ${result.filePath}`);
          return { success: true, filePath: result.filePath, fileName };
        } catch (error) {
          console.error('保存TSX文件失败:', error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : '保存失败，未知错误' 
          };
        }
      },

      loadLayout: (layoutId) => {
        try {
          const savedLayoutsStr = localStorage.getItem('page-builder-saved-layouts');
          if (!savedLayoutsStr) return null;
          
          const savedLayouts: PageLayout[] = JSON.parse(savedLayoutsStr);
          const layout = savedLayouts.find(saved => saved.id === layoutId);
          
          if (layout) {
            set({ currentLayout: layout, selectedComponent: null });
            return layout;
          }
          
          return null;
        } catch (error) {
          console.error('加载布局失败:', error);
          return null;
        }
      },

      getSavedLayouts: () => {
        try {
          const savedLayoutsStr = localStorage.getItem('page-builder-saved-layouts');
          return savedLayoutsStr ? JSON.parse(savedLayoutsStr) : [];
        } catch (error) {
          console.error('获取保存的布局失败:', error);
          return [];
        }
      },

      deleteLayout: (layoutId) => {
        try {
          const savedLayoutsStr = localStorage.getItem('page-builder-saved-layouts');
          if (!savedLayoutsStr) return;
          
          const savedLayouts: PageLayout[] = JSON.parse(savedLayoutsStr);
          const filteredLayouts = savedLayouts.filter(layout => layout.id !== layoutId);
          
          localStorage.setItem('page-builder-saved-layouts', JSON.stringify(filteredLayouts));
          console.log(`布局已删除: ${layoutId}`);
        } catch (error) {
          console.error('删除布局失败:', error);
        }
      },

      clearLayout: () => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const clearedLayout = {
          ...currentLayout,
          components: [],
          updatedAt: new Date(),
        };
        
        set({ 
          currentLayout: clearedLayout,
          selectedComponent: null 
        });
      },

      // 辅助方法：判断属性是否为文本属性
      isTextProperty: (key: string): boolean => {
        const textProperties = [
          'title', 'subtitle', 'description', 'content', 'text',
          'primaryButtonText', 'secondaryButtonText', 'buttonText',
          'label', 'placeholder', 'heading', 'subheading',
          'caption', 'tagline', 'motto', 'slogan'
        ];
        return textProperties.includes(key);
      },

      // 辅助方法：获取组件翻译文件名
      getComponentTranslationFile: (componentType: string): string => {
        const typeMapping: Record<string, string> = {
          'hero-simple': 'hero',
          'hero-centered': 'hero',
          'header-basic': 'header',
          'footer-basic': 'footer',
          'features-grid': 'features',
          'features-list': 'features',
          'stats-minimal': 'stats',
          'stats-basic': 'stats',
          'testimonials-simple': 'testimonials',
          'testimonials-grid': 'testimonials',
          'social-proof-avatars': 'social-proof',
          'social-proof-logos': 'social-proof',
        };
        
        return typeMapping[componentType] || componentType.split('-')[0];
      },
    })),
    {
      name: 'page-builder-store',
    }
  )
);

// 自动保存功能
useBuilderStore.subscribe(
  (state) => state.currentLayout,
  (currentLayout) => {
    const { autoSave } = useBuilderStore.getState();
    if (autoSave && currentLayout) {
      // 这里可以实现自动保存到本地存储或服务器
      localStorage.setItem('page-builder-autosave', JSON.stringify(currentLayout));
    }
  }
);