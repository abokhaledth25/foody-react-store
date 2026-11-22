
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const { toggleWishlist, isInWishlist } = useWishlist();

    const saved = isInWishlist(product.id);

    return (
        <div className="product-card">

            <button
                type="button"
                className={`wishlist-btn ${saved ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label={`Save ${product.name} to wishlist`}
                aria-pressed={saved}
            >
                {saved ? "♥" : "♡"}
            </button>

            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />

            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <h4>${product.price.toFixed(2)}</h4>

            <button
                className="add-cart-btn"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>

        </div>
    );
}

export default ProductCard;
