"use client";

import React, { useEffect, useState } from "react";

import ContextUserWishlist from "@/contexts/Wishlist";

import { typeWishlist } from "@/types/wishlist";
import getWishlist from "@/handlers/database/getWishlist";
import array from "@/utilities/array";

import { ProductArrays } from "@/types/enums";
import { useSession } from "next-auth/react";

import postWishlist from "@/handlers/database/postWishlist";
import { useDebouncedCallback } from "@mantine/hooks";

export default function Wishlist({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const session = useSession();

	const inClient = typeof window !== "undefined";

	const [wishlist, setWishlist] = useState<typeWishlist[] | null>(null);
	const [wishlistLoading, setWishlistLoading] = useState(true);

	const updateDatabaseWishlist = useDebouncedCallback(
		async () => await postWishlist(session.data?.user.id!, wishlist!),
		5000
	);

	useEffect(() => {
		const setInitialWishlist = async () => {
			// fetch wishlist data asynchronously then set wishlist
			inClient && setWishlist(await getLocalWishlist());
			setWishlistLoading(false);
		};

		setInitialWishlist();
	}, []);

	useEffect(() => {
		if (inClient && !wishlistLoading) {
			// Sync wishlist with local storage
			window.localStorage.setItem(ProductArrays.WISHLIST, JSON.stringify(wishlist));

			// Sync local storage wishlist with database (throttled)
			session.data && updateDatabaseWishlist();
		}
	}, [wishlist]);

	return <ContextUserWishlist.Provider value={{ wishlist, setWishlist }}>{children}</ContextUserWishlist.Provider>;
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
