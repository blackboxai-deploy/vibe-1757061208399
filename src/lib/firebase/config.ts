/**
 * Firebase Configuration for Grama Groceries
 * Complete Firebase setup for authentication, database, and storage
 */

// Firebase configuration (placeholder for now)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "grama-groceries.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "grama-groceries",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "grama-groceries.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-DEMO123"
};

// Firebase placeholder services (will be replaced with actual Firebase when configured)
export const firebaseApp = firebaseConfig;
export const auth = null;
export const db = null;
export const storage = null;
export const functions = null;
export const analytics = null;

// Timestamp placeholder type
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
  toDate(): Date;
}

// Create a simple Timestamp implementation for development
export const createTimestamp = (date?: Date): Timestamp => {
  const d = date || new Date();
  const seconds = Math.floor(d.getTime() / 1000);
  return {
    seconds,
    nanoseconds: 0,
    toDate: () => new Date(seconds * 1000)
  };
};

// Helper function to check if Firebase is initialized
export const isFirebaseInitialized = (): boolean => {
  return !!(app && auth && db && storage && functions);
};

// Firebase collections constants
export const COLLECTIONS = {
  USERS: 'users',
  VENDORS: 'vendors',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  NOTIFICATIONS: 'notifications',
  PROMOCODES: 'promocodes',
  ANALYTICS: 'analytics',
  SUPPORT_TICKETS: 'support_tickets'
} as const;

// Firebase storage paths
export const STORAGE_PATHS = {
  USER_PROFILES: 'user-profiles',
  PRODUCT_IMAGES: 'product-images',
  VENDOR_DOCUMENTS: 'vendor-documents',
  VENDOR_LOGOS: 'vendor-logos',
  CATEGORY_IMAGES: 'category-images',
  ORDER_RECEIPTS: 'order-receipts',
  SUPPORT_ATTACHMENTS: 'support-attachments'
} as const;

// Cloud Function endpoints
export const CLOUD_FUNCTIONS = {
  SEND_OTP: 'sendOTP',
  VERIFY_OTP: 'verifyOTP',
  PROCESS_PAYMENT: 'processPayment',
  CREATE_ORDER: 'createOrder',
  UPDATE_INVENTORY: 'updateInventory',
  SEND_NOTIFICATION: 'sendNotification',
  GENERATE_REPORT: 'generateReport',
  VERIFY_VENDOR: 'verifyVendor'
} as const;

export default app;