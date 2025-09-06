# 拖拽式页面构建器设计方案

## 项目概述

基于现有的 SaaS 模板组件库，构建一个可视化的拖拽式页面编辑器，让用户无需编程知识即可快速创建专业的 Landing Page。

## 核心功能

### 1. 可视化拖拽编辑
- 组件面板：展示所有可用组件
- 拖拽画布：实时预览页面效果
- 属性编辑：动态配置组件属性
- 响应式预览：支持多设备尺寸预览

### 2. 组件管理
- 组件库：基于现有的 landing 组件
- 组件配置：每个组件的可编辑属性
- 组件预设：常用配置的快速应用
- 组件模板：预定义的组件组合

### 3. 代码生成
- React 代码生成：标准的 TSX 组件代码
- 翻译文件生成：多语言支持
- 路由配置：自动生成页面路由
- 样式优化：CSS 代码压缩和优化

## 技术架构

### 前端技术栈
```
├── 拖拽系统: @dnd-kit/core + @dnd-kit/sortable
├── 状态管理: zustand
├── 表单处理: react-hook-form + zod
├── UI 组件: shadcn/ui (现有)
├── 代码编辑: @monaco-editor/react
└── 预览系统: iframe + postMessage
```

### 数据结构设计
```typescript
// 页面组件定义
interface PageComponent {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  position: number;
  children?: PageComponent[];
}

// 页面布局定义
interface PageLayout {
  id: string;
  name: string;
  description: string;
  components: PageComponent[];
  metadata: PageMetadata;
  createdAt: Date;
  updatedAt: Date;
}

// 组件类型枚举
type ComponentType = 
  | 'hero-simple' 
  | 'hero-centered'
  | 'features-grid'
  | 'features-list'
  | 'stats-minimal'
  | 'stats-basic'
  | 'testimonials-simple'
  | 'testimonials-grid'
  | 'social-proof-avatars'
  | 'social-proof-logos'
  | 'cta-simple'
  | 'cta-centered';
```

## 实施计划

### 阶段一：基础架构 (第1-2周)

#### 1.1 项目结构搭建
```
src/
├── components/
│   ├── page-builder/
│   │   ├── Builder.tsx           # 主构建器组件
│   │   ├── ComponentPanel.tsx    # 组件面板
│   │   ├── Canvas.tsx            # 拖拽画布
│   │   ├── PropertyPanel.tsx     # 属性编辑面板
│   │   └── PreviewPanel.tsx      # 预览面板
│   ├── drag-drop/
│   │   ├── DraggableComponent.tsx
│   │   ├── DroppableArea.tsx
│   │   └── DragOverlay.tsx
│   └── forms/
│       ├── ComponentForm.tsx     # 动态组件表单
│       └── PropertyEditor.tsx    # 属性编辑器
├── stores/
│   ├── page-builder.ts          # 页面构建器状态
│   └── component-registry.ts    # 组件注册表
├── utils/
│   ├── component-registry.ts    # 组件注册工具
│   ├── code-generator.ts        # 代码生成工具
│   └── schema-validator.ts      # 配置验证工具
└── types/
    ├── page-builder.ts          # 构建器类型定义
    └── component-schema.ts      # 组件配置模式
```

#### 1.2 核心类型定义
```typescript
// src/types/page-builder.ts
export interface ComponentSchema {
  type: string;
  name: string;
  description: string;
  category: 'hero' | 'features' | 'stats' | 'testimonials' | 'social-proof' | 'cta';
  icon: string;
  defaultProps: Record<string, any>;
  propSchema: JSONSchema7;
  preview: string; // 预览图片URL
}

export interface BuilderState {
  currentLayout: PageLayout | null;
  selectedComponent: string | null;
  draggedComponent: ComponentSchema | null;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  isPreviewMode: boolean;
}
```

#### 1.3 组件注册系统
```typescript
// src/utils/component-registry.ts
import { ComponentSchema } from '@/types/page-builder';

class ComponentRegistry {
  private components = new Map<string, ComponentSchema>();

  register(schema: ComponentSchema) {
    this.components.set(schema.type, schema);
  }

  get(type: string): ComponentSchema | undefined {
    return this.components.get(type);
  }

  getAll(): ComponentSchema[] {
    return Array.from(this.components.values());
  }

  getByCategory(category: string): ComponentSchema[] {
    return this.getAll().filter(comp => comp.category === category);
  }
}

export const componentRegistry = new ComponentRegistry();
```

### 阶段二：拖拽功能实现 (第3-4周)

#### 2.1 拖拽系统搭建
```typescript
// src/components/page-builder/Builder.tsx
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export function PageBuilder() {
  const { layout, addComponent, moveComponent, selectComponent } = usePageBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current?.type === 'component') {
      // 从组件面板拖拽到画布
      addComponent(active.data.current.schema, over.data.current?.index);
    } else {
      // 画布内组件重排序
      moveComponent(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <ComponentPanel />
        <Canvas />
        <PropertyPanel />
      </div>
    </DndContext>
  );
}
```

