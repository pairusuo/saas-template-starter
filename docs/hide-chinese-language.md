# 隐藏中文语言选项指南

本项目支持英文和中文双语，但如果您只想显示英文版本，不希望用户能够通过 `/zh` URL访问中文界面，可以通过以下简单步骤隐藏中文语言功能。

## 方案概述

**目标**: 保留国际化基础设施，但隐藏中文语言选项和路由访问
**优势**:

- ✅ 保持代码结构完整
- ✅ 未来需要时可快速恢复多语言
- ✅ 修改量最小
- ✅ 不影响现有功能

## 方法一：通过路由配置隐藏（推荐）----------------使用推荐方式即可

### 1. 修改中间件配置

**文件：`src/middleware.ts`**

```typescript
// 修改前
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});

// 修改后 - 只保留英文
const intlMiddleware = createIntlMiddleware({
  locales: ['en'], // 只保留英文
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});
```

### 2. 更新语言配置

**文件：`src/lib/i18n-config.ts`**

```typescript
// 修改前
export const locales = ['en', 'zh'] as const;

// 修改后 - 只导出英文
export const locales = ['en'] as const;

// 其他配置保持不变，但zh相关的会被忽略
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  // zh: '中文', // 可以保留或删除
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  // zh: '🇨🇳', // 可以保留或删除
};
```

## 方法二：通过中间件拦截中文路由

如果想保持配置完整但阻止中文路由访问：

**文件：`src/middleware.ts`**

```typescript
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 拦截所有 /zh 开头的路由，重定向到英文版本
  if (pathname.startsWith('/zh')) {
    const newPath = pathname.replace('/zh', '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // 原有的国际化处理
  const intlResponse = intlMiddleware(request);

  // ... 其他代码保持不变
}
```

## 方法三：隐藏语言切换器

### 1. 临时隐藏语言切换器

**文件：`src/components/layout/header.tsx`**

找到语言切换器的引用并注释掉：

```typescript
// 注释掉或删除语言切换器的导入和使用
// import { LanguageSwitcher } from '@/components/ui/language-switcher';

// 在JSX中注释掉语言切换器组件
{
  /* <LanguageSwitcher /> */
}
```

### 2. 或者修改语言切换器组件

**文件：`src/components/ui/language-switcher.tsx`**

让组件直接返回null：

```typescript
export function LanguageSwitcher() {
  // 直接返回null，不显示任何内容
  return null;

  // 或者只显示当前语言，不提供切换功能
  // return <span>English</span>;
}
```

## 推荐的最小化修改方案

**最推荐的方法是方法一**，只需修改两个文件：

### 步骤1：修改 `src/middleware.ts`

```typescript
const intlMiddleware = createIntlMiddleware({
  locales: ['en'], // 从 ['en', 'zh'] 改为 ['en']
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});
```

### 步骤2：修改 `src/lib/i18n-config.ts`

```typescript
export const locales = ['en'] as const; // 从 ['en', 'zh'] 改为 ['en']
```

### 步骤3：语言切换器自动隐藏（无需手动操作）

✅ **语言切换器会自动隐藏**：

- 修改了 `src/components/ui/language-switcher.tsx` 组件
- 当 `locales.length <= 1` 时自动返回 `null`
- 无需手动注释或删除组件引用
- 保持代码整洁，易于恢复

~~原来需要手动注释（现在不需要了）~~：

```typescript
// 不再需要手动操作
// {/* <LanguageSwitcher /> */}
```

## 验证效果

完成修改后：

1. **测试路由**：
   - ✅ `http://localhost:3000` - 正常访问英文首页
   - ✅ `http://localhost:3000/about` - 正常访问英文页面
   - ❌ `http://localhost:3000/zh` - 返回404或重定向到首页
   - ❌ `http://localhost:3000/zh/about` - 返回404或重定向到对应英文页面

2. **UI检查**：
   - ✅ 语言切换器自动隐藏（组件检测到只有一种语言）
   - ✅ 所有页面只显示英文内容
   - ✅ 浏览器地址栏不出现 `/zh` 路径

## 恢复多语言功能

如果将来需要恢复中文支持：

1. **恢复配置**：

   ```typescript
   // 将 locales 改回
   export const locales = ['en', 'zh'] as const;
   ```

2. **恢复中间件**：

   ```typescript
   // 将 locales 改回
   locales: ['en', 'zh'],
   ```

3. **恢复语言切换器**：
   ```typescript
   // 取消注释
   <LanguageSwitcher />
   ```

## 其他注意事项

### SEO 考虑

- 如果之前有中文页面被搜索引擎收录，建议设置301重定向
- 更新 `sitemap.xml` 移除中文URL（如果有的话）

### 开发建议

- 保留中文翻译文件：`messages/zh/` 目录可以保留，不占用运行时资源
- 保留相关代码：方便将来快速恢复多语言功能

### 性能影响

- ✅ Bundle 大小几乎无变化（翻译文件按需加载）
- ✅ 运行时性能略有提升（减少语言检测逻辑）
- ✅ 维护成本降低（只需要维护英文内容）

---

**总结**: 通过修改2个配置文件，即可轻松隐藏中文语言功能，同时保持系统的灵活性和可扩展性。
