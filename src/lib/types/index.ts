/**
 * Comprehensive TypeScript interfaces for Grama Groceries
 * Complete type definitions for the grocery delivery ecosystem
 */

import { Timestamp } from '../firebase/config';

// ==================== USER TYPES ====================

export interface User {
  id: string;
  profile: UserProfile;
  preferences: UserPreferences;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  createdAt: Timestamp;
  lastActive: Timestamp;
  role: 'customer' | 'vendor' | 'admin';
  status: 'active' | 'suspended' | 'pending';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  language: 'hindi' | 'english' | string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

export interface UserPreferences {
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newProducts: boolean;
    sms: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  currency: 'INR';
  measurements: 'metric' | 'imperial';
}

// ==================== LOCATION & ADDRESS TYPES ====================

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: Coordinates;
  instructions?: string;
  isDefault: boolean;
  createdAt: Timestamp;
}

export interface ServiceArea {
  id: string;
  name: string;
  coordinates: Coordinates[];
  deliveryFee: number;
  minimumOrder: number;
  deliveryTime: number; // in minutes
  isActive: boolean;
}

export interface DeliveryEstimate {
  estimatedTime: number; // in minutes
  fee: number;
  isAvailable: boolean;
  slots: DeliverySlot[];
}

export interface DeliverySlot {
  id: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  additionalFee?: number;
}

// ==================== PRODUCT TYPES ====================

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  tags: string[];
  translations: Record<string, string>;
}

export interface Product {
  id: string;
  basic: ProductBasicInfo;
  variants: ProductVariant[];
  pricing: PricingInfo;
  inventory: InventoryInfo;
  vendor: VendorReference;
  images: ProductImage[];
  categories: string[];
  tags: string[];
  seo: ProductSEO;
  ratings: ProductRatings;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'active' | 'inactive' | 'outofstock';
}

export interface ProductBasicInfo {
  name: string;
  description: string;
  shortDescription: string;
  brand?: string;
  sku: string;
  barcode?: string;
  unit: 'kg' | 'grams' | 'liters' | 'pieces' | 'packets';
  nutritionFacts?: NutritionFacts;
  ingredients?: string[];
  allergens?: string[];
  shelfLife?: string;
  storageInstructions?: string;
  translations: Record<string, Partial<ProductBasicInfo>>;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  weight?: number;
  volume?: number;
  color?: string;
  material?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inventory: number;
  minQuantity: number;
  maxQuantity: number;
  isDefault: boolean;
}

export interface PricingInfo {
  basePrice: number;
  salePrice?: number;
  discountPercentage?: number;
  bulkPricing?: BulkPricing[];
  taxRate: number;
  currency: 'INR';
  priceHistory: PriceHistory[];
}

export interface BulkPricing {
  minQuantity: number;
  price: number;
  discountPercentage: number;
}

export interface PriceHistory {
  price: number;
  date: Timestamp;
  reason: string;
}

export interface InventoryInfo {
  stock: number;
  reserved: number;
  threshold: number;
  restockDate?: Date;
  supplier: string;
  location: string;
  batchInfo?: BatchInfo;
}

export interface BatchInfo {
  batchNumber: string;
  manufacturingDate: Date;
  expiryDate: Date;
  source: string;
}

export interface ProductImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  sortOrder: number;
  isMain: boolean;
}

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  additionalNutrients?: Record<string, number>;
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  slug: string;
}

export interface ProductRatings {
  average: number;
  count: number;
  distribution: Record<string, number>; // rating -> count
}

export interface ProductFilter {
  categories?: string[];
  priceRange?: [number, number];
  ratings?: number;
  brands?: string[];
  tags?: string[];
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

// ==================== VENDOR TYPES ====================

export interface Vendor {
  id: string;
  businessInfo: BusinessInfo;
  verification: VerificationStatus;
  products: string[];
  analytics: VendorAnalytics;
  bankDetails: BankDetails;
  ratings: VendorRatings;
  subscription: VendorSubscription;
  createdAt: Timestamp;
  status: 'pending' | 'verified' | 'suspended' | 'rejected';
}

export interface BusinessInfo {
  businessName: string;
  ownerName: string;
  businessType: 'farmer' | 'retailer' | 'wholesaler' | 'processor';
  description: string;
  logo?: string;
  images: string[];
  address: Address;
  contactInfo: ContactInfo;
  licenses: BusinessLicense[];
  operatingHours: OperatingHours;
  deliveryRadius: number;
  minimumOrder: number;
}

export interface ContactInfo {
  phoneNumber: string;
  alternatePhone?: string;
  email: string;
  whatsapp?: string;
  website?: string;
}

export interface BusinessLicense {
  type: 'fssai' | 'gst' | 'trade' | 'organic';
  number: string;
  expiryDate: Date;
  documentUrl: string;
  isVerified: boolean;
}

export interface OperatingHours {
  [key: string]: {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  };
}

export interface VerificationStatus {
  documents: {
    identity: DocumentVerification;
    business: DocumentVerification;
    bank: DocumentVerification;
    address: DocumentVerification;
  };
  overallStatus: 'pending' | 'verified' | 'rejected';
  verifiedAt?: Timestamp;
  verifiedBy?: string;
  notes?: string;
}

export interface DocumentVerification {
  status: 'pending' | 'verified' | 'rejected';
  documentUrl?: string;
  rejectionReason?: string;
  verifiedAt?: Timestamp;
}

export interface VendorAnalytics {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: string[];
  monthlyRevenue: Record<string, number>;
  customerRetention: number;
  ratingTrend: Record<string, number>;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  accountType: 'savings' | 'current';
  upiId?: string;
  isVerified: boolean;
}

export interface VendorRatings {
  overall: number;
  quality: number;
  delivery: number;
  service: number;
  totalReviews: number;
}

export interface VendorSubscription {
  plan: 'free' | 'basic' | 'premium';
  startDate: Date;
  endDate: Date;
  features: string[];
  commissionRate: number;
  isActive: boolean;
}

// ==================== CART & ORDER TYPES ====================

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: Timestamp;
  notes?: string;
}

