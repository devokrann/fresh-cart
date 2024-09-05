import { typePaymentMethod } from "@/types/payment";
import { cookies } from "next/headers";

const getPaymentMethods = async (): Promise<typePaymentMethod[]> => {
	try {
		const cookieStore = cookies();
		const sessionToken = cookieStore.get("authjs.session-token");

		if (sessionToken) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`, {
				method: "GET",
				credentials: "include", // Ensures cookies are sent with the request
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Cookie: `authjs.session-token=${sessionToken.value}`, // Include session token in the request
				},
			});

			const result = await response.json();

			return result;
		}

		throw new Error("User must be signed in");
	} catch (error) {
		console.error("X-> Error fetching payment methods", error);

		return [];
	}
};

export default getPaymentMethods;
