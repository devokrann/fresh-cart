import { typeCart } from "@/types/cart";
import { enumRequest } from "@/types/request";
import { typeWishlist } from "@/types/wishlist";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getWishlist = async (): Promise<typeCart[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching wishlist", error);

		return [];
	}
};

export const postWishlist = async (wishlist: typeWishlist[]): Promise<typeWishlist[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.POST,
			body: JSON.stringify(wishlist),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting wishlist", error);

		return [];
	}
};
