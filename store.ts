import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartItem = {
  name: string;
  id: string;
  images?: string[];
  description?: string;
  unit_amount: number | null;
  quantity: number | 1;
};

type CartState = {
  isOpen: boolean;
  cart: CartItem[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};

//State
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
    }),
    { name: "cart-store" }
  )
);

// Existing item > see if an item allready exist in our cart  > if it does map over it and make sure that the cartItem.id matches the item.id and if it does just update quantity +1
