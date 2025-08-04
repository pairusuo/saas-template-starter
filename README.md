# SaaS Template Starter

[English](#english) | [中文](#中文)

---

## English

A clean and modern multilingual landing page template built with cutting-edge technology stack, featuring theme switching and responsive design.

### ✨ Core Features

- **Multilingual Support**: Complete Chinese/English internationalization
- **Theme Switching**: Support for light/dark/system themes
- **Responsive Design**: Perfect adaptation for mobile, tablet, and desktop
- **Modern Tech Stack**: Next.js 14 + React 18 + TypeScript
- **Component-based Design**: Modular landing page component system
- **SEO Optimized**: Built-in SEO best practices and sitemap
- **High Performance**: Static generation with zero database dependencies

### 🚀 Tech Stack

- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui + Radix UI
- **Internationalization**: next-intl
- **Theming**: next-themes
- **Icons**: Lucide React
- **Build**: Static Site Generation (SSG)

### 📦 Quick Start

#### 1. Clone the Project

```bash
git clone https://github.com/pairusuo/saas-template-starter.git
cd saas-template-starter
```

#### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

#### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

#### 4. Build for Production

```bash
npm run build
npm start
```

### 📁 Project Structure

```
saas-template-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Multilingual routes
│   │   │   ├── layout.tsx     # Language layout
│   │   │   ├── not-found.tsx  # 404 page
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   │   └── page.tsx
│   │   │   ├── blog/          # Blog page
│   │   │   │   └── page.tsx
│   │   │   ├── careers/       # Careers page
│   │   │   │   └── page.tsx
│   │   │   ├── contact/       # Contact page
│   │   │   │   └── page.tsx
│   │   │   ├── cookies/       # Cookie policy
│   │   │   │   └── page.tsx
│   │   │   ├── docs/          # Documentation page
│   │   │   │   └── page.tsx
│   │   │   ├── examples/      # Examples page
│   │   │   │   └── page.tsx
│   │   │   ├── guides/        # Guides page
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/       # Privacy policy
│   │   │   │   └── page.tsx
│   │   │   └── terms/         # Terms of service
│   │   │       └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── not-found.tsx      # Global 404 page
│   │   ├── robots.ts          # Search engine crawler config
│   │   └── sitemap.ts         # Sitemap
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Basic UI components
│   │   │   ├── badge.tsx     # Badge component
│   │   │   ├── button.tsx    # Button component
│   │   │   ├── card.tsx      # Card component
│   │   │   ├── dialog.tsx    # Dialog component
│   │   │   ├── dropdown-menu.tsx # Dropdown menu
│   │   │   ├── floating-theme-toggle.tsx # Floating theme toggle
│   │   │   ├── label.tsx     # Label component
│   │   │   ├── language-switcher.tsx # Language switcher
│   │   │   ├── logo.tsx      # Logo component
│   │   │   ├── skeleton.tsx  # Skeleton component
│   │   │   ├── switch.tsx    # Switch component
│   │   │   ├── tabs.tsx      # Tabs component
│   │   │   └── theme-toggle.tsx # Theme toggle
│   │   ├── landing/          # Landing page components
│   │   │   ├── cta-section.tsx # Call-to-action
│   │   │   ├── faq-section.tsx # FAQ section
│   │   │   ├── features-section.tsx # Features section
│   │   │   ├── hero-section.tsx # Hero section
│   │   │   ├── social-proof-section.tsx # Social proof
│   │   │   ├── social-proof-section.client.tsx # Client social proof
│   │   │   ├── tech-stack-section.tsx # Tech stack
│   │   │   └── testimonials-section.tsx # Testimonials
│   │   ├── layout/           # Layout components
│   │   │   ├── header.tsx    # Header
│   │   │   └── footer.tsx    # Footer
│   │   └── providers/        # Context providers
│   │       ├── theme-provider.tsx # Theme provider
│   │       └── index.ts      # Export file
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── env.ts            # Environment variables
│   │   ├── i18n-config.ts    # i18n configuration
│   │   ├── i18n-utils.ts     # i18n utilities
│   │   └── utils.ts          # Utility functions
│   │
│   ├── config/               # Configuration files
│   │   └── landing.ts        # Landing page config
│   │
│   ├── i18n.ts              # Internationalization setup
│   └── middleware.ts         # Next.js middleware
│
├── messages/                 # Translation files
│   ├── en/                  # English translations
│   └── zh/                  # Chinese translations
│
├── public/                  # Static assets
│   ├── imgs/               # Images
│   └── favicon.ico         # Favicon
│
├── .airules                 # AI assistant rules
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── components.json         # Shadcn/ui configuration
├── dev.sh                  # Development server restart script
├── LICENSE                 # Open source license
├── next-env.d.ts           # Next.js type definitions
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

### 🎨 Landing Page Components

#### Included Components

- **HeroSection**: Hero area with main title and CTA buttons
- **SocialProofSection**: Social proof with user statistics
- **TechStackSection**: Technology stack showcase
- **FeaturesSection**: Core product features
- **TestimonialsSection**: User testimonials
- **FAQSection**: Frequently asked questions
- **CTASection**: Call-to-action section

### 🌍 Internationalization

#### Supported Languages

- 🇺🇸 English (en) - Default language
- 🇨🇳 Chinese (zh) - Simplified Chinese

#### Route Structure

```
/ (Default English)
/zh (Chinese)
/zh/about (Chinese about page)
/about (English about page)
```

### 🎨 Theme Customization

#### Theme Modes

- **Light**: Light mode
- **Dark**: Dark mode
- **System**: Follow system settings

### 🚀 Deployment

#### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Automatic deployment complete

#### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

### 📝 Development Guide

#### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Code linting
npm run lint

# Code formatting
npm run format

# Quick restart development server (clean port and cache)
./dev.sh
```

### 🔧 Environment Variables

The project has default values configured and can run directly. To customize, create a `.env.local` file:

```bash
# Application basic info (optional, has default values)
APP_NAME="SaaS Template Starter"
APP_DESCRIPTION="A clean multilingual landing page template"
APP_URL="https://your-domain.com"

# Development environment (auto-detected)
NODE_ENV="development"
```

**Note**: All environment variables have reasonable default values, the project can run with zero configuration.

### 📊 Performance Optimization

- **Static Generation**: All pages pre-rendered as static HTML
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Using Next.js Image component
- **Font Optimization**: Automatic Google Fonts optimization
- **CSS Optimization**: Tailwind CSS automatically purges unused styles

### 🛠️ Technical Features

- **Zero Database Dependencies**: Pure static site, no server required
- **TypeScript**: Complete type safety
- **Responsive Design**: Mobile-first design
- **SEO Friendly**: Complete meta tags and structured data
- **Accessibility**: Following WCAG guidelines
- **Modern**: Using latest React and Next.js features

### 📄 License

MIT License - See [LICENSE](LICENSE) file for details

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📞 Support

If you encounter any issues:

- Check project documentation
- Submit an [Issue](../../issues)
- Join [Discussions](../../discussions)

---

**If this template helps you, please give it a ⭐ Star!**

Made with ❤️ by SaaS Template Team

---

## 中文

一个简洁的多语言Landing Page模板，基于现代化技术栈构建，支持主题切换和响应式设计。

### ✨ 核心特性

- **多语言支持**: 完整的中文/英文国际化支持
- **主题切换**: 支持明暗模式和系统自动主题
- **响应式设计**: 完美适配移动端、平板和桌面设备
- **现代技术栈**: Next.js 14 + React 18 + TypeScript
- **组件化设计**: 模块化的Landing Page组件系统
- **SEO优化**: 内置SEO最佳实践和sitemap
- **高性能**: 静态生成，零数据库依赖

### 🚀 技术栈

- **框架**: Next.js 14 + React 18 + TypeScript
- **样式**: Tailwind CSS + Shadcn/ui + Radix UI
- **国际化**: next-intl
- **主题**: next-themes
- **图标**: Lucide React
- **构建**: 静态站点生成 (SSG)

### 📦 快速开始

#### 1. 克隆项目

```bash
git clone https://github.com/pairusuo/saas-template-starter.git
cd saas-template-starter
```

#### 2. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

#### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

#### 4. 构建生产版本

```bash
npm run build
npm start
```

### 📁 项目结构

```
saas-template-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 多语言路由
│   │   │   ├── layout.tsx     # 语言布局
│   │   │   ├── not-found.tsx  # 404页面
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── about/         # 关于页面
│   │   │   │   └── page.tsx
│   │   │   ├── blog/          # 博客页面
│   │   │   │   └── page.tsx
│   │   │   ├── careers/       # 招聘页面
│   │   │   │   └── page.tsx
│   │   │   ├── contact/       # 联系页面
│   │   │   │   └── page.tsx
│   │   │   ├── cookies/       # Cookie政策
│   │   │   │   └── page.tsx
│   │   │   ├── docs/          # 文档页面
│   │   │   │   └── page.tsx
│   │   │   ├── examples/      # 示例页面
│   │   │   │   └── page.tsx
│   │   │   ├── guides/        # 指南页面
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/       # 隐私政策
│   │   │   │   └── page.tsx
│   │   │   └── terms/         # 服务条款
│   │   │       └── page.tsx
│   │   ├── layout.tsx         # 根布局
│   │   ├── globals.css        # 全局样式
│   │   ├── not-found.tsx      # 全局404页面
│   │   ├── robots.ts          # 搜索引擎爬虫配置
│   │   └── sitemap.ts         # 站点地图
│   │
│   ├── components/            # React组件
│   │   ├── ui/               # 基础UI组件
│   │   │   ├── badge.tsx     # 徽章组件
│   │   │   ├── button.tsx    # 按钮组件
│   │   │   ├── card.tsx      # 卡片组件
│   │   │   ├── dialog.tsx    # 对话框组件
│   │   │   ├── dropdown-menu.tsx # 下拉菜单
│   │   │   ├── floating-theme-toggle.tsx # 浮动主题切换
│   │   │   ├── label.tsx     # 标签组件
│   │   │   ├── language-switcher.tsx # 语言切换
│   │   │   ├── logo.tsx      # Logo组件
│   │   │   ├── skeleton.tsx  # 骨架屏组件
│   │   │   ├── switch.tsx    # 开关组件
│   │   │   ├── tabs.tsx      # 标签页组件
│   │   │   └── theme-toggle.tsx # 主题切换
│   │   ├── landing/          # Landing Page组件
│   │   │   ├── cta-section.tsx # 行动号召
│   │   │   ├── faq-section.tsx # 常见问题
│   │   │   ├── features-section.tsx # 功能特性
│   │   │   ├── hero-section.tsx # 英雄区域
│   │   │   ├── social-proof-section.tsx # 社会证明
│   │   │   ├── social-proof-section.client.tsx # 客户端社会证明
│   │   │   ├── tech-stack-section.tsx # 技术栈
│   │   │   └── testimonials-section.tsx # 用户评价
│   │   ├── layout/           # 布局组件
│   │   │   ├── header.tsx    # 页头
│   │   │   └── footer.tsx    # 页脚
│   │   └── providers/        # Context提供者
│   │       ├── theme-provider.tsx # 主题提供者
│   │       └── index.ts      # 导出文件
│   │
│   ├── lib/                  # 工具库
│   │   ├── env.ts            # 环境变量配置
│   │   ├── i18n-config.ts    # 国际化配置
│   │   ├── i18n-utils.ts     # 国际化工具函数
│   │   └── utils.ts          # 工具函数
│   │
│   ├── config/               # 配置文件
│   │   └── landing.ts        # Landing Page配置
│   │
│   ├── i18n.ts              # 国际化设置
│   └── middleware.ts         # Next.js中间件
│
├── messages/                 # 翻译文件
│   ├── en/                  # 英文翻译
│   └── zh/                  # 中文翻译
│
├── public/                  # 静态资源
│   ├── imgs/               # 图片资源
│   └── favicon.ico         # 网站图标
│
├── .airules                 # AI助手规则
├── .eslintrc.json          # ESLint配置
├── .gitignore              # Git忽略文件
├── components.json         # Shadcn/ui配置
├── dev.sh                  # 开发服务器重启脚本
├── LICENSE                 # 开源许可证
├── next-env.d.ts           # Next.js类型定义
├── next.config.js          # Next.js配置
├── package.json            # 项目依赖
├── postcss.config.js       # PostCSS配置
├── tailwind.config.js      # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

### 🎨 Landing Page组件

#### 包含的组件

- **HeroSection**: 英雄区域 - 主要标题和CTA按钮
- **SocialProofSection**: 社会证明 - 用户数量和评价统计
- **TechStackSection**: 技术栈展示 - 使用的技术和工具
- **FeaturesSection**: 功能特性 - 产品核心功能介绍
- **TestimonialsSection**: 用户评价 - 真实用户反馈
- **FAQSection**: 常见问题 - 用户常见疑问解答
- **CTASection**: 行动号召 - 引导用户采取行动

### 🌍 国际化

#### 支持的语言

- 🇺🇸 English (en) - 默认语言
- 🇨🇳 中文 (zh) - 简体中文

#### 路由结构

```
/ (默认英文)
/zh (中文)
/zh/about (中文关于页面)
/about (英文关于页面)
```

### 🎨 主题定制

#### 主题模式

项目支持三种主题模式：
- **Light**: 明亮模式
- **Dark**: 暗黑模式  
- **System**: 跟随系统设置

### 🚀 部署

#### Vercel (推荐)

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

#### Netlify

1. 连接GitHub仓库
2. 构建命令: `npm run build`
3. 发布目录: `out`

### 📝 开发指南

#### 开发命令

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
npm run format

# 快速重启开发服务器（清理端口和缓存）
./dev.sh
```

### 🔧 环境变量

项目已配置默认值，可直接运行。如需自定义，可创建 `.env.local` 文件：

```bash
# 应用基本信息（可选，已有默认值）
APP_NAME="SaaS Template Starter"
APP_DESCRIPTION="一个简洁的多语言Landing Page模板"
APP_URL="https://your-domain.com"

# 开发环境（自动检测）
NODE_ENV="development"
```

**注意**: 所有环境变量都有合理的默认值，项目可零配置运行。

### 📊 性能优化

- **静态生成**: 所有页面预渲染为静态HTML
- **代码分割**: 自动按路由分割代码
- **图片优化**: 使用Next.js Image组件
- **字体优化**: 自动优化Google Fonts
- **CSS优化**: Tailwind CSS自动清除未使用样式

### 🛠️ 技术特点

- **零数据库依赖**: 纯静态站点，无需服务器
- **TypeScript**: 完整的类型安全
- **响应式设计**: 移动端优先设计
- **SEO友好**: 完整的meta标签和结构化数据
- **可访问性**: 遵循WCAG指南
- **现代化**: 使用最新的React和Next.js特性

### 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 📞 支持

如果您在使用过程中遇到问题，可以：

- 查看项目文档
- 提交 [Issue](../../issues)
- 参与 [Discussions](../../discussions)

---

**如果这个模板对您有帮助，请给个 ⭐ Star！**

Made with ❤️ by SaaS Template Team