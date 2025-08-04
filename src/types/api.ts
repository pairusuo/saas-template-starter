// API related types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface ApiKeysResponse {
  apiKeys: ApiKey[];
  total: number;
}

export interface CreateApiKeyResponse {
  message: string;
  apiKey: ApiKey;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  lastUsed: string | null;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface ApiUsage {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
}

// File upload types
export interface FileUpload {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  storageProvider: 'supabase' | 's3' | 'local';
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Request/Response types for specific endpoints
export interface CreateApiKeyRequest {
  name: string;
}

export interface UpdateApiKeyRequest {
  name?: string;
  isActive?: boolean;
}
