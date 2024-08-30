import { typeCategory } from "@/types/categories";

const getCategories = async (): Promise<typeCategory[]> => {
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
		console.error("X-> Error fetching categories", error);

		return [];
	}
};

export default getCategories;