#### 2.2 组件面板实现
```typescript
// src/components/page-builder/ComponentPanel.tsx
export function ComponentPanel() {
  const components = componentRegistry.getAll();
  const categories = ['hero', 'features', 'stats', 'testimonials', 'social-proof', 'cta'];

  return (
    <div className="w-80 bg-background border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">组件库</h2>
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">
              {getCategoryName(category)}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {componentRegistry.getByCategory(category).map(component => (
                <DraggableComponentCard key={component.type} schema={component} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 2.3 画布实现
```typescript
// src/components/page-builder/Canvas.tsx
export function Canvas() {
  const { layout, selectedComponent } = usePageBuilder();

  return (
    <div className="flex-1 bg-gray-50">
      <div className="h-full overflow-auto">
        <SortableContext 
          items={layout?.components.map(c => c.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="min-h-full bg-white shadow-sm mx-4 my-4">
            {layout?.components.map(component => (
              <SortableComponent 
                key={component.id} 
                component={component}
                isSelected={selectedComponent === component.id}
              />
            ))}
            <DropZone />
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
```

### 阶段三：属性编辑系统 (第5-6周)

#### 3.1 动态表单生成
```typescript
// src/components/forms/ComponentForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function ComponentForm({ component, onUpdate }: ComponentFormProps) {
  const schema = componentRegistry.get(component.type);
  const zodSchema = jsonSchemaToZod(schema?.propSchema);
  
  const form = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: component.props
  });

  const onSubmit = (data: any) => {
    onUpdate(component.id, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {renderFormFields(schema?.propSchema, form)}
        <Button type="submit">更新组件</Button>
      </form>
    </Form>
  );
}
```

#### 3.2 属性编辑面板
```typescript
// src/components/page-builder/PropertyPanel.tsx
export function PropertyPanel() {
  const { selectedComponent, layout, updateComponent } = usePageBuilder();
  
  const component = layout?.components.find(c => c.id === selectedComponent);
  
  if (!component) {
    return (
      <div className="w-80 bg-background border-l p-4">
        <p className="text-muted-foreground">选择一个组件来编辑属性</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background border-l">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">属性编辑</h2>
        <ComponentForm 
          component={component} 
          onUpdate={updateComponent}
        />
      </div>
    </div>
  );
}
```

### 阶段四：预览和代码生成 (第7-8周)

#### 4.1 实时预览系统
```typescript
// src/components/page-builder/PreviewPanel.tsx
export function PreviewPanel() {
  const { layout, previewMode } = usePageBuilder();
  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    if (layout) {
      const html = generatePreviewHtml(layout);
      setPreviewHtml(html);
    }
  }, [layout]);

  const deviceSizes = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' }
  };

  return (
    <div className="flex-1 bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-sm h-full">
        <div 
          className="mx-auto transition-all duration-300"
          style={deviceSizes[previewMode]}
        >
          <iframe
            srcDoc={previewHtml}
            className="w-full h-full border-0 rounded-lg"
            title="页面预览"
          />
        </div>
      </div>
    </div>
  );
}
```

#### 4.2 代码生成器
```typescript
// src/utils/code-generator.ts
export class CodeGenerator {
  generatePageCode(layout: PageLayout): string {
    const imports = this.generateImports(layout);
    const component = this.generateComponent(layout);
    
    return `${imports}\n\n${component}`;
  }

  private generateImports(layout: PageLayout): string {
    const componentTypes = layout.components.map(c => c.type);
    const uniqueTypes = [...new Set(componentTypes)];
    
    return uniqueTypes.map(type => {
      const componentName = this.getComponentName(type);
      const importPath = this.getImportPath(type);
      return `import { ${componentName} } from '${importPath}';`;
    }).join('\n');
  }

  private generateComponent(layout: PageLayout): string {
    const componentName = `${layout.name}Page`;
    const components = layout.components.map(c => 
      this.generateComponentJSX(c)
    ).join('\n      ');

    return `
export function ${componentName}() {
  return (
    <div className="min-h-screen">
      ${components}
    </div>
  );
}`;
  }

