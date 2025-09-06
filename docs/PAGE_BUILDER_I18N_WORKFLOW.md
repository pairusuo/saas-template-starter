# Page Builder 国际化完整工作流程

## 🎯 工作流程概述

用户通过Page Builder创建多语言Landing Page的完整流程：

```mermaid
graph TD
    A[用户进入Page Builder] --> B[拖拽组件到画布]
    B --> C[修改组件文案内容]
    C --> D[系统调用翻译API]
    D --> E[更新messages翻译文件]
    E --> F[点击翻译页面按钮]
    F --> G[生成另一语言版本]
    G --> H[保存TSX使用翻译键]
    H --> I[替换[locale]/page.tsx]
    I --> J[完成多语言Landing Page]
```

## 📋 详细步骤说明

### 第1步：创建和编辑组件

1. **拖拽组件**：从组件库拖拽Hero组件到画布
2. **修改文案**：在属性面板中修改文案内容
   ```
   title: "构建现代化 SaaS 应用"
   subtitle: "基于 Next.js 14 的完整 SaaS 模板..."
   primaryButtonText: "立即开始"
   ```

### 第2步：自动翻译处理

系统会自动：
- 生成组件ID：`hero-simple_1754396868785-grjyfby90`
- 调用翻译API更新翻译文件
- 更新 `messages/zh/hero.json` 和 `messages/en/hero.json`

```json
// messages/zh/hero.json
{
  "hero-simple_1754396868785-grjyfby90": {
    "title": "构建现代化 SaaS 应用",
    "subtitle": "基于 Next.js 14 的完整 SaaS 模板...",
    "primaryButtonText": "立即开始",
    "secondaryButtonText": "查看演示"
  }
}

// messages/en/hero.json (自动翻译生成)
{
  "hero-simple_1754396868785-grjyfby90": {
    "title": "Build Modern SaaS Application",
    "subtitle": "Complete SaaS template based on Next.js 14...",
    "primaryButtonText": "Get Started",
    "secondaryButtonText": "View Demo"
  }
}
```

### 第3步：生成国际化TSX代码

点击"保存"按钮后，系统生成使用翻译键的TSX代码：

```tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HeroSimple } from '@/components/page-builder/components/HeroSimple';

/**
 * 新页面
 * 使用拖拽构建器创建的页面
 * 
 * 由页面构建器生成于: 2024-01-05 15:30:00
 * 组件数量: 1
 * 
 * 注意：此页面使用 next-intl 进行国际化
 * 翻译文件位于: messages/[locale]/
 */
export default function Page() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <HeroSimple
        title={t('hero.hero-simple_1754396868785-grjyfby90.title')}
        subtitle={t('hero.hero-simple_1754396868785-grjyfby90.subtitle')}
        primaryButtonText={t('hero.hero-simple_1754396868785-grjyfby90.primaryButtonText')}
        secondaryButtonText={t('hero.hero-simple_1754396868785-grjyfby90.secondaryButtonText')}
        showSecondaryButton={true}
      />
    </div>
  );
}
```

### 第4步：替换项目文件实现多语言

将生成的TSX代码分别保存为：
- `src/app/[locale]/page.tsx` （替换现有文件）

现在访问不同语言路径会显示对应语言的内容：
- `/zh` - 显示中文版本
- `/en` - 显示英文版本

## 🔧 实现原理

### 1. 翻译键命名规则
```
{翻译文件}.{组件类型}_{组件ID}.{属性名}
```
例如：`hero.hero-simple_1754396868785-grjyfby90.title`

### 2. 翻译文件映射
| 组件类型 | 翻译文件 |
|----------|----------|
| hero-simple | hero.json |
| hero-centered | hero.json |
| features-grid | features.json |
| header-basic | header.json |
| footer-basic | footer.json |

### 3. 自动翻译时机
- 用户修改组件属性时立即触发
- 系统检测到文本属性变化时调用翻译API
- 同时更新所有语言的翻译文件

## 🎨 用户体验优势

### 对于开发者
- **零手动翻译**：AI自动翻译所有内容
- **标准国际化**：使用next-intl标准实现
- **类型安全**：TypeScript支持完整
- **易于维护**：翻译集中管理

### 对于内容编辑者
- **可视化编辑**：拖拽式界面
- **实时预览**：立即看到效果
- **一键翻译**：自动生成多语言版本
- **无需代码**：完全图形化操作

## 🚀 高级功能

### 1. 批量翻译
```javascript
// 翻译整个页面布局
const translatedComponents = await translationManager.translatePageLayout(
  components, 
  'en',  // 目标语言
  'zh'   // 源语言
);
```

### 2. 自定义翻译
用户可以在messages文件中手动调整翻译内容，系统会优先使用用户自定义的翻译。

### 3. 翻译缓存
系统自动缓存翻译结果，相同内容不会重复调用API。

## 🛠️ 故障排除

### 问题1：翻译键未生效
**解决方案**：确保翻译键格式正确，检查messages文件是否存在对应键值

### 问题2：翻译质量不佳
**解决方案**：
1. 切换翻译提供商（DeepL质量更高）
2. 在messages文件中手动调整翻译
3. 使用OpenAI GPT获得更好的上下文理解

### 问题3：部分内容未翻译
**解决方案**：检查`isTextProperty`方法是否包含相应的属性名

## 📊 示例对比

### 传统方式 vs Page Builder方式

| 传统方式 | Page Builder方式 |
|----------|-------------------|
| 手写JSX代码 | 可视化拖拽 |
| 手动管理翻译文件 | 自动生成翻译 |
| 硬编码文案 | 动态翻译键 |
| 需要开发技能 | 无需编程 |
| 耗时数小时 | 几分钟完成 |

这个流程让非技术用户也能轻松创建专业的多语言Landing Page！