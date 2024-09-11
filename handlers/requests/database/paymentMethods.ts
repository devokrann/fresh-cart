import { typePaymentMethod } from "@/types/payment";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getPaymentMethods = async (): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			credentials: "include", // Ensures cookies are sent with the request
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching payment methods", error);

		return [];
	}
};

export const addPaymentMethod = async (paymentMethod: typePaymentMethod): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.POST,
			body: JSON.stringify(paymentMethod),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error adding payment method", error);

		return [];
	}
};

export const updatePaymentMethod = async (data: {
	paymentMethod: typePaymentMethod;
	formerValues?: { title: string; name: string };
	context?: "default";
}): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.PUT,
			body: JSON.stringify(data),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error updating payment method", error);

		return [];
	}
};

export const deletePaymentMethod = async (paymentMethod: typePaymentMethod): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.DELETE,
			body: JSON.stringify(paymentMethod),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error deleting payment method", error);

		return [];
	}
};
