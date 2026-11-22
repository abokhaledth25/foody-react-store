
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Header.css";

function Header() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    return (
        <header className="site-header">
            <div className="header-container">

                <h2 className="logo">
                    Foody<span>.</span>
                </h2>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>

                    <Link to="/wishlist">
                        ❤️ Wishlist ({wishlistCount})
                    </Link>

                    <Link to="/cart">
                        🛒 Cart ({cartCount})
                    </Link>

                    <Link to="/checkout">Checkout</Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;
