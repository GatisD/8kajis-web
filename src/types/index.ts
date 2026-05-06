// ============================================================
// 8kajis.lv — Shared TypeScript Types
// ============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  name_lv: string;
  name_en?: string;
  description: string;
  price: number;
  price_before?: number;
  currency: "EUR";
  images: string[];
  category: ProductCategory;
  age_min?: number;
  age_max?: number;
  in_stock: boolean;
  stock_count?: number;
  badge?: "JAUNS" | "IZPĀRDOŠANA" | "POPULĀRS";
  variants?: ProductVariant[];
  sku?: string;
  weight?: number;
  brand?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "krāsa" | "izmērs";
  value: string;
  price_delta?: number;
  in_stock: boolean;
}

export type ProductCategory =
  | "sensorie"
  | "logika"
  | "konstruktori"
  | "koka"
  | "radosums"
  | "kustiba"
  | "visi";

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  coupon?: string;
  coupon_discount?: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  subtotal: number;
  shipping_cost: number;
  vat: number;
  total: number;
  shipping_method: ShippingMethod;
  contact: ContactInfo;
  address: ShippingAddress;
  created_at: string;
}

export type ShippingMethod =
  | "lv_pasta"
  | "omniva"
  | "dpd"
  | "pickup_kekava";

export interface ShippingOption {
  id: ShippingMethod;
  name: string;
  price: number;
  estimated_days: string;
  free_above?: number;
}

export interface ContactInfo {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  postal: string;
  country: string;
}

export interface SensorBooking {
  name: string;
  institution?: string;
  phone: string;
  email: string;
  message?: string;
  gdpr_consent: boolean;
}

export type Locale = "lv" | "en" | "ru" | "lt" | "ee";
