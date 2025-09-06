# 专业翻译服务集成指南

## 概述

项目已集成专业翻译API服务，支持Google Translate、DeepL、Azure Translator和OpenAI GPT等多种翻译提供商，完全替代了之前的硬编码翻译映射表。

## 支持的翻译提供商

1. **Google Translate API** - 稳定可靠，语言支持最广泛
2. **DeepL API** - 翻译质量最佳，特别适合欧洲语言
3. **Azure Translator** - 微软提供，企业级可靠性
4. **OpenAI GPT** - 智能上下文翻译，质量优秀但成本较高

## 配置步骤

### 1. 环境变量配置

复制 `.env.example` 到 `.env.local` 并配置相应的API密钥：

```bash
cp .env.example .env.local
```

在 `.env.local` 中配置：

```bash
# 选择翻译提供商 (google, deepl, azure, openai)
TRANSLATION_PROVIDER=google

# Google Translate API
GOOGLE_TRANSLATE_API_KEY=your_api_key_here

# DeepL API (根据你的选择配置)
DEEPL_API_KEY=your_api_key_here

# Azure Translator
AZURE_TRANSLATOR_KEY=your_api_key_here
AZURE_TRANSLATOR_REGION=your_region_here

# OpenAI API
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

### 2. API密钥获取

#### Google Translate API
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 启用 Cloud Translation API
3. 创建服务账号或API密钥
4. 复制API密钥到环境变量

#### DeepL API
1. 访问 [DeepL API](https://www.deepl.com/pro-api)
2. 注册账号并选择免费或付费计划
3. 获取API密钥
4. 复制到环境变量

#### Azure Translator
1. 访问 [Azure Portal](https://portal.azure.com/)
2. 创建 Translator 资源
3. 获取密钥和区域信息
4. 复制到环境变量

#### OpenAI API
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 创建API密钥
3. 复制到环境变量

## 使用方法

### 1. Page Builder 中的翻译

1. 在 Page Builder 中创建或编辑页面
2. 点击工具栏中的 "翻译页面" 按钮（🌐图标）
3. 系统会自动检测当前语言并翻译为对应语言
4. 翻译结果在新窗口中预览

### 2. API接口调用

#### 翻译页面布局
```javascript
const response = await fetch('/api/page-builder/translate-layout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    components: [...], // 组件数组
    targetLang: 'en',   // 目标语言
    sourceLang: 'zh'    // 源语言
  })
});
```

#### 更新组件翻译
```javascript
const response = await fetch('/api/page-builder/update-translation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    componentType: 'hero-simple',
    componentId: 'hero_001',
    props: { title: '新标题', subtitle: '新副标题' },
    currentLocale: 'zh'
  })
});
```

### 3. 编程接口

```typescript
import { translationManager } from '@/utils/page-builder/translation-manager';

// 翻译单个文本
const translated = await translationManager.translateText('你好世界', 'en', 'zh');

// 翻译整个页面布局
const translatedComponents = await translationManager.translatePageLayout(
  components, 
  'en', 
  'zh'
);

// 获取服务状态
const status = translationManager.getServiceStatus();
```

## 翻译质量对比

| 提供商 | 翻译质量 | 速度 | 成本 | 语言支持 | 推荐场景 |
|--------|----------|------|------|----------|----------|
| Google Translate | ⭐⭐⭐⭐ | 🚀🚀🚀 | 💰💰 | 🌍🌍🌍 | 通用翻译，语言覆盖广 |
| DeepL | ⭐⭐⭐⭐⭐ | 🚀🚀 | 💰💰💰 | 🌍🌍 | 高质量翻译，欧洲语言 |
| Azure | ⭐⭐⭐⭐ | 🚀🚀🚀 | 💰💰 | 🌍🌍🌍 | 企业级应用 |
| OpenAI | ⭐⭐⭐⭐⭐ | 🚀 | 💰💰💰💰 | 🌍🌍🌍 | 上下文理解，创意翻译 |

## 最佳实践

### 1. 提供商选择建议
- **通用用途**: Google Translate API
- **高质量要求**: DeepL API
- **企业环境**: Azure Translator
- **智能翻译**: OpenAI GPT

### 2. 性能优化
- 系统自动缓存翻译结果
- 支持批量翻译减少API调用
- 智能检测无需翻译的内容

### 3. 错误处理
- 翻译失败时自动回退到原文
- 详细的错误日志和用户提示
- 支持重试机制

## 费用预估

以 Google Translate API 为例：
- 免费额度：每月 50万字符
- 付费价格：$20/100万字符
- 一个典型Landing Page约 5000 字符
- 可翻译约 100 个页面（免费额度内）

## 故障排除

### 1. 翻译服务未配置
- 检查环境变量是否正确设置
- 验证API密钥是否有效
- 确认网络连接正常

### 2. 翻译质量问题
- 尝试不同的翻译提供商
- 检查源文本是否包含特殊字符
- 考虑使用OpenAI进行上下文翻译

### 3. 性能问题
- 启用翻译缓存
- 使用批量翻译接口
- 考虑异步处理大量内容

## 更新日志

- ✅ 移除硬编码翻译映射表
- ✅ 集成4种专业翻译API
- ✅ 添加翻译缓存机制
- ✅ 实现批量翻译功能
- ✅ 完善错误处理和用户体验