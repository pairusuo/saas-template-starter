# 本地配置环境变量并一键部署到 Cloudflare Pages（Production/Preview）

## 1) 本地准备

- 安装 wrangler v3，并登录：
  - `npm i -g wrangler` 或 `pnpm dlx wrangler --version`
  - `wrangler login`
- 确认使用 pnpm：`pnpm -v`

## 2) 创建本地环境文件（忽略提交）

在项目根目录创建：

- `.env.production`
- `.env.preview`

`.gitignore` 已忽略上述文件，不会提交仓库。

建议包含（按需精简）：

```
AUTH_SECRET=your_random_32+_chars
NEXT_PUBLIC_APP_URL=https://<your-project>.pages.dev

GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# 可选：翻译服务
TRANSLATION_PROVIDER=google
GOOGLE_TRANSLATE_API_KEY=...
```

## 3) 同步到 Cloudflare Pages 环境变量（Production/Preview）

```
CF_PAGES_PROJECT=<你的Pages项目名> ./scripts/cf-sync-env.sh all
```

脚本会读取 `.env.production` 与 `.env.preview`，把键值以“Secrets”的形式写入对应环境。

提示：也可以在控制台手动设置（Pages → 项目 → Settings → Environment variables）。

## 4) 绑定 D1 并初始化（一次性）

在 Cloudflare 控制台创建 D1 数据库，并将绑定名设为 `DB`（与代码一致）。

初始化表（任选其一）：

- 控制台 D1 → Console 粘贴执行 `migrations/0001_init.sql` 内容。
- 或本地：
  - `wrangler d1 execute <DB_NAME> --remote --file migrations/0001_init.sql`

## 5) 构建与一键部署（Production + Preview）

```
CF_PAGES_PROJECT=<你的Pages项目名> ./scripts/cf-deploy-all.sh
```

脚本会：

- 使用 `pnpm cf:build` 生成 `.vercel/output`
- 部署到 Production（默认）
- 以时间戳 branch 额外创建一份 Preview 部署

## 6) 第三方平台回调与配置

- GitHub OAuth 回调：
  - `${NEXT_PUBLIC_APP_URL}/api/auth/github/callback`
- Stripe Webhook：
  - `${NEXT_PUBLIC_APP_URL}/api/webhooks/stripe-worker`

## 7) 验证

- 访问 `${NEXT_PUBLIC_APP_URL}`，确认路由与多语言
- 登录 GitHub → 购买 → 进入 Builder → 导出 ZIP 或导出到 GitHub 私库

