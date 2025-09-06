# 拖拽式页面构建器实施步骤

## 第一阶段：基础架构搭建 (第1-2周)

### 第1天：项目结构和类型定义

#### 1. 创建项目目录结构
```bash
mkdir -p src/components/page-builder
mkdir -p src/components/drag-drop  
mkdir -p src/components/forms
mkdir -p src/stores
mkdir -p src/utils/page-builder
mkdir -p src/types/page-builder
mkdir -p src/hooks/page-builder
```

#### 2. 核心类型定义
- [ ] 创建 `src/types/page-builder/index.ts`
- [ ] 定义 `PageComponent` 接口
- [ ] 定义 `PageLayout` 接口  
- [ ] 定义 `ComponentSchema` 接口
- [ ] 定义 `BuilderState` 接口

#### 3. 组件注册系统
- [ ] 创建 `src/utils/page-builder/component-registry.ts`
- [ ] 实现组件注册类
- [ ] 创建组件配置模式

### 第2-3天：状态管理系统

#### 1. 页面构建器状态管理
- [ ] 创建 `src/stores/page-builder.ts`
- [ ] 实现 Zustand store
- [ ] 添加组件操作方法（增删改查）
- [ ] 添加选择和拖拽状态管理

#### 2. 历史记录系统
- [ ] 创建 `src/stores/history.ts`
- [ ] 实现撤销/重做功能
- [ ] 集成到主状态管理中

### 第4-5天：基础UI组件

#### 1. 主构建器组件
- [ ] 创建 `src/components/page-builder/Builder.tsx`
- [ ] 实现基础布局（三栏式）
- [ ] 集成状态管理

#### 2. 组件面板
- [ ] 创建 `src/components/page-builder/ComponentPanel.tsx`
- [ ] 实现组件分类展示
- [ ] 添加搜索和过滤功能

#### 3. 画布组件
- [ ] 创建 `src/components/page-builder/Canvas.tsx`
- [ ] 实现基础画布布局
- [ ] 添加空状态提示

### 第6-7天：拖拽系统基础

#### 1. 安装和配置拖拽库
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

#### 2. 拖拽组件实现
- [ ] 创建 `src/components/drag-drop/DraggableComponent.tsx`
- [ ] 创建 `src/components/drag-drop/DroppableArea.tsx`
- [ ] 创建 `src/components/drag-drop/DragOverlay.tsx`

#### 3. 集成拖拽功能
- [ ] 在 Builder 中集成 DndContext
- [ ] 实现基础拖拽事件处理
- [ ] 添加拖拽视觉反馈

## 第二阶段：组件注册和渲染 (第3-4周)

### 第8-10天：组件注册系统

#### 1. 现有组件分析和注册
- [ ] 分析现有 landing 组件
- [ ] 为每个组件创建配置模式
- [ ] 注册 Hero 组件（hero-simple, hero-centered）
- [ ] 注册 Features 组件（features-grid, features-list）
- [ ] 注册 Stats 组件（stats-minimal, stats-basic）

#### 2. 组件预览系统
- [ ] 创建组件预览图片
- [ ] 实现预览图片生成工具
- [ ] 添加组件描述和分类

### 第11-12天：动态组件渲染

#### 1. 组件渲染器
- [ ] 创建 `src/components/page-builder/ComponentRenderer.tsx`
- [ ] 实现动态组件渲染逻辑
- [ ] 添加组件包装器（选择、删除、复制功能）

#### 2. 画布增强
- [ ] 实现组件在画布中的渲染
- [ ] 添加组件选择状态
- [ ] 实现组件边框和操作按钮

### 第13-14天：拖拽功能完善

#### 1. 拖拽交互优化
- [ ] 实现从组件面板到画布的拖拽
- [ ] 实现画布内组件重排序
- [ ] 添加拖拽预览效果
- [ ] 实现拖拽取消功能

#### 2. 用户体验优化
- [ ] 添加拖拽指示器
- [ ] 实现自动滚动
- [ ] 添加拖拽音效和动画

## 第三阶段：属性编辑系统 (第5-6周)

### 第15-17天：动态表单系统

#### 1. JSON Schema 到表单转换
- [ ] 安装表单相关依赖
```bash
npm install react-hook-form @hookform/resolvers zod
npm install @types/json-schema
```

#### 2. 表单组件实现
- [ ] 创建 `src/components/forms/DynamicForm.tsx`
- [ ] 实现 JSON Schema 解析
- [ ] 创建各种表单控件（文本、数字、布尔、选择等）
- [ ] 实现数组和对象类型的编辑

#### 3. 属性编辑面板
- [ ] 创建 `src/components/page-builder/PropertyPanel.tsx`
- [ ] 集成动态表单
- [ ] 实现实时属性更新
- [ ] 添加属性重置功能

