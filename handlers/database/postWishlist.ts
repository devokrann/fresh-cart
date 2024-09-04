import { typeWishlist } from "@/types/wishlist";

const postWishlist = async (userId: string, wishlist: typeWishlist[]): Promise<typeWishlist[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
			method: "POST",
			body: JSON.stringify({ userId, wishlist }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting wishlist", error);

		return [];
	}
};

export default postWishlist;
