// Export all types from this directory
export * from './auth';
export * from './user';
export * from './subscription';
export * from './api';
export * from './ui';

// Common utility types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Date types
export type DateString = string; // ISO date string
export type Timestamp = number; // Unix timestamp

// ID types
export type UserId = string;
export type SubscriptionId = string;
export type ApiKeyId = string;
export type FileId = string;

// Status types
export type UserRole = 'user' | 'admin';
export type SubscriptionStatus = 'active' | 'inactive' | 'canceled' | 'past_due';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'canceled';

// Environment types
export type Environment = 'development' | 'staging' | 'production';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
