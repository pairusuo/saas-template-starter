# SaaS Template Starter

一个简洁的多语言Landing Page模板，基于现代化技术栈构建，支持主题切换和响应式设计。

## ✨ 核心特性

- **多语言支持**: 完整的中文/英文国际化支持
- **主题切换**: 支持明暗模式和系统自动主题
- **响应式设计**: 完美适配移动端、平板和桌面设备
- **现代技术栈**: Next.js 14 + React 18 + TypeScript
- **组件化设计**: 模块化的Landing Page组件系统
- **SEO优化**: 内置SEO最佳实践和sitemap
- **高性能**: 静态生成，零数据库依赖

## 🚀 技术栈

- **框架**: Next.js 14 + React 18 + TypeScript
- **样式**: Tailwind CSS + Shadcn/ui + Radix UI
- **国际化**: next-intl
- **主题**: next-themes
- **图标**: Lucide React
- **构建**: 静态站点生成 (SSG)

## 📦 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd saas-template-starter
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
saas-template-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 多语言路由
│   │   │   ├── layout.tsx     # 语言布局
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── about/         # 关于页面
│   │   │   ├── contact/       # 联系页面
│   │   │   ├── docs/          # 文档页面
│   │   │   ├── blog/          # 博客页面
│   │   │   ├── careers/       # 招聘页面
│   │   │   ├── privacy/       # 隐私政策
│   │   │   ├── terms/         # 服务条款
│   │   │   └── cookies/       # Cookie政策
│   │   ├── layout.tsx         # 根布局
│   │   ├── globals.css        # 全局样式
│   │   ├── robots.ts          # 搜索引擎爬虫配置
│   │   └── sitemap.ts         # 站点地图
│   │
│   ├── components/            # React组件
│   │   ├── ui/               # 基础UI组件
│   │   │   ├── button.tsx    # 按钮组件
│   │   │   ├── card.tsx      # 卡片组件
│   │   │   ├── logo.tsx      # Logo组件
│   │   │   ├── theme-toggle.tsx # 主题切换
│   │   │   └── language-switcher.tsx # 语言切换
│   │   ├── landing/          # Landing Page组件
│   │   │   ├── hero-section.tsx # 英雄区域
│   │   │   ├── features-section.tsx # 功能特性
│   │   │   ├── tech-stack-section.tsx # 技术栈
│   │   │   ├── social-proof-section.tsx # 社会证明
│   │   │   ├── testimonials-section.tsx # 用户评价
│   │   │   ├── faq-section.tsx # 常见问题
│   │   │   └── cta-section.tsx # 行动号召
│   │   ├── layout/           # 布局组件
│   │   │   ├── header.tsx    # 页头
│   │   │   └── footer.tsx    # 页脚
│   │   └── providers/        # Context提供者
│   │       ├── theme-provider.tsx # 主题提供者
│   │       └── index.ts      # 导出文件
│   │
│   ├── lib/                  # 工具库
│   │   ├── utils.ts          # 工具函数
│   │   ├── env.ts            # 环境变量配置
│   │   ├── i18n-config.ts    # 国际化配置
│   │   └── i18n-utils.ts     # 国际化工具函数
│   │
│   ├── config/               # 配置文件
│   │   └── landing.ts        # Landing Page配置
│   │
│   ├── i18n.ts              # 国际化设置
│   └── middleware.ts         # Next.js中间件
│
├── messages/                 # 翻译文件
│   ├── en/                  # 英文翻译
│   │   ├── common.json      # 通用翻译
│   │   ├── navigation.json  # 导航翻译
│   │   ├── topbar.json      # 顶栏翻译
│   │   ├── footer.json      # 页脚翻译
│   │   ├── landing.json     # Landing Page翻译
│   │   └── errors.json      # 错误信息翻译
│   └── zh/                  # 中文翻译
│       ├── common.json
│       ├── navigation.json
│       ├── topbar.json
│       ├── footer.json
│       ├── landing.json
│       └── errors.json
│
├── public/                  # 静态资源
│   ├── imgs/               # 图片资源
│   └── favicon.ico         # 网站图标
│
├── next.config.js           # Next.js配置
├── tailwind.config.js       # Tailwind配置
├── tsconfig.json           # TypeScript配置
├── components.json         # Shadcn/ui配置
└── package.json           # 项目依赖
```

## 🎨 Landing Page组件

### 包含的组件

- **HeroSection**: 英雄区域 - 主要标题和CTA按钮
- **SocialProofSection**: 社会证明 - 用户数量和评价统计
- **TechStackSection**: 技术栈展示 - 使用的技术和工具
- **FeaturesSection**: 功能特性 - 产品核心功能介绍
- **TestimonialsSection**: 用户评价 - 真实用户反馈
- **FAQSection**: 常见问题 - 用户常见疑问解答
- **CTASection**: 行动号召 - 引导用户采取行动

### 组件配置

在 `src/config/landing.ts` 中可以配置各组件的显示和样式：

```typescript
export const defaultLandingConfig: LandingConfig = {
  hero: {
    enabled: true,
    variant: 'centered',
    showStats: true,
    showAnnouncement: true,
  },
  features: {
    enabled: true,
    variant: 'grid',
    columns: 4,
    showBadge: true,
  },
  // ...其他组件配置
};
```

## 🌍 国际化

### 支持的语言

- 🇺🇸 English (en) - 默认语言
- 🇨🇳 中文 (zh) - 简体中文

### 路由结构

```
/ (默认英文)
/zh (中文)
/zh/about (中文关于页面)
/about (英文关于页面)
```

### 添加新语言

1. 在 `src/lib/i18n-config.ts` 中添加新语言代码：
```typescript
export const locales = ['en', 'zh', 'ja'] as const; // 添加日文
```

2. 在 `messages/` 目录下创建对应的翻译文件夹：
```bash
mkdir messages/ja
```

3. 复制现有翻译文件并翻译内容：
```bash
cp messages/en/*.json messages/ja/
```

### 翻译文件说明

- `common.json`: 通用文本（按钮、标签等）
- `navigation.json`: 导航菜单文本
- `topbar.json`: 顶部栏文本（主题切换等）
- `footer.json`: 页脚文本
- `landing.json`: Landing Page所有组件文本
- `errors.json`: 错误信息文本

## 🎨 主题定制

### 主题模式

项目支持三种主题模式：
- **Light**: 明亮模式
- **Dark**: 暗黑模式  
- **System**: 跟随系统设置

### 自定义主题颜色

在 `tailwind.config.js` 中自定义颜色：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // 更多自定义颜色...
      },
    },
  },
};
```

在 `src/app/globals.css` 中定义CSS变量：

```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* 更多颜色变量... */
}

