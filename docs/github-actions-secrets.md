# GitHub Actions Secrets 配置指南

此项目的CI/CD流水线需要配置以下GitHub Secrets。请在GitHub仓库的 Settings > Secrets and variables > Actions 中配置：

## 必需的Secrets

### Vercel部署相关

- `VERCEL_TOKEN`: Vercel API Token
  - 在 https://vercel.com/account/tokens 生成
  - 用于自动部署到Vercel平台

- `VERCEL_ORG_ID`: Vercel组织ID
  - 在Vercel项目设置中找到
  - 格式类似: `team_xxxxxxxxxxxxxxxxxxxxxxxx`

- `VERCEL_PROJECT_ID`: Vercel项目ID
  - 在Vercel项目设置中找到
  - 格式类似: `prj_xxxxxxxxxxxxxxxxxxxxxxxx`

### 通知相关

- `SLACK_WEBHOOK`: Slack Webhook URL (可选)
  - 用于部署状态通知
  - 格式: `https://hooks.slack.com/services/...`

### 安全扫描相关

- `SNYK_TOKEN`: Snyk API Token (可选但推荐)
  - 在 https://snyk.io/account 生成
  - 用于安全漏洞扫描

## 配置步骤

1. 进入GitHub仓库页面
2. 点击 Settings 标签
3. 在左侧菜单选择 "Secrets and variables" > "Actions"
4. 点击 "New repository secret"
5. 输入Secret名称和值
6. 点击 "Add secret"

## 验证配置

配置完成后，推送代码到main分支应该会自动触发部署流程。可以在Actions标签页查看流水线运行状态。

## 故障排除

- 如果部署失败，检查Vercel secrets是否正确配置
- 如果安全扫描失败，确认SNYK_TOKEN是否有效
- 查看Actions运行日志获取详细错误信息
