import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ProductVariant } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  couponDiscount: number;

  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
  vatAmount: (subtotalWithShipping: number) => number;
}

const VAT_RATE = 0.21;

// Simple coupon codes for demo
const VALID_COUPONS: Record<string, number> = {
  BIMINI10: 0.1,
  KAJIS15: 0.15,
  WELCOME20: 0.2,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      couponDiscount: 0,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.product.id === product.id &&
              i.variant?.id === variant?.id
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.variant?.id === variant?.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { product, variant, quantity }],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.product.id === productId && i.variant?.id === variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.variant?.id === variantId
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: null, couponDiscount: 0 }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code: string) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (discount) {
          set({ coupon: code.toUpperCase(), couponDiscount: discount });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ coupon: null, couponDiscount: 0 }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          const price =
            i.product.price + (i.variant?.price_delta ?? 0);
          return sum + price * i.quantity;
        }, 0),

      vatAmount: (subtotalWithShipping: number) =>
        subtotalWithShipping * VAT_RATE,
    }),
    {
      name: "8kajis-cart-v1",
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);
