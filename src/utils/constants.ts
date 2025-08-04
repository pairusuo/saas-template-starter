// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/json',
    'text/csv',
    'application/zip',
  ],
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/json', 'text/csv'],
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due',
  TRIALING: 'trialing',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  UNPAID: 'unpaid',
  PAUSED: 'paused',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELED: 'canceled',
} as const;

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Languages
export const LANGUAGES = {
  CHINESE: 'zh',
  ENGLISH: 'en',
} as const;

// Storage Providers
export const STORAGE_PROVIDERS = {
  SUPABASE: 'supabase',
  S3: 's3',
  LOCAL: 'local',
} as const;

// Activity Types
export const ACTIVITY_TYPES = {
  LOGIN: 'login',
  API_CALL: 'api_call',
  FILE_UPLOAD: 'file_upload',
  SUBSCRIPTION: 'subscription',
  PAYMENT: 'payment',
  PROFILE_UPDATE: 'profile_update',
  PASSWORD_CHANGE: 'password_change',
  API_KEY_CREATE: 'api_key_create',
  API_KEY_DELETE: 'api_key_delete',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  API_CALLS_PER_MINUTE: 100,
  FILE_UPLOADS_PER_HOUR: 50,
  PASSWORD_RESET_PER_HOUR: 3,
  LOGIN_ATTEMPTS_PER_HOUR: 10,
} as const;

// Credit System
export const CREDITS = {
  INITIAL_CREDITS: 100,
  API_CALL_COST: 1,
  FILE_UPLOAD_COST: 5,
  STORAGE_COST_PER_GB: 10, // per month
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD',
  DISPLAY_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  RELATIVE: 'relative', // for libraries like dayjs/moment
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PHONE: /^\+?[\d\s-()]{10,}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9-]+$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: '发生了未知错误，请稍后重试',
  NETWORK: '网络连接失败，请检查您的网络设置',
  UNAUTHORIZED: '您没有权限执行此操作',
  FORBIDDEN: '访问被拒绝',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION: '输入数据验证失败',
  RATE_LIMIT: '请求过于频繁，请稍后重试',
  SERVER_ERROR: '服务器内部错误，请稍后重试',
  FILE_TOO_LARGE: '文件大小超出限制',
  INVALID_FILE_TYPE: '不支持的文件类型',
  EXPIRED_SESSION: '会话已过期，请重新登录',
  INSUFFICIENT_CREDITS: '积分不足',
  SUBSCRIPTION_REQUIRED: '需要有效的订阅',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: '个人资料更新成功',
  PASSWORD_CHANGED: '密码修改成功',
  FILE_UPLOADED: '文件上传成功',
  API_KEY_CREATED: 'API 密钥创建成功',
  API_KEY_DELETED: 'API 密钥删除成功',
  SUBSCRIPTION_UPDATED: '订阅更新成功',
  PAYMENT_SUCCESSFUL: '支付成功',
  EMAIL_SENT: '邮件发送成功',
  SETTINGS_SAVED: '设置保存成功',
} as const;

// Feature Flags (can be used for gradual rollouts)
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_ORGANIZATIONS: false,
  ENABLE_FILE_SHARING: true,
  ENABLE_API_ANALYTICS: true,
  ENABLE_ADVANCED_SEARCH: false,
  ENABLE_WEBHOOKS: false,
} as const;

// Environment Types
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

// Log Levels
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const;
