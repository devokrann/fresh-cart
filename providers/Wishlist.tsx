"use client";

import React, { useEffect, useState } from "react";

import ContextUserWishlist from "@/contexts/Wishlist";

import { typeWishlist } from "@/types/wishlist";
import getWishlist from "@/handlers/database/getWishlist";

import { UserData } from "@/types/enums";
import { useSession } from "next-auth/react";

import postWishlist from "@/handlers/database/postWishlist";
import { useDebouncedCallback } from "@mantine/hooks";

export default function Wishlist({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const { data: session } = useSession();

	const inClient = typeof window !== "undefined";

	const [wishlist, setWishlist] = useState<typeWishlist[] | null>(null);
	const [wishlistLoading, setWishlistLoading] = useState(true);

	const updateDatabaseWishlist = useDebouncedCallback(async () => await postWishlist(wishlist!), 5000);

	useEffect(() => {
		const setInitialWishlist = async () => {
			// fetch wishlist data asynchronously then set wishlist
			inClient && setWishlist(await handleSetlWishlist(session?.user.id));

			setWishlistLoading(false);
		};

		setInitialWishlist();
	}, []);

	useEffect(() => {
		if (inClient && !wishlistLoading) {
			// Sync wishlist with local storage
			window.localStorage.setItem(UserData.WISHLIST, JSON.stringify(wishlist));

			// Sync local storage wishlist with database (throttled)
			session && updateDatabaseWishlist();
		}
	}, [wishlist]);

	return <ContextUserWishlist.Provider value={{ wishlist, setWishlist }}>{children}</ContextUserWishlist.Provider>;
}

const handleSetlWishlist = async (id?: string): Promise<typeWishlist[]> => {
	try {
		// Initialize from local storage
		const savedWishlist = window.localStorage.getItem(UserData.WISHLIST);

		if (!savedWishlist) {
			return [];
		} else {
			// parse local wishlist
			const parsedSavedWishlist: typeWishlist[] = await JSON.parse(savedWishlist);

			if (parsedSavedWishlist.length > 0) {
				return parsedSavedWishlist;
			}

			// check if user is signed in
			if (id) {
				// get database wishlist
				const databaseWishlist = await getWishlist();

				return databaseWishlist;
			}

			return parsedSavedWishlist;
		}
	} catch (error) {
		console.error(`x-> Failed to get ${UserData.WISHLIST}:`, error);
		return [];
	}
};
