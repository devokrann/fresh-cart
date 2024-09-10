import { typeStore } from "@/types/store";

const getStores = async (): Promise<typeStore[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("X-> Error fetching stores", error);

		return [];
	}
};

export default getStores;
