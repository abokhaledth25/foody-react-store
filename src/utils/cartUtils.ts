
import type { Product } from "../data/products";
import type { CartItem } from "../context/CartContext";

export function addItemToCart(
    cart: CartItem[],
    product: Product
): CartItem[] {
    const existingItem = cart.find(
        (item) => item.id === product.id
    );

    if (existingItem) {
        return cart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }

    return [
        ...cart,
        { ...product, quantity: 1 },
    ];
}

export function calculateSubtotal(
    cart: CartItem[]
): number {
    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}
