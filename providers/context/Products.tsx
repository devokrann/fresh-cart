"use client";

import React, { useEffect, useState } from "react";

import ContextProducts from "@/contexts/Products";

import { typeOrder } from "@/types/order";
import { typeCart } from "@/types/cart";
import { typeWishlist } from "@/types/wishlist";
import getWishlist from "@/handlers/database/getWishlist";
import getCart from "@/handlers/database/getCart";
import getOrders from "@/handlers/database/getOrders";
import array from "@/utilities/array";
import postProducts from "@/handlers/database/addProducts";

enum ProductArrays {
	CART = "cart",
	WISHLIST = "wishlist",
	ORDERS = "orders",
}

export default function Products({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const inClient = typeof window !== "undefined";

	const [wishlist, setWishlist] = useState<typeWishlist[]>([]);
	const [wishlistLoading, setWishlistLoading] = useState(true);

	const [cart, setCart] = useState<typeCart[]>([]);
	const [cartLoading, setCartLoading] = useState(true);

	const [orders, setOrders] = useState<typeOrder[]>([]);
	const [ordersLoading, setOrdersLoading] = useState(true);

	useEffect(() => {
		const setInitialWishlist = async () => {
			// fetch wishlist data asynchronously then set wishlist
			inClient && setWishlist(await getLocalWishlist());
			setWishlistLoading(false);
		};

		setInitialWishlist();
	}, []);

	useEffect(() => {
		const setInitialCart = async () => {
			// fetch cart data asynchronously then set cart
			inClient && setCart(await getLocalCart());
			setCartLoading(false);
		};

		setInitialCart();
	}, []);

	useEffect(() => {
		const setInitialOrders = async () => {
			// fetch orders data asynchronously then set orders
			inClient && setOrders(await getLocalOrders());
			setOrdersLoading(false);
		};

		setInitialOrders();
	}, []);

	useEffect(() => {
		if (inClient && !wishlistLoading) {
			// Sync wishlist with local storage
			window.localStorage.setItem(ProductArrays.WISHLIST, JSON.stringify(wishlist));
			// Sync local storage wishlist with database (throttled)
		}
	}, [wishlist]);

	useEffect(() => {
		if (inClient && !cartLoading) {
			// Sync cart with local storage
			window.localStorage.setItem(ProductArrays.CART, JSON.stringify(cart));
			// Sync local storage cart with database (throttled)
		}
	}, [cart]);

	useEffect(() => {
		if (inClient && !ordersLoading) {
			// Sync orders with local storage
			inClient && window.localStorage.setItem(ProductArrays.ORDERS, JSON.stringify(orders));
			// Sync local storage orders with database (throttled)
		}
	}, [orders]);

	const value = { wishlist, setWishlist, cart, setCart, orders, setOrders };
	return <ContextProducts.Provider value={value}>{children}</ContextProducts.Provider>;
}

const getLocalWishlist = async (): Promise<typeWishlist[]> => {
	try {
		// Initialize from local storage
		const savedWishlist = window.localStorage.getItem(ProductArrays.WISHLIST);

		if (!savedWishlist) {
			return [];
		} else {
			// parse local wishlist
			const parsedSavedWishlist = await JSON.parse(savedWishlist);

			// // get database wishlist
			// const databaseWishlist = await getWishlist();

			// // compare local wishlist with database
			// if (!array.areEqual(databaseWishlist, parsedSavedWishlist)) {
			// 	window.localStorage.setItem(ProductArrays.WISHLIST, JSON.stringify(databaseWishlist));
			// }
			return parsedSavedWishlist;
		}
	} catch (error) {
		console.error(`x-> Failed to get ${ProductArrays.WISHLIST}:`, error);
		return [];
	}
};

const getLocalCart = async (): Promise<typeCart[]> => {
	try {
		// Initialize from session storage
		const savedCart = window.localStorage.getItem(ProductArrays.CART);

		if (!savedCart) {
			return [];
		} else {
			// parse local cart
			const parsedSavedCart = await JSON.parse(savedCart);

			// // get database cart
			// const databaseCart = await getCart();

			// // compare local cart with database
			// if (!array.areEqual(databaseCart, parsedSavedCart)) {
			// 	window.localStorage.setItem(ProductArrays.CART, JSON.stringify(databaseCart));
			// }

			return parsedSavedCart;
		}
	} catch (error) {
		console.error(`x-> Failed to parse ${ProductArrays.CART} from session storage:`, error);
		return [];
	}
};

const getLocalOrders = async (): Promise<typeOrder[]> => {
	try {
		// Initialize from session storage
		const savedOrders = window.localStorage.getItem(ProductArrays.ORDERS);

		if (!savedOrders) {
			return [];
		} else {
			// parse local orders
			const parsedSavedOrders = await JSON.parse(savedOrders);

			// // get database orders
			// const databaseOrders = await getOrders();

			// // compare local orders with database
			// if (!array.areEqual(databaseOrders, parsedSavedOrders)) {
			// 	window.localStorage.setItem(ProductArrays.ORDERS, JSON.stringify(databaseOrders));
			// }

			return parsedSavedOrders;
		}
	} catch (error) {
		console.error(`x-> Failed to parse ${ProductArrays.ORDERS} from session storage:`, error);
		return [];
	}
};
