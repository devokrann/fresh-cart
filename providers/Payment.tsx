"use client";

import React, { useEffect, useState } from "react";

import ContextUserPayment from "@/contexts/Payment";

import { typePaymentMethod } from "@/types/payment";
import getPaymentMethods from "@/handlers/database/getPaymentMethods";

import { UserData } from "@/types/enums";
import { useSession } from "next-auth/react";
import { useDebouncedCallback } from "@mantine/hooks";
import postPaymentMethods from "@/handlers/database/postPaymentMethods";

export default function Payment({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const { data: session } = useSession();

	const inClient = typeof window !== "undefined";

	const [paymentMethods, setPaymentMethods] = useState<typePaymentMethod[] | null>(null);
	const [paymentLoading, setPaymentLoading] = useState(true);

	// const updateDatabasePaymentMethods = useDebouncedCallback(
	// 	async () => await postPaymentMethods(paymentMethods!),
	// 	5000
	// );

	useEffect(() => {
		const setInitialPayment = async () => {
			// fetch payment methods data asynchronously then set them
			inClient && setPaymentMethods(await handleSetPaymentMethods(session?.user.id));

			setPaymentLoading(false);
		};

		setInitialPayment();
	}, []);

	useEffect(() => {
		if (inClient && !paymentLoading) {
			// Sync payment methods with local storage
			window.localStorage.setItem(UserData.PAYMENT_METHODS, JSON.stringify(paymentMethods));

			// // Sync local storage payment methods with database (throttled)
			// session && updateDatabasePaymentMethods();
		}
	}, [paymentMethods]);

	return (
		<ContextUserPayment.Provider value={{ paymentMethods, setPaymentMethods }}>
			{children}
		</ContextUserPayment.Provider>
	);
}

const handleSetPaymentMethods = async (id?: string): Promise<typePaymentMethod[]> => {
	try {
		// Initialize from session storage
		const savedPaymentMethods = window.localStorage.getItem(UserData.PAYMENT_METHODS);

		if (!savedPaymentMethods) {
			return [];
		} else {
			// parse local payment methods
			const parsedSavedPaymentMethods: typePaymentMethod[] = await JSON.parse(savedPaymentMethods);

			if (parsedSavedPaymentMethods.length > 0) {
				return parsedSavedPaymentMethods;
			}

			// check if user is signed in
			if (id) {
				// get database payment methods
				const databasePaymentMethods = await getPaymentMethods();

				return databasePaymentMethods;
			}

			return parsedSavedPaymentMethods;
		}
	} catch (error) {
		console.error(`x-> Failed to parse ${UserData.PAYMENT_METHODS}:`, error);
		return [];
	}
};
