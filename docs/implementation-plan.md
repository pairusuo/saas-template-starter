# 实施计划（任务清单）

- 写入与归档：已将总体方案记录到 `docs/cloudflare-deployment-plan.md`。
- 任务列表：
  1. D1 数据库初始化（迁移脚本 + 访问层）
  2. GitHub 登录（Auth.js v5、Edge 兼容）+ JWT 会话
  3. Stripe 一次性支付（Checkout + Webhook Workers 版）
  4. 授权控制（builder_access）拦截页面与 API
  5. 导出 Zip（模板化，无 Node fs）
  6. 导出到 GitHub 私库（`repo` scope）
- 配置修改：涉及 `wrangler.toml` 与 Pages 变量的修改会在得到批准后执行。
- 工具约束：使用 pnpm；仅部署到 Preview；每个功能完成后在 tmp 输出 md 总结。

