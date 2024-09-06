import { typePaymentMethod } from "@/types/payment";

const postPaymentMethods = async (paymentMethods: typePaymentMethod[]): Promise<typePaymentMethod[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`, {
			method: "POST",
			body: JSON.stringify(paymentMethods),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting payment methods", error);

		return [];
	}
};

export default postPaymentMethods;
