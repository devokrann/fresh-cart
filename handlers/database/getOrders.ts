import { typeOrder } from "@/types/order";

const getOrders = async (userId: string): Promise<typeOrder[]> => {
	try {
		return [];
	} catch (error) {
		console.error("X-> Error fetching orders", error);

		return [];
	}
};

export default getOrders;
