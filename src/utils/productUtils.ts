
import type { Product } from "../data/products";

type ProductFilters = {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
};

export function filterProducts(
    products: Product[],
    filters: ProductFilters
): Product[] {
    const { search, category, minPrice, maxPrice } = filters;

    return products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.trim().toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        const matchesMinPrice =
            minPrice === "" ||
            product.price >= Number(minPrice);

        const matchesMaxPrice =
            maxPrice === "" ||
            product.price <= Number(maxPrice);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice
        );
    });
}
