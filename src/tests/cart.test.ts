
import { describe, test, expect } from "vitest";
import type { Product } from "../data/products";

import {
    addItemToCart,
    calculateSubtotal,
} from "../utils/cartUtils";

const tomato: Product = {
    id: 1,
    name: "Organic Tomato",
    price: 3.5,
    category: "Vegetables",
    image: "/images/product-1.jpg",
};

const pineapple: Product = {
    id: 2,
    name: "Fresh Pineapple",
    price: 4.5,
    category: "Fruits",
    image: "/images/product-2.jpg",
};

describe("Shopping Cart", () => {
    test("adds a product with quantity 1", () => {
        const cart = addItemToCart([], tomato);

        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(1);
    });

    test("increases quantity without duplicates", () => {
        const firstCart = addItemToCart([], tomato);

        const secondCart = addItemToCart(
            firstCart,
            tomato
        );

        expect(secondCart).toHaveLength(1);
        expect(secondCart[0].quantity).toBe(2);
    });

    test("calculates subtotal correctly", () => {
        let cart = addItemToCart([], tomato);

        cart = addItemToCart(cart, tomato);
        cart = addItemToCart(cart, pineapple);

        const subtotal = calculateSubtotal(cart);

        expect(subtotal).toBeCloseTo(11.5);
    });
});
