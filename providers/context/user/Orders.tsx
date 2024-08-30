"use client";

import React, { useEffect, useState } from "react";

import ContextUserOrders from "@/contexts/user/Orders";

import { typeOrder } from "@/types/order";
import getOrders from "@/handlers/database/getOrders";
import array from "@/utilities/array";

import { ProductArrays } from "@/types/enums";

export default function Orders({ children }: { children: React.ReactNode }) {
	// window.localStorage.clear();

	const inClient = typeof window !== "undefined";

	const [orders, setOrders] = useState<typeOrder[] | null>(null);
	const [ordersLoading, setOrdersLoading] = useState(true);

	useEffect(() => {
		const setInitialOrders = async () => {
			// fetch orders data asynchronously then set orders
			inClient && setOrders(await getLocalOrders());
			setOrdersLoading(false);
		};

		setInitialOrders();
	}, []);

	useEffect(() => {
		if (inClient && !ordersLoading) {
			// Sync orders with local storage
			inClient && window.localStorage.setItem(ProductArrays.ORDERS, JSON.stringify(orders));
			// Sync local storage orders with database (throttled)
		}
	}, [orders]);

	return <ContextUserOrders.Provider value={{ orders, setOrders }}>{children}</ContextUserOrders.Provider>;
}

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
