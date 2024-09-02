import { typeProduct } from "@/types/product";

const getProducts = async (): Promise<typeProduct[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching products", error);

		return [];
	}
};

export default getProducts;
