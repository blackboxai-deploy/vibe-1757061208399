/**
 * Shopping Cart State Management
 * Handles cart items, quantities, pricing, and checkout
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartTotal, Product, ProductVariant } from '../types';

export interface CartState {
  // State
  items: CartItem[];
  total: CartTotal;
  isLoading: boolean;
  error: string | null;

  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  
  // Getters
  getItemCount: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
  hasItem: (productId: string, variantId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: {
        subtotal: 0,
        tax: 0,
        deliveryFee: 0,
        discount: 0,
        total: 0,
        savings: 0
      },
      isLoading: false,
      error: null,

      // Actions
      addItem: (product: Product, variant: ProductVariant, quantity = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.product.id === product.id && item.variant.id === variant.id
        );

        let updatedItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          updatedItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            product,
            variant,
            quantity,
            addedAt: { 
              seconds: Math.floor(Date.now() / 1000), 
              nanoseconds: 0,
              toDate: () => new Date()
            }
          };
          updatedItems = [...items, newItem];
        }

        set({ items: updatedItems });
        get().calculateTotal();
      },

      removeItem: (itemId: string) => {
        const items = get().items.filter(item => item.id !== itemId);
        set({ items });
        get().calculateTotal();
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const items = get().items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        
        set({ items });
        get().calculateTotal();
      },

      clearCart: () => {
        set({ 
          items: [],
          total: {
            subtotal: 0,
            tax: 0,
            deliveryFee: 0,
            discount: 0,
            total: 0,
            savings: 0
          }
        });
      },

      calculateTotal: () => {
        const items = get().items;
        
        const subtotal = items.reduce((sum, item) => {
          return sum + (item.variant.price * item.quantity);
        }, 0);

        // Tax calculation (5% GST)
        const tax = subtotal * 0.05;
        
        // Delivery fee (free for orders above ₹500)
        const deliveryFee = subtotal >= 500 ? 0 : 49;
        
        // Discount (can be applied via promo codes)
        const discount = 0; // This will be updated when promo codes are applied
        
        const total = subtotal + tax + deliveryFee - discount;
        const savings = items.reduce((sum, item) => {
          const comparePrice = item.product.pricing.basePrice;
          const currentPrice = item.variant.price;
          return sum + ((comparePrice - currentPrice) * item.quantity);
        }, 0);

        set({
          total: {
            subtotal,
            tax,
            deliveryFee,
            discount,
            total: Math.max(0, total),
            savings
          }
        });
      },

      applyPromoCode: async (code: string) => {
        try {
          set({ isLoading: true, error: null });

          // Simulate promo code validation
          const response = await fetch('/api/promo/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, cartTotal: get().total.subtotal })
          });

          if (!response.ok) {
            throw new Error('Invalid promo code');
          }

          const { discount } = await response.json();
          
          // Update total with discount
          const currentTotal = get().total;
          const newTotal = {
            ...currentTotal,
            discount,
            total: Math.max(0, currentTotal.subtotal + currentTotal.tax + currentTotal.deliveryFee - discount)
          };

          set({ total: newTotal, isLoading: false });
          return true;

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to apply promo code',
            isLoading: false 
          });
          return false;
        }
      },

      removePromoCode: () => {
        get().calculateTotal(); // Recalculate without discount
      },

      // Getters
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemById: (itemId: string) => {
        return get().items.find(item => item.id === itemId);
      },

      hasItem: (productId: string, variantId: string) => {
        return get().items.some(
          item => item.product.id === productId && item.variant.id === variantId
        );
      }
    }),
    {
      name: 'grama-cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total
      })
    }
  )
);