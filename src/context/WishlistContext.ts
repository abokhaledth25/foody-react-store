
import { createContext, useContext } from "react";
import type { Product } from "../data/products";

type WishlistContextType = {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    wishlistCount: number;
};

export const WishlistContext =
    createContext<WishlistContextType | null>(null);

export function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );
    }

    return context;
}
