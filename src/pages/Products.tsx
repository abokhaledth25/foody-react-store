
import { useState } from "react";
import { useSearchParams } from "react-router";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Products.css";
import { filterProducts } from "../utils/productUtils";

function Products() {
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    const [searchParams, setSearchParams] =
        useSearchParams();

    const category = searchParams.get("category") || "All";


    const filteredProducts = filterProducts(products, {
        search,
        category,
        minPrice,
        maxPrice,
    });





    const sortedProducts = [...filteredProducts].sort(
        (a, b) => {
            if (sortOrder === "low-to-high") {
                return a.price - b.price;
            }

            if (sortOrder === "high-to-low") {
                return b.price - a.price;
            }

            return 0;
        }
    );



    function resetFilters() {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setSortOrder("default");
        setSearchParams({});
    }


    return (
        <section className="products-page">
            <h1>Our Organic Products</h1>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="filters-container">
                <div className="filter-group">
                    <label htmlFor="category">Category</label>

                    <select
                        id="category"
                        value={category}
                        onChange={(e) => {
                            if (e.target.value === "All") {
                                setSearchParams({});
                            } else {
                                setSearchParams({
                                    category: e.target.value,
                                });
                            }
                        }}
                    >
                        <option value="All">All Categories</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="min-price">Min Price ($)</label>

                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="max-price">Max Price ($)</label>

                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Any"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>


                <div className="filter-group">
                    <label htmlFor="sort">Sort By</label>

                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Default Sorting</option>

                        <option value="low-to-high">
                            Price: Low to High
                        </option>

                        <option value="high-to-low">
                            Price: High to Low
                        </option>
                    </select>
                </div>


                <button
                    className="reset-btn"
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>

            <p className="results-count">
                {filteredProducts.length} products found
            </p>

            <div className="products-grid">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="no-results">
                    No products found. Try changing your filters.
                </p>
            )}
        </section>
    );
}

export default Products;
