
import { Link } from "react-router";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

import Categories from "../components/Categories";


function Home() {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>
                        Organic Food Is Good
                        <span> For Health</span>
                    </h1>

                    <p>
                        Fresh, healthy and organic products
                        delivered to your home.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/products" className="shop-btn">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            <Categories />
            <section className="featured">
                <h2>Featured Products</h2>
                <p>Discover our fresh organic products</p>

                <div className="featured-grid">
                    {products.slice(0, 3).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;
