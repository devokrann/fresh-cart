"use client";

import React, { useEffect, useState } from "react";

import ContextUserAddresses from "@/contexts/Addresses";

import { typeAddress } from "@/types/address";
import getAddresses from "@/handlers/database/getAddresses";

import { UserData } from "@/types/enums";
import { useSession } from "next-auth/react";
import { useDebouncedCallback } from "@mantine/hooks";
import postAddresses from "@/handlers/database/postAddresses";

export default function Addresses({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const { data: session } = useSession();

	const inClient = typeof window !== "undefined";

	const [addresses, setAddresses] = useState<typeAddress[] | null>(null);
	const [addressesLoading, setAddressesLoading] = useState(true);

	const updateDatabaseAddresses = useDebouncedCallback(async () => await postAddresses(addresses!), 5000);

	useEffect(() => {
		const setInitialAddresses = async () => {
			// fetch addresses asynchronously then set them
			inClient && setAddresses(await handleSetAddresses(session?.user.id));

			setAddressesLoading(false);
		};

		setInitialAddresses();
	}, []);

	useEffect(() => {
		if (inClient && !addressesLoading) {
			// Sync addresses with local storage
			window.localStorage.setItem(UserData.ADDRESSES, JSON.stringify(addresses));

			// Sync local storage addresses with database (throttled)
			session && updateDatabaseAddresses();
		}
	}, [addresses]);

	return (
		<ContextUserAddresses.Provider value={{ addresses, setAddresses }}>{children}</ContextUserAddresses.Provider>
	);
}

const handleSetAddresses = async (id?: string): Promise<typeAddress[]> => {
	try {
		// Initialize from session storage
		const savedAddresses = window.localStorage.getItem(UserData.ADDRESSES);

		if (!savedAddresses) {
			return [];
		} else {
			// parse local addresses
			const parsedSavedAddresses: typeAddress[] = await JSON.parse(savedAddresses);

			// check if user is signed in
			if (id) {
				// get database addresses
				const databaseAddresses = await getAddresses();

				return databaseAddresses;
			}

			return parsedSavedAddresses;
		}
	} catch (error) {
		console.error(`x-> Failed to parse ${UserData.ADDRESSES}:`, error);
		return [];
	}
};
