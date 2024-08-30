import { typeCart } from "@/types/cart";

const getCart = async (): Promise<typeCart[]> => {
	try {
		return [];
	} catch (error) {
		return [];
		console.error("X-> Error fetching cart", error);
	}
};

export default getCart;
