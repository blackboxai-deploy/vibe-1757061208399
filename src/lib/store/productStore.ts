/**
 * Product State Management
 * Handles product catalog, search, filters, and recommendations
 */

// Placeholder for product store - will be expanded when Zustand is available
export interface ProductState {
  products: any[];
  categories: any[];
  searchQuery: string;
  filters: any;
  isLoading: boolean;
  error: string | null;
}

export const useProductStore = () => ({
  products: [],
  categories: [],
  searchQuery: '',
  filters: {},
  isLoading: false,
  error: null
});