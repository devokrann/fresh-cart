"use client";

import React, { useContext } from "react";

import ContextUserCart from "@/contexts/Cart";
import ContextUserWishlist from "@/contexts/Wishlist";

export function CartCount() {
	const cartContext = useContext(ContextUserCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	return cart?.length;
}

export function WishlistCount() {
	const wishlistContext = useContext(ContextUserWishlist);

	if (!wishlistContext) {
		throw new Error("ChildComponent must be used within a ContextWishlist.Provider");
	}

	const { wishlist, setWishlist } = wishlistContext;

	return wishlist?.length;
}
