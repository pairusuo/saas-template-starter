// Data formatting utilities

/**
 * Format file size in bytes to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format number with thousand separators
 * Uses user's locale for proper formatting
 */
export function formatNumber(num: number, locale?: string): string {
  const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  return new Intl.NumberFormat(userLocale).format(num);
}

/**
 * Format currency amount
 * Uses user's locale by default
 */
export function formatCurrency(amount: number, currency = 'USD', locale?: string): string {
  const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 * Uses Intl.RelativeTimeFormat for internationalized output
 */
export function formatRelativeTime(date: Date | string, locale?: string): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  // Use the provided locale, or fall back to navigator language, or default to en-US
  let userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

  // Map Next.js locale codes to proper Intl locale codes
  const localeMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en-US',
  };

  userLocale = localeMap[userLocale] || userLocale;

  const rtf = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-Math.floor(diffInSeconds), 'second');
  } else if (Math.abs(diffInSeconds) < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return rtf.format(-minutes, 'minute');
  } else if (Math.abs(diffInSeconds) < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return rtf.format(-hours, 'hour');
  } else if (Math.abs(diffInSeconds) < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return rtf.format(-days, 'day');
  } else if (Math.abs(diffInSeconds) < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return rtf.format(-months, 'month');
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return rtf.format(-years, 'year');
  }
}

/**
 * Format date to display format
 * Uses user's locale for proper formatting
 */
export function formatDate(date: Date | string, includeTime = false, locale?: string): string {
  const target = new Date(date);
  const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

  if (includeTime) {
    return target.toLocaleString(userLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return target.toLocaleDateString(userLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Format duration in milliseconds to human readable format
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else if (ms < 3600000) {
    return `${(ms / 60000).toFixed(1)}m`;
  } else {
    return `${(ms / 3600000).toFixed(1)}h`;
  }
}

/**
 * Truncate string to specified length with ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Format API endpoint path
 */
export function formatApiPath(path: string): string {
  // Remove leading slash and ensure proper formatting
  return path.replace(/^\/+/, '').replace(/\/+/g, '/');
}

/**
 * Format user role for display
 * Note: This function returns English keys that should be translated in the UI
 */
export function formatUserRole(role: string): string {
  const roleMap: Record<string, string> = {
    admin: 'admin',
    user: 'user',
  };
  return roleMap[role] || role;
}

/**
 * Format subscription status for display
 * Note: This function returns English keys that should be translated in the UI
 */
export function formatSubscriptionStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'active',
    inactive: 'inactive',
    canceled: 'canceled',
    past_due: 'past_due',
    trialing: 'trialing',
    incomplete: 'incomplete',
    incomplete_expired: 'incomplete_expired',
    unpaid: 'unpaid',
    paused: 'paused',
  };
  return statusMap[status] || status;
}

/**
 * Format activity type for display
 * Note: This function returns English keys that should be translated in the UI
 */
export function formatActivityType(type: string): string {
  const typeMap: Record<string, string> = {
    login: 'login',
    api_call: 'api_call',
    file_upload: 'file_upload',
    subscription: 'subscription',
    payment: 'payment',
    profile_update: 'profile_update',
    password_change: 'password_change',
    api_key_create: 'api_key_create',
    api_key_delete: 'api_key_delete',
  };
  return typeMap[type] || type;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Check if it's a Chinese mobile number
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }

  // Return original if format is not recognized
  return phone;
}

/**
 * Format credit amount
 */
export function formatCredits(credits: number): string {
  if (credits >= 1000000) {
    return `${(credits / 1000000).toFixed(1)}M`;
  } else if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}K`;
  }
  return credits.toString();
}

/**
 * Format API usage statistics
 */
export function formatApiUsage(usage: number, limit: number): string {
  const percentage = (usage / limit) * 100;
  return `${formatNumber(usage)} / ${formatNumber(limit)} (${percentage.toFixed(1)}%)`;
}

/**
 * Format storage usage
 */
export function formatStorageUsage(used: number, total: number): string {
  const usedFormatted = formatFileSize(used);
  const totalFormatted = formatFileSize(total);
  const percentage = (used / total) * 100;
  return `${usedFormatted} / ${totalFormatted} (${percentage.toFixed(1)}%)`;
}

/**
 * Format time remaining using Intl.RelativeTimeFormat
 * Uses user's locale for proper formatting
 */
export function formatTimeRemaining(endDate: Date | string, locale?: string): string {
  const now = new Date();
  const end = new Date(endDate);
  const diffInSeconds = Math.floor((end.getTime() - now.getTime()) / 1000);

  const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  const rtf = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });

  if (diffInSeconds <= 0) {
    // Return a generic message for expired items
    // UI should handle translation of "expired" status
    return 'expired';
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return rtf.format(minutes, 'minute');
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return rtf.format(hours, 'hour');
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return rtf.format(days, 'day');
  }
}

/**
 * Format URL for display (remove protocol and www)
 */
export function formatDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
