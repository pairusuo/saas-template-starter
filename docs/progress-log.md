# 实施进度记录

- [init] 建立部署方案与实施计划文档：
  - docs/cloudflare-deployment-plan.md
  - docs/implementation-plan.md

- [d1] 添加初始迁移脚本 `migrations/0001_init.sql` 与 D1 访问层 `src/lib/db.ts`（未修改 wrangler 配置，待批准后绑定）。

- [auth] 自实现 GitHub OAuth 骨架（authorize/callback + JWT Cookie + session API），新增 `hasBuilderAccess` 与检查接口。

- [stripe] 新增 Checkout API（一次性支付）与 Webhook（Workers 版，签名校验），支付成功授予 `builder_access`。

- [gate] 在 `/{locale}/page-builder` 添加服务器端授权拦截与购买引导（最小改动）。

- [export] 新增 Workers 兼容的轻量导出端点 `api/page-builder/export-lite`（作为完整导出的基础验证）。

- 下一步：完善导出模板（复制所需组件与消息），以及“导出到 GitHub 私库”的 API 骨架；待你批准后添加 wrangler D1 绑定配置。
