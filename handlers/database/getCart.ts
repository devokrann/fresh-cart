import { typeCart } from "@/types/cart";

const getCart = async (): Promise<typeCart[]> => {
	try {
		return [];
	} catch (error) {
		console.error("X-> Error fetching cart", error);

		return [];
	}
};

export default getCart;
