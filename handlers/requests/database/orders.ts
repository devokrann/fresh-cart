import { typeAddress } from "@/types/address";
import { typeCart } from "@/types/cart";
import { typeOrder } from "@/types/order";
import { typePaymentMethod } from "@/types/payment";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getOrders = async (): Promise<typeOrder[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching orders", error);
		return [];
	}
};

export const addOrder = async (data: {
	orderDetails?: {
		deliveryInstructions: string;
	};
	billingAddressTitle: string;
	shippingAddressTitle: string;
	paymentMethodTitle: string;
}): Promise<typeOrder[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.POST,
			body: JSON.stringify(data),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error adding order", error);
		throw error;
	}
};

export const updateOrder = async (address: typeOrder): Promise<typeOrder[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.PUT,
			body: JSON.stringify(address),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error updating order", error);
		throw error;
	}
};

export const deleteOrder = async (address: typeOrder): Promise<typeOrder[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.DELETE,
			body: JSON.stringify(address),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error deleting order", error);
		throw error;
	}
};
