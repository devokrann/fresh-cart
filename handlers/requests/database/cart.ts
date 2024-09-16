import { typeCart } from "@/types/cart";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/cart`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getCart = async (): Promise<typeCart[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching cart", error);

		return [];
	}
};

export const postCart = async (cart: typeCart[]): Promise<typeCart[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.POST,
			body: JSON.stringify(cart),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting cart", error);

		return [];
	}
};
