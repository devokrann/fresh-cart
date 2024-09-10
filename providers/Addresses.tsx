"use client";

import React, { useEffect, useState } from "react";

import ContextUserAddresses from "@/contexts/Addresses";

import { typeAddress } from "@/types/address";
import { getAddresses } from "@/handlers/requests/database/addresses";

import { UserData } from "@/types/enums";
import { useSession } from "next-auth/react";
// import { useDebouncedCallback } from "@mantine/hooks";

export default function Addresses({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const { data: session } = useSession();

	const inClient = typeof window !== "undefined";

	const [addresses, setAddresses] = useState<typeAddress[] | null>(null);
	const [addressesLoading, setAddressesLoading] = useState(true);

	// const updateDatabaseAddresses = useDebouncedCallback(async () => await postAddresses(addresses!), 5000);

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

			// // Sync local storage addresses with database (throttled)
			// session && updateDatabaseAddresses();
		}
	}, [addresses]);

	return (
		<ContextUserAddresses.Provider value={{ addresses, setAddresses }}>{children}</ContextUserAddresses.Provider>
	);
}

const handleSetAddresses = async (id?: string): Promise<typeAddress[]> => {
	try {
		// get database addresses
		const databaseAddresses = await getAddresses();

		// Sync addresses with local storage
		window.localStorage.setItem(UserData.ADDRESSES, JSON.stringify(databaseAddresses));

		// Initialize from session storage
		const savedAddresses = window.localStorage.getItem(UserData.ADDRESSES);

		// parse local addresses
		const parsedSavedAddresses: typeAddress[] = await JSON.parse(savedAddresses!);

		return parsedSavedAddresses;
	} catch (error) {
		console.error(`x-> Failed to parse ${UserData.ADDRESSES}:`, error);
		return [];
	}
};
