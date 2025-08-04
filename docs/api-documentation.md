# API 文档

本文档描述了 SaaS Template提供的所有 API 端点，方便进行二次开发和集成。

## 基础信息

- **基础 URL**: `https://your-domain.com/api`
- **API 版本**: v1
- **认证方式**: JWT Token 或 API Key
- **响应格式**: JSON
- **字符编码**: UTF-8

## 认证

### JWT Token 认证

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### API Key 认证

```http
X-API-Key: YOUR_API_KEY
```

## 响应格式

### 成功响应

```json
{
  "success": true,
  "data": {...},
  "message": "操作成功"
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": "详细错误信息"
  }
}
```

## 状态码

| 状态码 | 含义       |
| ------ | ---------- |
| 200    | 请求成功   |
| 201    | 创建成功   |
| 400    | 请求错误   |
| 401    | 未授权     |
| 403    | 禁止访问   |
| 404    | 资源不存在 |
| 422    | 验证失败   |
| 429    | 请求过多   |
| 500    | 服务器错误 |

## 端点列表

### 认证相关

#### 获取当前用户信息

```http
GET /api/auth/me
```

**响应示例**:

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "张三",
    "email": "zhangsan@example.com",
    "role": "user",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### 刷新 Token

```http
POST /api/auth/refresh
```

**请求体**:

```json
{
  "refreshToken": "refresh_token_here"
}
```

### 用户管理

#### 获取用户列表

```http
GET /api/users?page=1&limit=20&search=keyword
```

**查询参数**:

- `page`: 页码（默认: 1）
- `limit`: 每页数量（默认: 20，最大: 100）
- `search`: 搜索关键词
- `role`: 用户角色筛选
- `sort`: 排序字段
- `order`: 排序方向 (asc|desc)

**响应示例**:

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "name": "张三",
        "email": "zhangsan@example.com",
        "role": "user",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### 获取单个用户

```http
GET /api/users/{userId}
```

#### 更新用户信息

```http
PUT /api/users/{userId}
```

**请求体**:

```json
{
  "name": "新名称",
  "email": "new@example.com",
  "role": "admin"
}
```

#### 删除用户

```http
DELETE /api/users/{userId}
```

### API 密钥管理

#### 获取 API 密钥列表

```http
GET /api/api-keys
```

**响应示例**:

