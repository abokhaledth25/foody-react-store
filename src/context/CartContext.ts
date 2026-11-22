
import { createContext, useContext } from "react";
import type { Product } from "../data/products";

export type CartItem = Product & {
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;

    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;

    cartCount: number;
    subtotal: number;
};

export const CartContext =
    createContext<CartContextType | null>(null);

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}