  private generateComponentJSX(component: PageComponent): string {
    const ComponentName = this.getComponentName(component.type);
    const props = this.generateProps(component.props);
    
    return `<${ComponentName}${props} />`;
  }
}
```

### 阶段五：完善和优化 (第9-10周)

#### 5.1 模板系统
```typescript
// src/stores/template-store.ts
interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  layout: PageLayout;
  thumbnail: string;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  
  saveAsTemplate: (layout: PageLayout, metadata: TemplateMetadata) => {
    const template: PageTemplate = {
      id: generateId(),
      ...metadata,
      layout,
      thumbnail: generateThumbnail(layout)
    };
    
    set(state => ({
      templates: [...state.templates, template]
    }));
  },
  
  loadTemplate: (templateId: string) => {
    const template = get().templates.find(t => t.id === templateId);
    if (template) {
      return template.layout;
    }
  }
}));
```

#### 5.2 撤销/重做功能
```typescript
// src/stores/history-store.ts
export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  currentIndex: -1,
  
  pushState: (layout: PageLayout) => {
    const { history, currentIndex } = get();
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(layout);
    
    set({
      history: newHistory,
      currentIndex: newHistory.length - 1
    });
  },
  
  undo: () => {
    const { history, currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
      return history[currentIndex - 1];
    }
  },
  
  redo: () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      set({ currentIndex: currentIndex + 1 });
      return history[currentIndex + 1];
    }
  }
}));
```

## 组件配置模式

### Hero 组件配置
```typescript
const heroSimpleSchema: ComponentSchema = {
  type: 'hero-simple',
  name: '简洁英雄区域',
  description: '包含标题、副标题和行动按钮的简洁英雄区域',
  category: 'hero',
  icon: '🏠',
  defaultProps: {
    title: '构建现代化 SaaS 应用',
    subtitle: '快速、安全、可扩展的解决方案',
    primaryButtonText: '立即开始',
    secondaryButtonText: '了解更多',
    showSecondaryButton: true,
    backgroundVariant: 'default'
  },
  propSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: '主标题' },
      subtitle: { type: 'string', title: '副标题' },
      primaryButtonText: { type: 'string', title: '主按钮文本' },
      secondaryButtonText: { type: 'string', title: '次按钮文本' },
      showSecondaryButton: { type: 'boolean', title: '显示次按钮' },
      backgroundVariant: {
        type: 'string',
        enum: ['default', 'gradient', 'pattern'],
        title: '背景样式'
      }
    }
  },
  preview: '/images/components/hero-simple-preview.png'
};
```

### Features 组件配置
```typescript
const featuresGridSchema: ComponentSchema = {
  type: 'features-grid',
  name: '功能网格',
  description: '以网格形式展示产品功能特性',
  category: 'features',
  icon: '⭐',
  defaultProps: {
    title: '强大的功能特性',
    subtitle: '为您的业务提供全面的解决方案',
    features: [
      {
        title: '高性能',
        description: '优化的代码和架构确保最佳性能',
        icon: 'zap'
      },
      {
        title: '安全可靠',
        description: '企业级安全标准保护您的数据',
        icon: 'shield'
      },
      {
        title: '易于使用',
        description: '直观的界面设计，快速上手',
        icon: 'heart'
      }
    ],
    columns: 3,
    showIcons: true
  },
  propSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: '标题' },
      subtitle: { type: 'string', title: '副标题' },
      columns: { 
        type: 'number', 
        minimum: 1, 
        maximum: 4, 
        title: '列数' 
      },
      showIcons: { type: 'boolean', title: '显示图标' },
      features: {
        type: 'array',
        title: '功能列表',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', title: '功能标题' },
            description: { type: 'string', title: '功能描述' },
            icon: { type: 'string', title: '图标名称' }
          }
        }
      }
    }
  },
  preview: '/images/components/features-grid-preview.png'
};
```

## 部署和集成

### 路由配置
```typescript
// src/app/[locale]/page-builder/page.tsx
export default function PageBuilderPage() {
  return (
    <div className="h-screen">
      <PageBuilder />
    </div>
  );
}

// src/app/[locale]/preview/[id]/page.tsx
export default function PreviewPage({ params }: { params: { id: string } }) {
  const layout = getLayoutById(params.id);
  
  if (!layout) {
    notFound();
  }
  
  return <GeneratedPage layout={layout} />;
}
```

### API 端点
```typescript
// src/app/api/page-builder/layouts/route.ts
export async function POST(request: Request) {
  const layout = await request.json();
  const savedLayout = await saveLayout(layout);
  return Response.json(savedLayout);
}

export async function GET() {
  const layouts = await getLayouts();
  return Response.json(layouts);
}

// src/app/api/page-builder/generate/route.ts
export async function POST(request: Request) {
  const { layoutId, options } = await request.json();
  const layout = await getLayoutById(layoutId);
  
  const code = codeGenerator.generatePageCode(layout);
  const translations = codeGenerator.generateTranslations(layout);
  
  return Response.json({ code, translations });
}
```

## 成功指标

### 技术指标
- ✅ 组件加载时间 < 100ms
- ✅ 拖拽响应延迟 < 50ms  
- ✅ 代码生成时间 < 2s
- ✅ 预览渲染时间 < 500ms

### 用户体验指标
- ✅ 学习成本：5分钟内上手
- ✅ 创建效率：10分钟内完成页面
- ✅ 代码质量：通过 ESLint 和 TypeScript 检查
- ✅ 响应式兼容：支持所有主流设备

## 后续扩展

### 高级功能
1. **动画编辑器**: 可视化配置组件动画
2. **主题编辑器**: 自定义颜色和字体
3. **A/B 测试**: 多版本页面对比
4. **数据绑定**: 连接外部数据源
5. **插件系统**: 第三方组件扩展

### 商业化功能
1. **模板市场**: 付费模板和组件
2. **团队协作**: 多人编辑和版本控制
3. **部署集成**: 一键部署到各大平台
4. **分析集成**: 页面性能和用户行为分析

这个方案将为用户提供一个强大而易用的页面构建工具，大大降低创建专业 Landing Page 的门槛。