```json
{
  "success": true,
  "data": [
    {
      "id": "key_123",
      "name": "生产环境密钥",
      "key": "ak_prod_***...***abc",
      "lastUsed": "2024-01-01T00:00:00Z",
      "usageCount": 1250,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### 创建 API 密钥

```http
POST /api/api-keys
```

**请求体**:

```json
{
  "name": "密钥名称",
  "permissions": ["read", "write"]
}
```

#### 删除 API 密钥

```http
DELETE /api/api-keys/{keyId}
```

### 文件管理

#### 上传文件

```http
POST /api/files/upload
Content-Type: multipart/form-data
```

**请求体**:

```
file: 文件内容
folder: 文件夹名称（可选）
```

**响应示例**:

```json
{
  "success": true,
  "data": {
    "id": "file_123",
    "filename": "document.pdf",
    "originalName": "我的文档.pdf",
    "mimeType": "application/pdf",
    "size": 1024000,
    "url": "https://storage.example.com/files/document.pdf",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### 获取文件列表

```http
GET /api/files?page=1&limit=20&type=image
```

**查询参数**:

- `page`: 页码
- `limit`: 每页数量
- `type`: 文件类型 (image|document|video|audio)
- `search`: 搜索文件名

#### 删除文件

```http
DELETE /api/files/{fileId}
```

### 订阅和计费

#### 获取当前订阅

```http
GET /api/billing/subscription
```

**响应示例**:

```json
{
  "success": true,
  "data": {
    "id": "sub_123",
    "status": "active",
    "planId": "pro_monthly",
    "planName": "专业版月付",
    "currentPeriodStart": "2024-01-01T00:00:00Z",
    "currentPeriodEnd": "2024-02-01T00:00:00Z",
    "cancelAtPeriodEnd": false,
    "price": 2900,
    "currency": "USD"
  }
}
```

#### 创建结账会话

```http
POST /api/billing/create-checkout-session
```

**请求体**:

```json
{
  "priceId": "price_123",
  "successUrl": "https://yourapp.com/success",
  "cancelUrl": "https://yourapp.com/cancel"
}
```

#### 创建客户门户会话

```http
POST /api/billing/create-portal-session
```

### 使用统计

#### 获取使用统计

```http
GET /api/usage?period=month&feature=api_calls
```

**查询参数**:

- `period`: 统计周期 (day|week|month|year)
- `feature`: 功能类型
- `start`: 开始日期
- `end`: 结束日期

**响应示例**:

```json
{
  "success": true,
  "data": {
    "period": "month",
    "feature": "api_calls",
    "current": 15000,
    "limit": 50000,
    "percentage": 30,
    "history": [
      {
        "date": "2024-01-01",
        "count": 500
      }
    ]
  }
}
```

### 组织管理

#### 获取用户组织

```http
GET /api/organizations
```

#### 创建组织

```http
POST /api/organizations
```

**请求体**:

```json
{
  "name": "我的公司",
  "slug": "my-company",
  "description": "公司描述"
}
```

#### 邀请成员

```http
POST /api/organizations/{orgId}/members
```

**请求体**:

```json
{
  "email": "member@example.com",
  "role": "member"
}
```

### Webhook 管理

#### 获取 Webhook 列表

```http
GET /api/webhooks
```

#### 创建 Webhook

```http
POST /api/webhooks
```

**请求体**:

```json
{
  "url": "https://your-app.com/webhook",
  "events": ["user.created", "subscription.updated"],
  "secret": "webhook_secret"
}
```

## 错误代码

| 错误代码                   | 描述             |
| -------------------------- | ---------------- |
| `INVALID_API_KEY`          | API 密钥无效     |
| `INSUFFICIENT_PERMISSIONS` | 权限不足         |
| `RATE_LIMIT_EXCEEDED`      | 超出速率限制     |
| `VALIDATION_ERROR`         | 请求数据验证失败 |
| `RESOURCE_NOT_FOUND`       | 资源不存在       |
| `DUPLICATE_RESOURCE`       | 资源已存在       |
| `SUBSCRIPTION_REQUIRED`    | 需要有效订阅     |
| `QUOTA_EXCEEDED`           | 超出配额限制     |

## 速率限制

| 端点类型 | 限制         |
| -------- | ------------ |
| 认证端点 | 5 次/分钟    |
| 用户操作 | 100 次/分钟  |
| 文件上传 | 10 次/分钟   |
| API 调用 | 1000 次/小时 |

## SDK 和客户端库

### JavaScript/TypeScript

```bash
npm install @your-org/saas-sdk
```

```javascript
import { SaaSClient } from '@your-org/saas-sdk';

const client = new SaaSClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://your-domain.com/api',
});

// 获取用户信息
const user = await client.users.getCurrentUser();

// 上传文件
const file = await client.files.upload(fileData);
```

### Python

```bash
pip install your-org-saas-sdk
```

```python
from saas_sdk import SaaSClient

client = SaaSClient(
    api_key='your-api-key',
    base_url='https://your-domain.com/api'
)

# 获取用户信息
user = client.users.get_current_user()

# 创建用户
new_user = client.users.create({
    'name': '张三',
    'email': 'zhangsan@example.com'
})
```

## Webhook 事件

### 用户事件

- `user.created`: 用户创建
- `user.updated`: 用户更新
- `user.deleted`: 用户删除

### 订阅事件

- `subscription.created`: 订阅创建
- `subscription.updated`: 订阅更新
- `subscription.canceled`: 订阅取消

### 支付事件

- `payment.succeeded`: 支付成功
- `payment.failed`: 支付失败

### Webhook 载荷示例

```json
{
  "id": "evt_123",
  "type": "user.created",
  "data": {
    "id": "user_123",
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 最佳实践

### 1. API 密钥安全

- 不要在客户端代码中暴露 API 密钥
- 定期轮换 API 密钥
- 使用最小权限原则

### 2. 错误处理

- 始终检查响应状态
- 实现重试机制
- 记录错误日志

### 3. 性能优化

- 使用分页查询大量数据
- 实现客户端缓存
- 避免频繁的 API 调用

### 4. 监控和日志

- 监控 API 使用情况
- 设置使用配额警报
- 记录关键操作日志

## 支持

如果您在使用 API 过程中遇到问题：

1. 查看 [常见问题](faq.md)
2. 检查 [状态页面](https://status.your-domain.com)
3. 联系技术支持: api-support@your-domain.com
4. 访问开发者社区: https://discord.gg/your-invite

---

**注意**: 此 API 文档会持续更新，请关注版本变更通知。
