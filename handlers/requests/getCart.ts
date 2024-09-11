import { typeCart } from "@/types/cart";

const getCart = async (): Promise<typeCart[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching cart", error);

		return [];
	}
};

export default getCart;
