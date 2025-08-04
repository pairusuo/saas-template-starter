// API utilities and helpers
import { ApiResponse, PaginatedResponse, ApiKeysResponse, CreateApiKeyResponse } from '@/types';
import { API_CONFIG, HTTP_STATUS } from './constants';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API client configuration
interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Request options
interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Enhanced fetch with timeout, retries, and error handling
 */
async function enhancedFetch(url: string, options: RequestOptions = {}): Promise<Response> {
  const {
    timeout = API_CONFIG.TIMEOUT,
    retries = API_CONFIG.RETRY_ATTEMPTS,
    retryDelay = API_CONFIG.RETRY_DELAY,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on the last attempt
      if (attempt === retries) {
        break;
      }

      // Don't retry on certain errors
      if (error instanceof TypeError || (error as any).name === 'AbortError') {
        break;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  clearTimeout(timeoutId);
  throw lastError!;
}

/**
 * API client class
 */
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || API_CONFIG.BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken() {
    delete this.defaultHeaders.Authorization;
  }

  /**
   * Make API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;

    const requestOptions: RequestOptions = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await enhancedFetch(url, requestOptions);

      let data: any;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.code || 'API_ERROR',
          data.message || data.error || 'An error occurred',
          data.details
        );
      }

      return {
        success: true,
        data,
        message: data.message,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'NETWORK_ERROR',
        '网络请求失败，请检查您的网络连接'
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return this.request<T>(url, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Upload file
   */
  async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    // Remove Content-Type header to let browser set it with boundary
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type'];

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });
  }
}

// Default API client instance
export const apiClient = new ApiClient();

/**
 * Helper functions for common API operations
 */

// Auth API helpers
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),

  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/register', data),

  forgotPassword: (email: string) => apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),

  logout: () => apiClient.post('/auth/logout'),
};

// User API helpers
export const userApi = {
  getProfile: () => apiClient.get('/users/profile'),

  updateProfile: (data: Record<string, any>) => apiClient.put('/users/profile', data),

  deleteAccount: () => apiClient.delete('/users/profile'),

  updatePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.put('/users/password', data),
};

// Subscription API helpers
export const subscriptionApi = {
  getSubscriptions: () => apiClient.get('/subscriptions'),

  cancelSubscription: (subscriptionId: string) =>
    apiClient.delete(`/subscriptions?subscriptionId=${subscriptionId}`),

  restoreSubscription: (subscriptionId: string) =>
    apiClient.post('/subscriptions', { subscriptionId }),
};

// API Key helpers
export const apiKeyApi = {
  getApiKeys: (): Promise<ApiResponse<ApiKeysResponse>> => apiClient.get('/api-keys'),

  createApiKey: (name: string): Promise<ApiResponse<CreateApiKeyResponse>> =>
    apiClient.post('/api-keys', { name }),

  updateApiKey: (id: string, data: { name?: string; isActive?: boolean }) =>
    apiClient.put(`/api-keys/${id}`, data),

  deleteApiKey: (id: string) => apiClient.delete(`/api-keys/${id}`),
};

// File API helpers
export const fileApi = {
  getFiles: (params?: { page?: number; limit?: number }) => apiClient.get('/files', params),

  uploadFile: (file: File, folder?: string) =>
    apiClient.upload('/files/upload', file, folder ? { folder } : undefined),

  deleteFile: (id: string) => apiClient.delete(`/files/${id}`),

  getFileUrl: (id: string) => apiClient.get(`/files/${id}/url`),
};

/**
 * Error handling helper
 */
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '发生了未知错误，请稍后重试';
}

/**
 * Format API response for UI consumption
 */
export function formatApiResponse<T>(response: ApiResponse<T>): {
  data: T | null;
  error: string | null;
} {
  if (response.success && response.data) {
    return { data: response.data, error: null };
  }

  return { data: null, error: response.error || '请求失败' };
}

/**
 * Helper for paginated API responses
 */
export function createPaginationParams(page: number, limit: number) {
  return {
    page: Math.max(1, page),
    limit: Math.max(1, Math.min(100, limit)),
  };
}

/**
 * Extract pagination info from response headers
 */
export function extractPaginationFromHeaders(headers: Headers) {
  return {
    total: parseInt(headers.get('X-Total-Count') || '0'),
    page: parseInt(headers.get('X-Page') || '1'),
    limit: parseInt(headers.get('X-Limit') || '20'),
  };
}
