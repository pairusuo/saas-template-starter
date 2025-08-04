import { create } from 'zustand';

interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'trialing'
    | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SubscriptionState {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSubscription: (subscription: Subscription | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateSubscription: (data: Partial<Subscription>) => void;
  clearError: () => void;

  // Helper methods
  isActive: () => boolean;
  isTrialing: () => boolean;
  isPastDue: () => boolean;
  willCancelAtPeriodEnd: () => boolean;
  getDaysUntilExpiry: () => number | null;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  isLoading: false,
  error: null,

  setSubscription: (subscription) =>
    set({
      subscription,
      error: null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  updateSubscription: (data) => {
    const currentSubscription = get().subscription;
    if (currentSubscription) {
      set({
        subscription: { ...currentSubscription, ...data },
      });
    }
  },

  clearError: () => set({ error: null }),

  // Helper methods
  isActive: () => {
    const subscription = get().subscription;
    return subscription?.status === 'active';
  },

  isTrialing: () => {
    const subscription = get().subscription;
    return subscription?.status === 'trialing';
  },

  isPastDue: () => {
    const subscription = get().subscription;
    return subscription?.status === 'past_due';
  },

  willCancelAtPeriodEnd: () => {
    const subscription = get().subscription;
    return subscription?.cancelAtPeriodEnd || false;
  },

  getDaysUntilExpiry: () => {
    const subscription = get().subscription;
    if (!subscription?.currentPeriodEnd) return null;

    const now = new Date();
    const endDate = new Date(subscription.currentPeriodEnd);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  },
}));
