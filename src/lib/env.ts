// 简化的环境变量配置，只保留Landing Page需要的配置
const envSchema = {
  // App Config
  APP_NAME: process.env.APP_NAME || 'Landing Page Template',
  APP_DESCRIPTION: process.env.APP_DESCRIPTION || '一个简洁的多语言Landing Page模板',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',

  // Node Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export const env = envSchema;