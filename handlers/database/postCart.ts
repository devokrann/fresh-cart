import { typeCart } from "@/types/cart";

const postCart = async (userId: string, cart: typeCart[]): Promise<typeCart[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
			method: "POST",
			body: JSON.stringify({ userId, cart }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting cart", error);

		return [];
	}
};

export default postCart;
