
import { Link } from "react-router";
import "./Footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">

                <div className="footer-about">
                    <h2 className="footer-logo">
                        Foody<span>.</span>
                    </h2>

                    <p>
                        Fresh, healthy and organic products
                        delivered to your home.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/cart">Shopping Cart</Link>
                    <Link to="/checkout">Checkout</Link>
                </div>

                <div className="footer-contact">
                    <h3>Contact Us</h3>

                    <p>📍 Lebanon</p>
                    <p>📧 info@example.com</p>
                    <p>🕒 Mon - Sat: 8 AM - 8 PM</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Foody.
                    All rights reserved.
                </p>

                <p>
                    Design inspiration:{" "}
                    <a href="https://htmlcodex.com">
                        HTML Codex
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
