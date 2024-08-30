import { typeCart } from "@/types/cart";

const getWishlist = async (): Promise<typeCart[]> => {
	try {
		return [];
	} catch (error) {
		return [];
		console.error("X-> Error fetching wishlist", error);
	}
};

export default getWishlist;
