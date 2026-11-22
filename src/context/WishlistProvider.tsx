
import { useState, useEffect } from "react"; import type { ReactNode } from "react";
import type { Product } from "../data/products";

import { WishlistContext } from "./WishlistContext";

type WishlistProviderProps = {
    children: ReactNode;
};

function WishlistProvider({
    children,
}: WishlistProviderProps) {

    const [wishlist, setWishlist] = useState<Product[]>(() => {
        try {
            const savedWishlist =
                localStorage.getItem("foody-wishlist");

            return savedWishlist
                ? JSON.parse(savedWishlist)
                : [];
        } catch {
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem(
            "foody-wishlist",
            JSON.stringify(wishlist)
        );
    }, [wishlist]);

    function toggleWishlist(product: Product) {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return prevWishlist.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...prevWishlist, product];
        });
    }

    function removeFromWishlist(id: number) {
        setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== id)
        );
    }

    function isInWishlist(id: number) {
        return wishlist.some((item) => item.id === id);
    }

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                removeFromWishlist,
                isInWishlist,
                wishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;
