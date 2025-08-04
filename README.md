# Landing Page Template

一个简洁的多语言Landing Page模板，支持主题切换和响应式设计。

## ✨ 核心特性

- **多语言支持**: 支持中文/英文切换
- **主题切换**: 支持明暗模式和系统主题
- **响应式设计**: 完美适配移动端、平板和桌面
- **现代技术栈**: Next.js 14 + React 18 + TypeScript
- **组件化设计**: 可配置的Landing Page组件
- **SEO优化**: 内置SEO最佳实践

## 🚀 技术栈

- **框架**: Next.js 14 + React 18 + TypeScript
- **样式**: Tailwind CSS + Shadcn/ui
- **国际化**: next-intl
- **主题**: next-themes
- **图标**: Lucide React + React Icons
- **动画**: Framer Motion

## 📦 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd landing-page-template
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

## 📁 项目结构

```
landing-page-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 多语言路由
│   │   │   ├── layout.tsx     # 语言布局
│   │   │   ├── page.tsx       # 首页
│   │   │   ├── about/         # 关于页面
│   │   │   ├── contact/       # 联系页面
│   │   │   ├── docs/          # 文档页面
│   │   │   └── ...            # 其他页面
│   │   ├── layout.tsx         # 根布局
│   │   └── globals.css        # 全局样式
│   │
│   ├── components/            # React组件
│   │   ├── ui/               # 基础UI组件
│   │   ├── landing/          # Landing Page组件
│   │   ├── layout/           # 布局组件
│   │   └── providers/        # Context提供者
│   │
│   ├── lib/                  # 工具库
│   │   ├── utils.ts          # 工具函数
│   │   └── i18n-config.ts    # 国际化配置
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
├── next.config.js           # Next.js配置
├── tailwind.config.js       # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

## 🎨 组件配置

### Landing Page组件

项目包含以下可配置的Landing Page组件：

- **HeroSection**: 英雄区域
- **FeaturesSection**: 功能特性
- **TechStackSection**: 技术栈展示
- **SocialProofSection**: 社会证明
- **PricingSection**: 价格方案
- **TestimonialsSection**: 用户评价
- **FAQSection**: 常见问题
- **CTASection**: 行动号召

### 配置方式

在 `src/config/landing.ts` 中可以配置各组件的显示和样式：

```typescript
export const defaultLandingConfig: LandingConfig = {
  hero: {
    enabled: true,
    variant: 'centered',
    showStats: true,
    // ...更多配置
  },
  features: {
    enabled: true,
    variant: 'grid',
    columns: 4,
    // ...更多配置
  },
  // ...其他组件配置
};
```

## 🌍 国际化

### 支持的语言

- 🇺🇸 English (en)
- 🇨🇳 中文 (zh)

### 添加新语言

1. 在 `src/lib/i18n-config.ts` 中添加新语言代码
2. 在 `messages/` 目录下创建对应的翻译文件夹
3. 复制现有翻译文件并翻译内容

### 翻译文件结构

```
messages/
├── en/
│   ├── common.json      # 通用翻译
│   ├── navigation.json  # 导航翻译
│   ├── landing.json     # Landing Page翻译
│   └── ...
└── zh/
    ├── common.json
    ├── navigation.json
    ├── landing.json
    └── ...
```

## 🎨 主题定制

### 主题切换

项目支持三种主题模式：
- 明亮模式 (Light)
- 暗黑模式 (Dark)  
- 系统模式 (System)

### 自定义主题

在 `tailwind.config.js` 中可以自定义颜色和样式：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 自定义主色调
        },
        secondary: {
          // 自定义辅助色
        },
      },
    },
  },
};
```

## 🚀 部署

### Vercel (推荐)

1. 连接GitHub仓库
2. 自动部署

### 其他平台

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📝 开发指南

### 添加新页面

1. 在 `src/app/[locale]/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 在翻译文件中添加对应文本

### 添加新组件

1. 在 `src/components/` 对应目录下创建组件
2. 使用 TypeScript 定义 Props 接口
3. 支持主题和国际化

### 代码规范

```bash
# 代码检查
npm run lint

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**如果这个模板对您有帮助，请给个 ⭐ Star！**