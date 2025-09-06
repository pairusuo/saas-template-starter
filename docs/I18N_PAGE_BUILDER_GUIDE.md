# 国际化页面构建器使用指南

## 概述

国际化页面构建器是一个强大的工具，允许用户通过拖拽方式构建页面，并自动生成支持多语言的国际化代码。该功能解决了拖拽构建的组件中包含中文文本时的国际化问题。

## 功能特性

### ✅ 已实现功能

1. **智能文本识别**
   - 自动识别组件中的中文文本
   - 支持字符串、数组、对象等复杂属性类型
   - 递归处理嵌套的数据结构

2. **智能翻译生成**
   - 内置中英文翻译词典，覆盖常用业务词汇
   - 支持模糊匹配和规则处理
   - 自动生成翻译键和对应的英文翻译

3. **代码自动生成**
   - 生成符合 Next.js 14 + next-intl 规范的 TSX 代码
   - 自动添加必要的导入语句和类型定义
   - 支持复杂的组件属性处理

4. **翻译文件管理**
   - 自动生成中英文翻译文件
   - 保存到项目的 `messages/` 目录
   - 支持嵌套的翻译键结构

5. **可视化界面**
   - 翻译键预览功能
   - 支持列表和 JSON 两种预览模式
   - 实时统计和状态显示

## 使用流程

### 1. 构建页面布局

1. 打开页面构建器：访问 `/page-builder`
2. 创建新页面或加载现有布局
3. 从左侧组件面板拖拽组件到画布
4. 在属性面板中配置组件的中文内容

### 2. 预览翻译键

1. 切换到右侧的"国际化"面板
2. 点击"预览翻译键"按钮
3. 查看系统识别出的中文文本和自动生成的英文翻译
4. 确认翻译内容是否符合预期

### 3. 生成国际化页面

有两种生成方式：

#### 方式一：生成新页面文件
- 点击"生成国际化页面"按钮
- 系统会在 `public/generated-pages/` 目录生成新的 TSX 文件
- 同时生成对应的翻译文件

#### 方式二：替换主页文件
- 点击"替换主页文件"按钮
- 系统会直接替换 `src/app/[locale]/page.tsx` 文件
- ⚠️ **注意：此操作会覆盖现有主页，请提前备份**

### 4. 使用生成的页面

1. 翻译文件会自动保存到 `messages/zh/` 和 `messages/en/` 目录
2. 重启开发服务器以加载新的翻译文件
3. 访问页面查看多语言效果

## 技术实现

### 核心组件

1. **EnhancedI18nPageGenerator** (`src/utils/page-builder/enhanced-i18n-generator.ts`)
   - 主要的国际化生成器类
   - 负责文本识别、翻译生成、代码生成

2. **I18nPanel** (`src/components/page-builder/I18nPanel.tsx`)
   - 国际化面板组件
   - 提供预览、生成等交互功能

3. **API 接口** (`src/app/api/page-builder/generate-i18n-page/route.ts`)
   - 处理国际化页面生成请求
   - 管理文件保存和翻译文件更新

### 生成的文件结构

```
项目根目录/
├── src/app/[locale]/page.tsx          # 主页文件（如果选择替换）
├── public/generated-pages/            # 生成的页面文件目录
│   ├── [页面名]-[时间戳].tsx         # 生成的页面文件
│   └── [页面名]-[时间戳].meta.json   # 页面元数据
├── messages/
│   ├── zh/[页面名].json              # 中文翻译文件
│   └── en/[页面名].json              # 英文翻译文件
```

### 生成的代码示例

```tsx
import { getTranslations } from 'next-intl/server';
import { HeroSimple } from '@/components/page-builder/components/HeroSimple';
import { FeaturesGrid } from '@/components/landing/features/features-grid';

interface MyPageProps {
  params: {
    locale: string;
  };
}

export default async function MyPage({ params: { locale } }: MyPageProps) {
  const t = await getTranslations('mypage');

  return (
    <div className="min-h-screen">
      <HeroSimple
        title={t('hero_simple.title')}
        subtitle={t('hero_simple.subtitle')}
        primaryButton={t('hero_simple.primaryButton')}
      />
      
      <FeaturesGrid
        title={t('features_grid.title')}
        features={[
          {
            title: t('features_grid.features.0.title'),
            description: t('features_grid.features.0.description')
          }
        ]}
      />
    </div>
  );
}
```

## 翻译词典

系统内置了丰富的中英文翻译词典，包括：

### 常用业务词汇
- 构建现代化 SaaS 应用 → Build Modern SaaS Applications
- 立即开始 → Get Started
- 查看演示 → View Demo
- 了解更多 → Learn More

### 技术相关词汇
- 响应式设计 → Responsive Design
- 性能优化 → Performance Optimized
- 搜索引擎优化 → SEO Optimized

### 行动词汇
- 开始使用 → Get Started
- 免费注册 → Sign Up Free
- 立即购买 → Buy Now

## 最佳实践

### 1. 内容准备
- 在拖拽构建时，尽量使用完整、准确的中文文本
- 避免使用过于口语化或特定语境的表达
- 确保文本内容符合国际化标准

### 2. 翻译检查
- 生成后仔细检查自动翻译的准确性
- 对于专业术语，建议手动调整翻译
- 考虑不同文化背景下的表达习惯

### 3. 文件管理
- 定期备份重要的页面文件
- 使用版本控制管理翻译文件的变更
- 建立翻译文件的命名规范

### 4. 测试验证
- 在不同语言环境下测试页面显示
- 检查文本长度对布局的影响
- 验证所有翻译键都能正确加载

## 注意事项

### ⚠️ 重要提醒

1. **文件备份**
   - 替换主页文件前务必备份原文件
   - 建议使用 Git 等版本控制工具

2. **服务器重启**
   - 生成新翻译文件后需要重启开发服务器
   - 确保新的翻译文件被正确加载

3. **翻译质量**
   - 自动生成的英文翻译可能需要人工校对
   - 建议请专业翻译人员审核重要内容

4. **性能考虑**
   - 大量翻译键可能影响页面加载性能
   - 考虑按需加载或分页处理

## 故障排除

### 常见问题

1. **翻译文件未生效**
   - 检查文件路径是否正确
   - 重启开发服务器
   - 确认翻译键命名规范

2. **生成的代码有语法错误**
   - 检查组件属性是否包含特殊字符
   - 验证组件导入路径是否正确

3. **翻译内容显示异常**
   - 检查翻译文件的 JSON 格式
   - 确认翻译键的嵌套结构

### 调试方法

1. 查看浏览器控制台的错误信息
2. 检查生成的翻译文件内容
3. 验证 API 接口的响应状态
4. 使用开发工具检查组件渲染

## 扩展功能

### 未来计划

1. **更多语言支持**
   - 支持日语、韩语、法语等更多语言
   - 集成专业翻译 API

2. **智能翻译优化**
   - 基于上下文的智能翻译
   - 机器学习优化翻译质量

3. **批量处理**
   - 支持批量生成多个页面
   - 翻译文件的批量管理

4. **可视化编辑**
   - 翻译内容的在线编辑
   - 实时预览翻译效果

## 总结

国际化页面构建器为 SaaS 项目提供了一个高效的多语言页面生成解决方案。通过拖拽构建 + 自动国际化的方式，大大简化了多语言页面的开发流程，提高了开发效率。

该功能特别适合：
- 需要快速构建多语言 Landing Page 的项目
- 希望降低国际化开发成本的团队
- 需要频繁更新页面内容的场景

通过合理使用这个工具，可以显著提升项目的国际化开发效率和质量。