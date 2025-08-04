import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
    password: z
      .string()
      .min(8, '密码至少需要8个字符')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '密码必须包含至少一个大写字母、一个小写字母和一个数字'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, '重置令牌不能为空'),
    password: z
      .string()
      .min(8, '密码至少需要8个字符')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '密码必须包含至少一个大写字母、一个小写字母和一个数字'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// User profile validation schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符').optional(),
  email: z.string().email('请输入有效的邮箱地址').optional(),
  image: z.string().url('请输入有效的头像链接').optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '请输入当前密码'),
    newPassword: z
      .string()
      .min(8, '新密码至少需要8个字符')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '新密码必须包含至少一个大写字母、一个小写字母和一个数字'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '两次输入的新密码不一致',
    path: ['confirmPassword'],
  });

// API key validation schemas
export const createApiKeySchema = z.object({
  name: z.string().min(1, 'API 密钥名称不能为空').max(100, 'API 密钥名称不能超过100个字符'),
});

export const updateApiKeySchema = z.object({
  name: z
    .string()
    .min(1, 'API 密钥名称不能为空')
    .max(100, 'API 密钥名称不能超过100个字符')
    .optional(),
  isActive: z.boolean().optional(),
});

// File upload validation schemas
export const fileUploadSchema = z
  .object({
    file: z.instanceof(File, { message: '请选择一个文件' }),
    folder: z.string().optional(),
  })
  .refine(
    (data) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      return data.file.size <= maxSize;
    },
    {
      message: '文件大小不能超过10MB',
      path: ['file'],
    }
  )
  .refine(
    (data) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'text/plain',
        'application/json',
        'text/csv',
      ];
      return allowedTypes.includes(data.file.type);
    },
    {
      message: '不支持的文件类型',
      path: ['file'],
    }
  );

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.string().min(5, '主题至少需要5个字符').max(100, '主题不能超过100个字符'),
  message: z.string().min(10, '消息至少需要10个字符').max(1000, '消息不能超过1000个字符'),
});

// Search validation schema
export const searchSchema = z.object({
  query: z.string().min(1, '搜索关键词不能为空').max(100, '搜索关键词不能超过100个字符'),
  type: z.enum(['all', 'users', 'files', 'api_keys']).optional().default('all'),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
});

// Pagination validation schema
export const paginationSchema = z.object({
  page: z.number().min(1, '页码必须大于0').optional().default(1),
  limit: z
    .number()
    .min(1, '每页数量必须大于0')
    .max(100, '每页数量不能超过100')
    .optional()
    .default(20),
});

// Organization validation schemas
export const createOrganizationSchema = z.object({
  name: z.string().min(2, '组织名称至少需要2个字符').max(100, '组织名称不能超过100个字符'),
  slug: z
    .string()
    .min(3, '组织标识至少需要3个字符')
    .max(50, '组织标识不能超过50个字符')
    .regex(/^[a-z0-9-]+$/, '组织标识只能包含小写字母、数字和连字符'),
  description: z.string().max(500, '组织描述不能超过500个字符').optional(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  role: z.enum(['admin', 'member'], {
    errorMap: () => ({ message: '请选择有效的角色' }),
  }),
});

// Helper function to validate data with schema
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

// Helper function to get field errors
export function getFieldErrors(errors: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  errors.issues.forEach((issue) => {
    const path = issue.path.join('.');
    fieldErrors[path] = issue.message;
  });
  return fieldErrors;
}
