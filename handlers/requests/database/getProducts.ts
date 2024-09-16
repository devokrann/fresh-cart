import { typeProduct } from "@/types/product";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getProducts = async (): Promise<typeProduct[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching products", error);

		return [];
	}
};