### 第18-19天：高级表单功能

#### 1. 复杂数据类型支持
- [ ] 实现数组项的增删改
- [ ] 支持嵌套对象编辑
- [ ] 添加条件显示逻辑

#### 2. 表单验证和错误处理
- [ ] 集成 Zod 验证
- [ ] 实现实时验证
- [ ] 添加错误提示UI

### 第20-21天：组件配置完善

#### 1. 完善所有组件的配置模式
- [ ] Testimonials 组件配置
- [ ] Social Proof 组件配置  
- [ ] CTA 组件配置
- [ ] 其他组件配置

#### 2. 预设配置系统
- [ ] 实现组件预设功能
- [ ] 创建常用配置模板
- [ ] 添加预设应用和保存

## 第四阶段：预览和代码生成 (第7-8周)

### 第22-24天：预览系统

#### 1. 实时预览实现
- [ ] 创建 `src/components/page-builder/PreviewPanel.tsx`
- [ ] 实现 iframe 预览
- [ ] 添加响应式预览切换
- [ ] 实现预览内容生成

#### 2. 预览功能增强
- [ ] 添加设备尺寸预设
- [ ] 实现预览缩放功能
- [ ] 添加预览刷新和重置

### 第25-26天：代码生成系统

#### 1. 代码生成器实现
- [ ] 创建 `src/utils/page-builder/code-generator.ts`
- [ ] 实现 React 组件代码生成
- [ ] 实现导入语句生成
- [ ] 实现 props 序列化

#### 2. 翻译文件生成
- [ ] 实现翻译文件生成逻辑
- [ ] 支持多语言代码生成
- [ ] 集成现有国际化系统

### 第27-28天：导出功能

#### 1. 代码导出实现
- [ ] 创建代码导出界面
- [ ] 实现文件打包下载
- [ ] 添加代码预览功能
- [ ] 支持不同导出格式

#### 2. 项目集成
- [ ] 实现直接应用到当前项目
- [ ] 创建新页面路由
- [ ] 更新导航配置

## 第五阶段：完善和优化 (第9-10周)

### 第29-31天：模板系统

#### 1. 模板管理
- [ ] 创建 `src/stores/template.ts`
- [ ] 实现模板保存和加载
- [ ] 创建模板库界面
- [ ] 添加模板分类和搜索

#### 2. 预设模板创建
- [ ] 创建常用页面模板
- [ ] 设计模板缩略图
- [ ] 实现模板预览功能

### 第32-33天：用户体验优化

#### 1. 快捷键支持
- [ ] 实现撤销/重做快捷键 (Ctrl+Z/Ctrl+Y)
- [ ] 添加复制/粘贴快捷键 (Ctrl+C/Ctrl+V)
- [ ] 实现删除快捷键 (Delete)
- [ ] 添加保存快捷键 (Ctrl+S)

#### 2. 界面优化
- [ ] 添加加载状态指示器
- [ ] 实现错误边界和错误处理
- [ ] 优化拖拽性能
- [ ] 添加操作提示和引导

### 第34-35天：高级功能

#### 1. 组件复制和粘贴
- [ ] 实现组件复制功能
- [ ] 支持跨页面粘贴
- [ ] 添加组件库收藏功能

#### 2. 批量操作
- [ ] 实现多选功能
- [ ] 支持批量删除
- [ ] 添加批量属性编辑

## 测试和部署阶段 (第11-12周)

### 第36-38天：测试

#### 1. 单元测试
- [ ] 为核心工具函数编写测试
- [ ] 测试状态管理逻辑
- [ ] 测试代码生成功能

#### 2. 集成测试
- [ ] 测试拖拽功能
- [ ] 测试属性编辑
- [ ] 测试预览和导出

#### 3. 端到端测试
- [ ] 使用 Playwright 编写 E2E 测试
- [ ] 测试完整的用户流程
- [ ] 性能测试和优化

### 第39-42天：文档和部署

#### 1. 用户文档
- [ ] 编写用户使用指南
- [ ] 创建视频教程
- [ ] 制作组件使用示例

#### 2. 开发者文档
- [ ] API 文档
- [ ] 组件扩展指南
- [ ] 架构设计文档

#### 3. 部署准备
- [ ] 生产环境配置
- [ ] 性能优化
- [ ] 安全检查

## 具体实施清单

### 依赖安装
```bash
# 拖拽功能
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# 表单处理
npm install react-hook-form @hookform/resolvers zod

# 代码编辑和高亮
npm install @monaco-editor/react prismjs

# 工具库
npm install lodash-es @types/lodash-es
npm install uuid @types/uuid

# JSON Schema 处理
npm install ajv @types/json-schema

# 文件处理
npm install jszip file-saver
```

### 文件创建清单

