/**
 * Application State Management
 * Handles global app state, theme, language, and UI preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  // Theme and UI
  theme: 'light' | 'dark' | 'auto';
  language: 'hindi' | 'english';
  isOnline: boolean;
  
  // Location and delivery
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  selectedAddress: string | null;
  
  // App state
  isLoading: boolean;
  notifications: AppNotification[];
  banners: AppBanner[];
  
  // Settings
  settings: {
    pushNotifications: boolean;
    locationServices: boolean;
    biometricAuth: boolean;
    autoSync: boolean;
  };

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: 'hindi' | 'english') => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setCurrentLocation: (location: { latitude: number; longitude: number } | null) => void;
  setSelectedAddress: (addressId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setBanners: (banners: AppBanner[]) => void;
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    url: string;
  };
  createdAt: Date;
  expiresAt?: Date;
}

export interface AppBanner {
  id: string;
  title: string;
  description: string;
  image: string;
  action: {
    type: 'url' | 'route' | 'modal';
    value: string;
    label: string;
  };
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  priority: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'light',
      language: 'english',
      isOnline: true,
      currentLocation: null,
      selectedAddress: null,
      isLoading: false,
      notifications: [],
      banners: [],
      settings: {
        pushNotifications: true,
        locationServices: true,
        biometricAuth: false,
        autoSync: true
      },

      // Actions
      setTheme: (theme) => set({ theme }),
      
      setLanguage: (language) => set({ language }),
      
      setOnlineStatus: (isOnline) => set({ isOnline }),
      
      setCurrentLocation: (location) => set({ currentLocation: location }),
      
      setSelectedAddress: (addressId) => set({ selectedAddress: addressId }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      addNotification: (notification) => {
        const newNotification: AppNotification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date()
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }));
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },
      
      clearNotifications: () => set({ notifications: [] }),
      
      setBanners: (banners) => set({ banners }),
      
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      }
    }),
    {
      name: 'grama-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        selectedAddress: state.selectedAddress,
        settings: state.settings
      })
    }
  )
);