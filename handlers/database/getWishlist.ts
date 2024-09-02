import { typeCart } from "@/types/cart";

const getWishlist = async (): Promise<typeCart[]> => {
	try {
		return [];
	} catch (error) {
		console.error("X-> Error fetching wishlist", error);

		return [];
	}
};

export default getWishlist;
