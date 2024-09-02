import { typeOrder } from "@/types/order";

const getOrders = async (): Promise<typeOrder[]> => {
	try {
		return [];
	} catch (error) {
		return [];
		console.error("X-> Error fetching orders", error);
	}
};

export default getOrders;
