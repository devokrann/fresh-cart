"use client";

import React, { useEffect, useState } from "react";

import ContextUserCart from "@/contexts/Cart";

import { typeCart } from "@/types/cart";
import getCart from "@/handlers/database/getCart";
import array from "@/utilities/array";

import { ProductArrays } from "@/types/enums";
import { useSession } from "next-auth/react";
import postCart from "@/handlers/database/postCart";
import { useDebouncedCallback } from "@mantine/hooks";

export default function Cart({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const session = useSession();

	const inClient = typeof window !== "undefined";

	const [cart, setCart] = useState<typeCart[] | null>(null);
	const [cartLoading, setCartLoading] = useState(true);

	const updateDatabaseCart = useDebouncedCallback(async () => await postCart(session.data?.user.id!, cart!), 5000);

	useEffect(() => {
		const setInitialCart = async () => {
			// fetch cart data asynchronously then set cart
			inClient && setCart(await getLocalCart());
			setCartLoading(false);
		};

		setInitialCart();
	}, []);

	useEffect(() => {
		if (inClient && !cartLoading) {
			// Sync cart with local storage
			window.localStorage.setItem(ProductArrays.CART, JSON.stringify(cart));

			// Sync local storage cart with database (throttled)
			session.data && updateDatabaseCart();
		}
	}, [cart]);

	return <ContextUserCart.Provider value={{ cart, setCart }}>{children}</ContextUserCart.Provider>;
}

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
