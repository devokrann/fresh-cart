import { typeCart } from "@/types/cart";

const getWishlist = async (): Promise<typeCart[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching wishlist", error);

		return [];
	}
};

export default getWishlist;
