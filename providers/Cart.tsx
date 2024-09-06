"use client";

import React, { useEffect, useState } from "react";

import ContextUserCart from "@/contexts/Cart";

import { typeCart } from "@/types/cart";
import getCart from "@/handlers/database/getCart";

import { UserData } from "@/types/enums";
import { useSession } from "next-auth/react";
import postCart from "@/handlers/database/postCart";
import { useDebouncedCallback } from "@mantine/hooks";

export default function Cart({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const { data: session } = useSession();

	const inClient = typeof window !== "undefined";

	const [cart, setCart] = useState<typeCart[] | null>(null);
	const [cartLoading, setCartLoading] = useState(true);

	const updateDatabaseCart = useDebouncedCallback(async () => await postCart(cart!), 5000);

	useEffect(() => {
		const setInitialCart = async () => {
			// fetch cart data asynchronously then set cart
			inClient && setCart(await handleSetCart(session?.user.id));

			setCartLoading(false);
		};

		setInitialCart();
	}, []);

	useEffect(() => {
		if (inClient && !cartLoading) {
			// Sync cart with local storage
			window.localStorage.setItem(UserData.CART, JSON.stringify(cart));

			// Sync local storage cart with database (throttled)
			session && updateDatabaseCart();
		}
	}, [cart]);

	return <ContextUserCart.Provider value={{ cart, setCart }}>{children}</ContextUserCart.Provider>;
}

const handleSetCart = async (id?: string): Promise<typeCart[]> => {
	try {
		// Initialize from session storage
		const savedCart = window.localStorage.getItem(UserData.CART);

		if (!savedCart) {
			return [];
		} else {
			// parse local cart
			const parsedSavedCart: typeCart[] = await JSON.parse(savedCart);

			if (parsedSavedCart.length > 0) {
				return parsedSavedCart;
			}

			// check if user is signed in
			if (id) {
				// get database cart
				const databaseCart = await getCart();

				return databaseCart;
			}

			return parsedSavedCart;
		}
	} catch (error) {
		console.error(`x-> Failed to parse ${UserData.CART}:`, error);
		return [];
	}
};
