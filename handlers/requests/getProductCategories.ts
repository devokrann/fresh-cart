import { typeProductCategory } from "@/types/categories";

const getProductCategories = async (): Promise<typeProductCategory[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/products`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching product categories", error);

		return [];
	}
};

export default getProductCategories;