.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  /* 暗色主题变量... */
}
```

## 🚀 部署

### Vercel (推荐)

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

### Netlify

1. 连接GitHub仓库
2. 构建命令: `npm run build`
3. 发布目录: `out`

### 静态托管

```bash
# 构建静态文件
npm run build

# 生成的文件在 .next 目录中
# 可以部署到任何静态托管服务
```

## 📝 开发指南

### 添加新页面

1. 在 `src/app/[locale]/` 下创建新目录：
```bash
mkdir src/app/[locale]/new-page
```

2. 创建 `page.tsx` 文件：
```typescript
export default function NewPage() {
  return <div>新页面内容</div>;
}
```

3. 在翻译文件中添加对应文本

### 添加新组件

1. 在 `src/components/` 对应目录下创建组件
2. 使用 TypeScript 定义 Props 接口
3. 支持主题和国际化功能

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run lint:fix
```

## 🔧 环境变量

在 `.env.local` 中配置环境变量：

```bash
# 应用基本信息
APP_NAME="SaaS Template Starter"
APP_DESCRIPTION="一个简洁的多语言Landing Page模板"
APP_URL="https://your-domain.com"

# 开发环境
NODE_ENV="development"
```

## 📊 性能优化

- **静态生成**: 所有页面预渲染为静态HTML
- **代码分割**: 自动按路由分割代码
- **图片优化**: 使用Next.js Image组件
- **字体优化**: 自动优化Google Fonts
- **CSS优化**: Tailwind CSS自动清除未使用样式

## 🛠️ 技术特点

- **零数据库依赖**: 纯静态站点，无需服务器
- **TypeScript**: 完整的类型安全
- **响应式设计**: 移动端优先设计
- **SEO友好**: 完整的meta标签和结构化数据
- **可访问性**: 遵循WCAG指南
- **现代化**: 使用最新的React和Next.js特性

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 支持

如果您在使用过程中遇到问题，可以：

- 查看 [文档](docs/)
- 提交 [Issue](issues)
- 发送邮件至: support@example.com

---

**如果这个模板对您有帮助，请给个 ⭐ Star！**

Made with ❤️ by SaaS Template Team