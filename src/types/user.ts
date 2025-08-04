// User related types
export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'user' | 'admin';
  credits: number;
  subscriptionStatus: 'active' | 'inactive' | 'canceled' | 'past_due';
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  // OAuth provider information
  oauthProviders?: string[]; // e.g., ['github', 'google']
  isOAuthUser?: boolean; // true if user signed up via OAuth
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'zh' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showActivity: boolean;
  };
}

export interface UserUsage {
  userId: string;
  feature: string;
  count: number;
  date: Date;
  metadata?: Record<string, any>;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'login' | 'api_call' | 'file_upload' | 'subscription' | 'payment';
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface UserStats {
  totalApiCalls: number;
  totalFileUploads: number;
  totalStorageUsed: number;
  creditsUsed: number;
  creditsRemaining: number;
}
