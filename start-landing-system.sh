#!/bin/bash

# Landing Page + 支付系统启动脚本
# 一键启动完整的可视化页面构建和支付系统

echo "🚀 正在启动 Landing Page + 支付系统..."
echo "================================================"

# 检查 Node.js 版本
echo "✅ 检查 Node.js 版本..."
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 检查环境变量
echo ""
echo "✅ 检查环境变量..."

# 基础环境变量
if [ -z "$NEXT_PUBLIC_APP_URL" ]; then
    echo "⚠️  NEXT_PUBLIC_APP_URL 未设置，使用默认值: http://localhost:3000"
    export NEXT_PUBLIC_APP_URL="http://localhost:3000"
fi

# Stripe 环境变量
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "⚠️  STRIPE_SECRET_KEY 未设置 - 支付功能将不可用"
    echo "   请在 .env.local 中配置您的 Stripe 密钥"
else
    echo "✅ Stripe 密钥已配置"
fi

if [ -z "$STRIPE_WEBHOOK_SECRET" ]; then
    echo "⚠️  STRIPE_WEBHOOK_SECRET 未设置 - Webhook 处理将不可用"
else
    echo "✅ Stripe Webhook 密钥已配置"
fi

# 创建必要的数据目录
echo ""
echo "✅ 创建必要的目录..."
mkdir -p data/landing-pages
mkdir -p data/checkout-sessions
mkdir -p data/subscriptions
mkdir -p data/customers
mkdir -p public/generated-pages

echo "✅ 数据目录已创建"

# 安装依赖
echo ""
echo "✅ 检查并安装依赖..."
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
else
    echo "依赖已存在，跳过安装"
fi

# 构建项目
echo ""
echo "✅ 构建项目..."
npm run build

# 创建示例 Landing Page 数据
echo ""
echo "✅ 创建示例数据..."

# 示例 Landing Page 配置
cat > data/landing-pages/example-saas.json << 'EOF'
{
  "slug": "example-saas",
  "title": "示例 SaaS 产品",
  "description": "这是一个示例 SaaS 产品的 Landing Page",
  "isPublished": true,
  "config": {
    "components": [
      {
        "id": "hero_1",
        "type": "HeroCentered",
        "props": {
          "title": "革命性的 SaaS 解决方案",
          "subtitle": "帮助您的企业实现数字化转型，提升效率和竞争力",
          "primaryCTA": { "text": "开始免费试用", "href": "#pricing" },
          "secondaryCTA": { "text": "观看演示", "href": "#demo" }
        },
        "order": 1
      },
      {
        "id": "features_1",
        "type": "FeaturesGridBuilder",
        "props": {
          "title": "强大的功能特性",
          "subtitle": "一切您需要的功能，应有尽有",
          "features": [
            {
              "title": "易于使用",
              "description": "直观的界面设计，零学习成本",
              "icon": "Zap"
            },
            {
              "title": "高度安全",
              "description": "企业级安全保障，数据绝对安全",
              "icon": "Shield"
            },
            {
              "title": "快速响应",
              "description": "毫秒级响应速度，极致用户体验",
              "icon": "Clock"
            }
          ]
        },
        "order": 2
      },
      {
        "id": "pricing_1",
        "type": "PricingCardsBuilder",
        "props": {
          "title": "选择适合您的方案",
          "subtitle": "灵活的定价，满足不同需求",
          "showAnnualToggle": true,
          "highlightPopular": true
        },
        "order": 3
      }
    ],
    "paymentConfig": {
      "provider": "stripe",
      "currency": "USD",
      "locale": "en",
      "mode": "subscription"
    },
    "plans": [
      {
        "id": "starter",
        "name": "入门版",
        "description": "适合个人开发者",
        "monthlyPrice": 29,
        "annualPrice": 290,
        "stripePriceMonthlyId": "price_starter_monthly",
        "stripePriceAnnualId": "price_starter_annual",
        "features": [
          { "name": "5个项目", "included": true },
          { "name": "10GB存储", "included": true },
          { "name": "基础支持", "included": true },
          { "name": "高级分析", "included": false }
        ]
      },
      {
        "id": "pro",
        "name": "专业版",
        "description": "适合成长团队",
        "monthlyPrice": 99,
        "annualPrice": 999,
        "popular": true,
        "stripePriceMonthlyId": "price_pro_monthly",
        "stripePriceAnnualId": "price_pro_annual",
        "features": [
          { "name": "无限项目", "included": true },
          { "name": "100GB存储", "included": true },
          { "name": "优先支持", "included": true },
          { "name": "高级分析", "included": true }
        ]
      }
    ]
  },
  "userId": "user_example",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "views": 1250,
  "conversions": 45,
  "revenue": 4455
}
EOF

echo "✅ 示例 Landing Page 已创建: /landing/example-saas"

# 启动开发服务器
echo ""
echo "🎉 启动完成！"
echo "================================================"
echo ""
echo "📋 可用的功能:"
echo "   • 可视化页面构建器"
echo "   • 组件市场系统"
echo "   • 支付系统集成 (Stripe)"
echo "   • 订阅管理"
echo "   • 数据分析仪表板"
echo ""
echo "🔗 重要链接:"
echo "   • 首页: $NEXT_PUBLIC_APP_URL"
echo "   • 示例页面: $NEXT_PUBLIC_APP_URL/landing/example-saas"
echo "   • 用户仪表板: $NEXT_PUBLIC_APP_URL/dashboard"
echo "   • 页面构建器: $NEXT_PUBLIC_APP_URL/builder (待实现)"
echo ""
echo "⚙️  配置说明:"
echo "   • 在 .env.local 中配置 Stripe 密钥以启用支付功能"
echo "   • 支付测试需要配置 Stripe Webhook 端点"
echo "   • 数据存储在 ./data/ 目录中"
echo ""
echo "📚 文档:"
echo "   • 查看 COMPLETE_USAGE_GUIDE.md 了解完整使用流程"
echo "   • 查看 LANDING_PAGE_PAYMENT_FLOW.md 了解支付流程"
echo ""

# 检查端口是否被占用
port_check=$(lsof -ti:3000)
if [ ! -z "$port_check" ]; then
    echo "⚠️  端口 3000 已被占用，请手动停止其他服务或使用其他端口"
    echo "   停止占用进程: kill -9 $port_check"
    echo "   或使用其他端口: npm run dev -- -p 3001"
    echo ""
fi

echo "🚀 正在启动开发服务器..."
echo "   访问 $NEXT_PUBLIC_APP_URL 开始使用"
echo ""

# 启动开发服务器
npm run dev
