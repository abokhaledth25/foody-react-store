
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        subtotal,
    } = useCart();

    const delivery = 0;
    const total = subtotal + delivery;

    if (cart.length === 0) {
        return (
            <section className="empty-cart">
                <span>🛒</span>
                <h1>Your cart is empty</h1>
                <p>Add some fresh organic products.</p>

                <Link to="/products" className="cart-shop-btn">
                    Continue Shopping
                </Link>
            </section>
        );
    }

    return (
        <section className="cart-page">
            <h1>Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-items">

                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                                <p>${item.price.toFixed(2)} / item</p>
                            </div>

                            <div className="quantity-controls">
                                <button
                                    disabled={item.quantity === 1}
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <strong className="item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </strong>

                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                    <div className="cart-actions">
                        <Link
                            to="/products"
                            className="cart-shop-btn"
                        >
                            Continue Shopping
                        </Link>

                        <button
                            className="clear-cart-btn"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                <aside className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>

                    <hr />

                    <div className="summary-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>

                    <Link
                        to="/checkout"
                        className="checkout-btn"
                    >
                        Proceed to Checkout
                    </Link>
                </aside>
            </div>
        </section>
    );
}

export default Cart;
