/**
 * Vendor State Management
 * Handles vendor dashboard, products, and analytics
 */

// Placeholder for vendor store
export interface VendorState {
  profile: any | null;
  products: any[];
  orders: any[];
  analytics: any;
  isLoading: boolean;
  error: string | null;
}

export const useVendorStore = () => ({
  profile: null,
  products: [],
  orders: [],
  analytics: {},
  isLoading: false,
  error: null
});