export interface CartTotal {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  savings: number;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'freedelivery';
  value: number;
  minimumOrder: number;
  maximumDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  description: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  customer: CustomerReference;
  items: OrderItem[];
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  pricing: OrderPricing;
  status: OrderStatus;
  timeline: OrderTimeline[];
  ratings?: OrderRating;
  refund?: RefundInfo;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CustomerReference {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface VendorReference {
  id: string;
  businessName: string;
  ownerName: string;
  phoneNumber: string;
  rating: number;
  location: string;
}

export interface OrderItem {
  id: string;
  product: ProductReference;
  variant: ProductVariant;
  quantity: number;
  price: number;
  total: number;
  vendor: VendorReference;
  status: OrderItemStatus;
}

export interface ProductReference {
  id: string;
  name: string;
  image: string;
  sku: string;
  unit: string;
}

export type OrderItemStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'packed' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';

export interface DeliveryInfo {
  address: Address;
  slot: DeliverySlot;
  instructions?: string;
  partner?: DeliveryPartner;
  tracking?: DeliveryTracking;
  fee: number;
  estimatedTime: number;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phoneNumber: string;
  vehicle: string;
  rating: number;
  currentLocation?: Coordinates;
}

export interface DeliveryTracking {
  status: DeliveryStatus;
  currentLocation: Coordinates;
  estimatedArrival: Date;
  updates: TrackingUpdate[];
}

export type DeliveryStatus = 
  | 'assigned' 
  | 'picked_up' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed';

export interface TrackingUpdate {
  status: DeliveryStatus;
  timestamp: Timestamp;
  location: Coordinates;
  note?: string;
}

export interface OrderPricing {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  promoDiscount: number;
  total: number;
  refundAmount?: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Timestamp;
  note?: string;
  updatedBy: string;
}

export interface OrderRating {
  overall: number;
  delivery: number;
  quality: number;
  review?: string;
  images?: string[];
  createdAt: Timestamp;
}

export interface RefundInfo {
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedAt: Timestamp;
  processedAt?: Timestamp;
  refundMethod: 'original' | 'wallet' | 'bank';
}

// ==================== PAYMENT TYPES ====================

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
  isDefault: boolean;
  details: PaymentDetails;
  createdAt: Timestamp;
}

export interface PaymentDetails {
  // For cards
  cardNumber?: string; // masked
  expiryMonth?: number;
  expiryYear?: number;
  cardType?: 'visa' | 'mastercard' | 'rupay' | 'amex';
  holderName?: string;
  
  // For UPI
  upiId?: string;
  
  // For wallets
  walletType?: 'paytm' | 'phonepe' | 'googlepay' | 'amazonpay';
  
  // For netbanking
  bankName?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  gateway: 'razorpay' | 'paytm' | 'phonepe';
  gatewayTransactionId?: string;
  processedAt?: Timestamp;
  failureReason?: string;
}

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'success' 
  | 'failed' 
  | 'cancelled' 
  | 'refunded';

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'wallet_credit' | 'wallet_debit';
  amount: number;
  description: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  orderId?: string;
  createdAt: Timestamp;
}

// ==================== NOTIFICATION TYPES ====================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}

export type NotificationType = 
  | 'order_confirmed' 
  | 'order_shipped' 
  | 'order_delivered' 
  | 'payment_success' 
  | 'payment_failed' 
  | 'promotion' 
  | 'price_drop' 
  | 'stock_alert' 
  | 'rating_request';

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SearchResponse<T> {
  results: T[];
  total: number;
  query: string;
  filters: Record<string, any>;
  suggestions?: string[];
}

// ==================== ANALYTICS TYPES ====================

export interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  sessionId: string;
  timestamp: Timestamp;
  properties: Record<string, any>;
  deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  platform: string;
  deviceId: string;
  appVersion: string;
  osVersion: string;
  screenSize: string;
  networkType: string;
}

// ==================== UTILITY TYPES ====================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface StockInfo {
  isAvailable: boolean;
  quantity: number;
  estimatedRestockDate?: Date;
}

export interface SearchSuggestion {
  text: string;
  type: 'product' | 'category' | 'brand';
  count: number;
}

// ==================== FORM TYPES ====================

export interface LoginForm {
  phoneNumber: string;
}

export interface OTPForm {
  otp: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface AddressForm {
  type: 'home' | 'work' | 'other';
  title: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
}

export interface ProductForm {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: File[];
  variants?: Omit<ProductVariant, 'id'>[];
}

// ==================== CONSTANTS ====================

export const ORDER_STATUSES = [
  'pending',
  'confirmed', 
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
  'refunded'
] as const;

export const DELIVERY_STATUSES = [
  'assigned',
  'picked_up',
  'in_transit', 
  'out_for_delivery',
  'delivered',
  'failed'
] as const;

export const PAYMENT_STATUSES = [
  'pending',
  'processing',
  'success',
  'failed',
  'cancelled',
  'refunded'
] as const;

export const USER_ROLES = ['customer', 'vendor', 'admin'] as const;

export const BUSINESS_TYPES = ['farmer', 'retailer', 'wholesaler', 'processor'] as const;

export const PRODUCT_UNITS = ['kg', 'grams', 'liters', 'pieces', 'packets'] as const;

export const CURRENCIES = ['INR'] as const;

export const LANGUAGES = ['hindi', 'english'] as const;