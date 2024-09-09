import { typePaymentMethod } from "@/types/payment";

const getPaymentMethods = async (): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`, {
			method: "GET",
			credentials: "include", // Ensures cookies are sent with the request
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching payment methods", error);

		return [];
	}
};

export default getPaymentMethods;
