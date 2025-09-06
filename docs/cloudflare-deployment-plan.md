# Cloudflare 全栈部署与功能路线图（记录）

本文件记录当前项目在 Cloudflare Pages（含 Functions）上的整体架构、支付与鉴权方案、数据模型与实施步骤，配合进度日志一并维护。

## 架构概览

- 前端与路由：Next.js App Router，使用 `@cloudflare/next-on-pages` 构建产物到 `.vercel/output`，部署到 Cloudflare Pages。
- 鉴权：Auth.js v5（Edge 兼容）+ GitHub OAuth；会话使用 JWT Cookie；用户主数据与授权状态落 Cloudflare D1。
- 数据库：Cloudflare D1（SQLite），保存用户、一次性购买授权（entitlements）、项目与导出记录。
- 支付：Stripe Checkout（一次性支付，mode=payment），Webhook 在 Pages Functions/Worker，支付完成后授予 `builder_access`。
- 存储与队列（可选）：KV（轻量会话/速率限制）、Queues（异步导出/推送 GitHub 私库）。
- 导出：
  - Zip 导出：基于模板拼装 Zip，不使用 Node fs。
  - GitHub 私库：通过用户 `repo` scope，使用 Git Trees/Contents API 创建私有仓库并推送初始代码。
- 运行时约束：Workers 环境不支持 Node 内置模块与 Node Stripe SDK；后端使用标准 Web API（fetch/Web Crypto）与绑定（D1/KV）。

## 数据模型（D1 初版）

- `users(id, github_id, email, name, avatar, created_at, updated_at)`
- `accounts(user_id, provider, provider_account_id, access_token_enc, token_scope, expires_at)` 可选
- `entitlements(user_id, feature_key, source, granted_at)` — 例如 `feature_key = 'builder_access'`
- `purchases(id, user_id, stripe_checkout_session_id, amount, currency, status, created_at)`
- `projects(id, user_id, name, slug, layout_json, updated_at)`
- `exports(id, project_id, target, status, repo_full_name, download_url, created_at)`

## 关键流程

- 登录：GitHub OAuth 登录 → Upsert `users` 与 `accounts` → 设置 JWT Session。
- 付费：创建 Stripe Checkout（mode=payment）→ 支付成功 Webhook（`checkout.session.completed`）→ 写 `purchases` 与授予 `entitlements`。
- 授权控制：访问 `/{locale}/page-builder` 与 `api/page-builder/*` 需登录且拥有 `builder_access`。
- 导出：
  - Zip：读取静态模板（public/export-templates/**）+ 组件清单 → 生成 Zip 返回下载。
  - GitHub：如需增权 `repo`，获取/刷新 token → 调用 GitHub API 创建私有仓库并推送文件；异步可用 Queues。

## Cloudflare 配置建议

- `wrangler.toml`：
  - `compatibility_date = "2024-05-02"`
  - `[pages] build_output_dir = ".vercel/output"`
  - 需时再添加：`[[d1_databases]] binding = "DB" ...`（修改配置需人工批准，遵守 .airules）
- Pages 环境变量（Prod/Preview 分别）：
  - GitHub：`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
  - Auth：`AUTH_SECRET`
  - Stripe：`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`

## 实施步骤（分期）

1) 初始化 D1 schema 与代码访问层（不修改 wrangler 配置，等待批准）
2) 接入 Auth.js v5 GitHub 登录（Edge 兼容）+ JWT 会话 + 用户 Upsert
3) Stripe 一次性支付：Checkout + Webhook（Workers 版，WebCrypto 校验）
4) Builder 授权拦截（页面与 API）
5) 导出 Zip（Workers 兼容：模板化，无 fs）
6) 导出到 GitHub 私库（`repo` scope，异步/同步）

## 约束与注意

- 避免使用 Node-only 模块（fs/path/Node Stripe SDK）；后端统一用 Web API。
- 遵守 .airules：
  - 不直接部署生产，仅 Preview 调试
  - 未经批准不随意修改配置与样式
  - 使用 pnpm，不使用 npm/yarn
  - 每个功能点完成后，在 tmp 输出 md 总结

