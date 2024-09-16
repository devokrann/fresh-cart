import { enumRequest } from "@/types/request";
import { typeStore } from "@/types/store";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/stores`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getStores = async (): Promise<typeStore[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("X-> Error fetching stores", error);

		return [];
	}
};
