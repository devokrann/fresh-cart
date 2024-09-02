import { typePostCategory } from "@/types/categories";

const getPostCategories = async (): Promise<typePostCategory[]> => {
	try {
		// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/products`, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 	},
		// });
		// const result = await response.json();
		// return result;
	} catch (error) {
		console.error("X-> Error fetching post categories", error);

		return [];
	}
};

export default getPostCategories;
