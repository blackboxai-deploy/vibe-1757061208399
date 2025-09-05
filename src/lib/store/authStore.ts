/**
 * Authentication State Management
 * Handles user authentication, login, and session management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProfile } from '../types';

export interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // OTP state
  otpData: {
    phoneNumber: string;
    isOtpSent: boolean;
    expiresAt: Date | null;
    retryCount: number;
  };

  // Actions
  login: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resendOtp: () => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      otpData: {
        phoneNumber: '',
        isOtpSent: false,
        expiresAt: null,
        retryCount: 0
      },

      // Actions
      login: async (phoneNumber: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate OTP sending (replace with actual Firebase/SMS service)
          const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
          });

          if (!response.ok) {
            throw new Error('Failed to send OTP');
          }

          const expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 5); // 5 minutes expiry

          set({
            otpData: {
              phoneNumber,
              isOtpSent: true,
              expiresAt,
              retryCount: 0
            },
            isLoading: false
          });

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to send OTP',
            isLoading: false 
          });
        }
      },

      verifyOtp: async (otp: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { phoneNumber } = get().otpData;
          
          // Simulate OTP verification (replace with actual Firebase/SMS service)
          const response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, otp })
          });

          if (!response.ok) {
            throw new Error('Invalid OTP');
          }

          const { user } = await response.json();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            otpData: {
              phoneNumber: '',
              isOtpSent: false,
              expiresAt: null,
              retryCount: 0
            }
          });

          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'OTP verification failed',
            isLoading: false 
          });
          return false;
        }
      },

      resendOtp: async () => {
        try {
          const { phoneNumber, retryCount } = get().otpData;
          
          if (retryCount >= 3) {
            throw new Error('Maximum retry attempts reached');
          }

          set({ isLoading: true, error: null });

          // Simulate OTP resending
          const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
          });

          if (!response.ok) {
            throw new Error('Failed to resend OTP');
          }

          const expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 5);

          set({
            otpData: {
              phoneNumber,
              isOtpSent: true,
              expiresAt,
              retryCount: retryCount + 1
            },
            isLoading: false
          });

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to resend OTP',
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          otpData: {
            phoneNumber: '',
            isOtpSent: false,
            expiresAt: null,
            retryCount: 0
          }
        });
      },

      updateProfile: async (profile: Partial<UserProfile>) => {
        try {
          const { user } = get();
          if (!user) throw new Error('User not authenticated');

          set({ isLoading: true, error: null });

          // Simulate profile update
          const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
          });

          if (!response.ok) {
            throw new Error('Failed to update profile');
          }

          const updatedUser = {
            ...user,
            profile: { ...user.profile, ...profile }
          };

          set({ user: updatedUser, isLoading: false });

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update profile',
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading })
    }),
    {
      name: 'grama-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);