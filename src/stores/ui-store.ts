import { create } from 'zustand';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface Modal {
  id: string;
  component: React.ComponentType<any>;
  props?: any;
}

interface UiState {
  // Theme
  theme: 'light' | 'dark' | 'system';

  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // Toasts
  toasts: Toast[];

  // Modals
  modals: Modal[];

  // Loading states
  globalLoading: boolean;

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  openModal: (component: React.ComponentType<any>, props?: any) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  setGlobalLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  // Initial state
  theme: 'system',
  sidebarOpen: true,
  sidebarCollapsed: false,
  toasts: [],
  modals: [],
  globalLoading: false,

  // Theme actions
  setTheme: (theme) => set({ theme }),

  // Sidebar actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  // Toast actions
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove toast after duration
    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration);

    return id;
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),

  // Modal actions
  openModal: (component, props) => {
    const id = Math.random().toString(36).substr(2, 9);
    const modal: Modal = { id, component, props };

    set((state) => ({
      modals: [...state.modals, modal],
    }));

    return id;
  },

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),

  closeAllModals: () => set({ modals: [] }),

  // Loading actions
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
}));
