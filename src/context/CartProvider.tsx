
import { useState, useEffect } from "react"; import type { ReactNode } from "react";

import { CartContext } from "./CartContext";
import type { CartItem } from "./CartContext";
import type { Product } from "../data/products";
import {
    addItemToCart,
    calculateSubtotal,
} from "../utils/cartUtils";

type CartProviderProps = {
    children: ReactNode;
};

function CartProvider({ children }: CartProviderProps) {

    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem("foody-cart");

            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem(
            "foody-cart",
            JSON.stringify(cart)
        );
    }, [cart]);


    function addToCart(product: Product) {
        setCart((prevCart) =>
            addItemToCart(prevCart, product)
        );
    }


    function increaseQuantity(id: number) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(id: number) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1),
                    }
                    : item
            )
        );
    }

    function removeFromCart(id: number) {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    }

    function clearCart() {
        setCart([]);
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = calculateSubtotal(cart);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                cartCount,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
