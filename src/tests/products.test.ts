
import { describe, test, expect } from "vitest";
import type { Product } from "../data/products";
import { filterProducts } from "../utils/productUtils";

const products: Product[] = [
    {
        id: 1,
        name: "Organic Tomato",
        price: 3.5,
        category: "Vegetables",
        image: "/images/product-1.jpg",
    },
    {
        id: 2,
        name: "Fresh Pineapple",
        price: 4.5,
        category: "Fruits",
        image: "/images/product-2.jpg",
    },
    {
        id: 3,
        name: "Fresh Peppers",
        price: 2.75,
        category: "Vegetables",
        image: "/images/product-3.jpg",
    },
];

const defaultFilters = {
    search: "",
    category: "All",
    minPrice: "",
    maxPrice: "",
};

describe("Product Filtering", () => {
    test("searches products by name", () => {
        const result = filterProducts(products, {
            ...defaultFilters,
            search: "TOMATO",
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Organic Tomato");
    });

    test("filters products by category", () => {
        const result = filterProducts(products, {
            ...defaultFilters,
            category: "Fruits",
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Fresh Pineapple");
    });

    test("filters products by price range", () => {
        const result = filterProducts(products, {
            ...defaultFilters,
            minPrice: "2",
            maxPrice: "3",
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Fresh Peppers");
    });

    test("returns empty array when no match", () => {
        const result = filterProducts(products, {
            ...defaultFilters,
            search: "Banana",
        });

        expect(result).toEqual([]);
    });
});
