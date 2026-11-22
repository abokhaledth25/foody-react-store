
import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist() {
    const { wishlist, wishlistCount } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <section className="empty-wishlist">
                <span>♡</span>

                <h1>Your wishlist is empty</h1>

                <p>Save your favorite organic products here.</p>

                <Link
                    to="/products"
                    className="wishlist-shop-btn"
                >
                    Explore Products
                </Link>
            </section>
        );
    }

    return (
        <section className="wishlist-page">
            <h1>My Wishlist</h1>

            <p className="wishlist-count">
                {wishlistCount} saved products
            </p>

            <div className="wishlist-grid">
                {wishlist.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}

export default Wishlist;
