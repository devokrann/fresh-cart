"use client";

import React, { SetStateAction, useCallback, useEffect, useState } from "react";

import ContextProducts from "@/contexts/Products";

import { typeProduct } from "@/types/product";

export default function Products({ children }: { children: React.ReactNode }) {
	const [wishlist, setWishlist] = useState<typeProduct[]>(() => {
		try {
			const storedWishlist = typeof window !== "undefined" ? window.localStorage.getItem("wishlist") : null;
			return storedWishlist ? JSON.parse(storedWishlist) : [];
		} catch (error) {
			console.error("x-> Failed to parse wishlist from localStorage:", (error as Error).message);
			return [];
		}
	});
	const [cart, setCart] = useState<typeProduct[]>(() => {
		try {
			const storedCart = typeof window !== "undefined" ? window.localStorage.getItem("cart") : null;
			return storedCart ? JSON.parse(storedCart) : [];
		} catch (error) {
			console.error("x-> Failed to parse cart from localStorage:", (error as Error).message);
			return [];
		}
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("wishlist", JSON.stringify(wishlist));

			// window.localStorage.clear();
		}
	}, [wishlist]);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("cart", JSON.stringify(cart));

			// window.localStorage.clear();
		}
	}, [cart]);

	return (
		<ContextProducts.Provider value={{ wishlist, setWishlist, cart, setCart }}>{children}</ContextProducts.Provider>
	);
}