#### 类型定义文件
- [ ] `src/types/page-builder/index.ts` - 核心类型定义
- [ ] `src/types/page-builder/component.ts` - 组件相关类型
- [ ] `src/types/page-builder/schema.ts` - 配置模式类型

#### 状态管理文件
- [ ] `src/stores/page-builder.ts` - 主状态管理
- [ ] `src/stores/template.ts` - 模板管理
- [ ] `src/stores/history.ts` - 历史记录管理

#### 核心组件文件
- [ ] `src/components/page-builder/Builder.tsx` - 主构建器
- [ ] `src/components/page-builder/ComponentPanel.tsx` - 组件面板
- [ ] `src/components/page-builder/Canvas.tsx` - 画布
- [ ] `src/components/page-builder/PropertyPanel.tsx` - 属性面板
- [ ] `src/components/page-builder/PreviewPanel.tsx` - 预览面板

#### 拖拽组件文件
- [ ] `src/components/drag-drop/DraggableComponent.tsx`
- [ ] `src/components/drag-drop/DroppableArea.tsx`
- [ ] `src/components/drag-drop/DragOverlay.tsx`
- [ ] `src/components/drag-drop/SortableComponent.tsx`

#### 表单组件文件
- [ ] `src/components/forms/DynamicForm.tsx`
- [ ] `src/components/forms/PropertyEditor.tsx`
- [ ] `src/components/forms/ArrayEditor.tsx`
- [ ] `src/components/forms/ObjectEditor.tsx`

#### 工具函数文件
- [ ] `src/utils/page-builder/component-registry.ts`
- [ ] `src/utils/page-builder/code-generator.ts`
- [ ] `src/utils/page-builder/schema-validator.ts`
- [ ] `src/utils/page-builder/template-manager.ts`

#### 配置文件
- [ ] `src/config/component-schemas.ts` - 组件配置模式
- [ ] `src/config/builder-settings.ts` - 构建器设置

#### 页面文件
- [ ] `src/app/[locale]/page-builder/page.tsx` - 构建器页面
- [ ] `src/app/[locale]/templates/page.tsx` - 模板库页面
- [ ] `src/app/[locale]/preview/[id]/page.tsx` - 预览页面

#### API 路由文件
- [ ] `src/app/api/page-builder/layouts/route.ts`
- [ ] `src/app/api/page-builder/templates/route.ts`
- [ ] `src/app/api/page-builder/generate/route.ts`
- [ ] `src/app/api/page-builder/export/route.ts`

### 测试文件清单
- [ ] `__tests__/page-builder/component-registry.test.ts`
- [ ] `__tests__/page-builder/code-generator.test.ts`
- [ ] `__tests__/page-builder/stores.test.ts`
- [ ] `e2e/page-builder.spec.ts`

### 资源文件清单
- [ ] `public/images/components/` - 组件预览图片
- [ ] `public/templates/` - 模板缩略图
- [ ] `docs/page-builder/` - 用户文档

## 关键里程碑

### 里程碑 1 (第2周末)
- ✅ 基础架构搭建完成
- ✅ 核心类型定义完成
- ✅ 状态管理系统就绪

### 里程碑 2 (第4周末)
- ✅ 拖拽功能基本可用
- ✅ 组件注册系统完成
- ✅ 基础UI界面完成

### 里程碑 3 (第6周末)
- ✅ 属性编辑系统完成
- ✅ 动态表单功能就绪
- ✅ 所有组件配置完成

### 里程碑 4 (第8周末)
- ✅ 预览系统完成
- ✅ 代码生成功能就绪
- ✅ 基本导出功能完成

### 里程碑 5 (第10周末)
- ✅ 模板系统完成
- ✅ 用户体验优化完成
- ✅ 高级功能实现

### 最终里程碑 (第12周末)
- ✅ 所有测试通过
- ✅ 文档完善
- ✅ 生产环境部署就绪

## 风险评估和应对

### 技术风险
1. **拖拽性能问题**
   - 风险：大量组件时拖拽卡顿
   - 应对：虚拟化渲染、防抖优化

2. **代码生成复杂性**
   - 风险：生成的代码质量不高
   - 应对：使用 AST 操作、代码模板化

3. **状态管理复杂性**
   - 风险：状态同步问题
   - 应对：使用成熟的状态管理方案

### 进度风险
1. **功能范围过大**
   - 风险：无法按时完成
   - 应对：分阶段实施、MVP优先

2. **技术难点预估不足**
   - 风险：某些功能实现困难
   - 应对：提前技术调研、备选方案

### 质量风险
1. **用户体验不佳**
   - 风险：界面复杂、操作困难
   - 应对：用户测试、迭代优化

2. **生成代码质量**
   - 风险：代码不符合规范
   - 应对：代码审查、自动化检查

这个实施计划将确保项目按时高质量完成，为用户提供一个强大而易用的页面构建工具。
