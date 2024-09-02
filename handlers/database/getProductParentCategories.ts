import { typeProductParentCategory } from "@/types/categories";

const getProductParentCategories = async (): Promise<typeProductParentCategory[]> => {
	try {
		// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parent-categories/products`, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 	},
		// });

		// const result = await response.json();

		// return result;
	} catch (error) {
		console.error("X-> Error fetching product categories", error);

		return [];
	}
};

export default getProductParentCategories;
