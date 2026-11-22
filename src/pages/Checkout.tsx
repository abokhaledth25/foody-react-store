
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";

import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

import {
    checkoutSchema,
} from "../validation/checkoutSchema";

import type {
    CheckoutFormData,
} from "../validation/checkoutSchema";

import "./Checkout.css";

type FormErrors = Partial<
    Record<keyof CheckoutFormData, string>
>;

type CompletedOrder = {
    reference: string;
    customer: CheckoutFormData;
    items: CartItem[];
    subtotal: number;
    delivery: number;
    total: number;
};

function Checkout() {
    const { cart, subtotal, clearCart } = useCart();

    const [formData, setFormData] =
        useState<CheckoutFormData>({
            fullName: "",
            email: "",
            phone: "",
            city: "",
            address: "",
        });

    const [errors, setErrors] = useState<FormErrors>({});

    const [completedOrder, setCompletedOrder] =
        useState<CompletedOrder | null>(null);

    const delivery = 0;
    const total = subtotal + delivery;

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const name = e.target.name as keyof CheckoutFormData;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => {
            const nextErrors = { ...prev };
            delete nextErrors[name];
            return nextErrors;
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (cart.length === 0 || completedOrder) {
            return;
        }

        const result = checkoutSchema.safeParse(formData);

        if (!result.success) {
            const nextErrors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const field =
                    issue.path[0] as keyof CheckoutFormData;

                if (field && !nextErrors[field]) {
                    nextErrors[field] = issue.message;
                }
            });

            setErrors(nextErrors);
            return;
        }

        // Validation passed: create a demo order
        const newOrder: CompletedOrder = {
            reference:
                "FD-" + crypto.randomUUID().slice(0, 8).toUpperCase(),

            customer: result.data,

            items: cart.map((item) => ({ ...item })),

            subtotal,
            delivery,
            total,
        };

        // Save confirmation before clearing the cart
        setCompletedOrder(newOrder);
        setErrors({});

        // Clear cart but leave wishlist unchanged
        clearCart();
    }

    // IMPORTANT: Check success before empty cart!
    if (completedOrder) {
        return (
            <section className="order-success-page">
                <div className="order-success-icon">
                    ✓
                </div>

                <h1>Order Placed Successfully!</h1>

                <p className="order-success-message">
                    Thank you, {completedOrder.customer.fullName}!
                    Your demo order has been confirmed.
                </p>

                <div className="order-reference">
                    <span>Order Reference</span>

                    <strong>
                        {completedOrder.reference}
                    </strong>
                </div>

                <div className="order-success-details">
                    <h2>Order Summary</h2>

                    {completedOrder.items.map((item) => (
                        <div
                            className="checkout-item"
                            key={item.id}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <strong>
                                ${(item.price * item.quantity).toFixed(2)}
                            </strong>
                        </div>
                    ))}

                    <hr />

                    <div className="checkout-row">
                        <span>Subtotal</span>
                        <span>
                            ${completedOrder.subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div className="checkout-row">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>

                    <div className="checkout-total">
                        <span>Total Paid (Demo)</span>
                        <strong>
                            ${completedOrder.total.toFixed(2)}
                        </strong>
                    </div>

                    <hr />

                    <h3>Delivery Information</h3>

                    <p>
                        <strong>Name: </strong>
                        {completedOrder.customer.fullName}
                    </p>

                    <p>
                        <strong>Email: </strong>
                        {completedOrder.customer.email}
                    </p>

                    <p>
                        <strong>Phone: </strong>
                        {completedOrder.customer.phone}
                    </p>

                    <p>
                        <strong>City: </strong>
                        {completedOrder.customer.city}
                    </p>

                    <p>
                        <strong>Address: </strong>
                        {completedOrder.customer.address}
                    </p>
                </div>

                <p className="order-demo-note">
                    This is a frontend demo. No payment was
                    processed and no real order was submitted.
                </p>

                <Link
                    to="/products"
                    className="cart-shop-btn"
                >
                    Continue Shopping
                </Link>
            </section>
        );
    }

    if (cart.length === 0) {
        return (
            <section className="checkout-empty">
                <h1>Your cart is empty</h1>

                <p>
                    Add products before proceeding to checkout.
                </p>

                <Link to="/products">
                    Continue Shopping
                </Link>
            </section>
        );
    }

    return (
        <section className="checkout-page">
            <h1>Checkout</h1>

            <div className="checkout-layout">
                <form
                    id="checkout-form"
                    className="checkout-form"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h2>Delivery Information</h2>

                    <div className="checkout-field">
                        <label htmlFor="fullName">
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.fullName)}
                        />

                        {errors.fullName && (
                            <p className="checkout-error" role="alert">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                        />

                        {errors.email && (
                            <p className="checkout-error" role="alert">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+96170123456"
                            value={formData.phone}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.phone)}
                        />

                        {errors.phone && (
                            <p className="checkout-error" role="alert">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="city">
                            City
                        </label>

                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.city)}
                        />

                        {errors.city && (
                            <p className="checkout-error" role="alert">
                                {errors.city}
                            </p>
                        )}
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="address">
                            Delivery Address
                        </label>

                        <textarea
                            id="address"
                            name="address"
                            rows={4}
                            placeholder="Street, building, apartment..."
                            value={formData.address}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.address)}
                        />

                        {errors.address && (
                            <p className="checkout-error" role="alert">
                                {errors.address}
                            </p>
                        )}
                    </div>
                </form>

                <aside className="checkout-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div
                            className="checkout-item"
                            key={item.id}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <strong>
                                ${(item.price * item.quantity).toFixed(2)}
                            </strong>
                        </div>
                    ))}

                    <hr />

                    <div className="checkout-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="checkout-row">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>

                    <hr />

                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        className="checkout-place-btn"
                    >
                        Place Order
                    </button>

                    <p className="checkout-note">
                        Demo checkout — no real payment.
                    </p>
                </aside>
            </div>
        </section>
    );
}

export default Checkout;
