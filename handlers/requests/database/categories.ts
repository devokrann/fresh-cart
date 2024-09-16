import { typeProductCategory, typeProductParentCategory } from "@/types/categories";
import { enumRequest } from "@/types/request";

const apiUrl = {
	category: `${process.env.NEXT_PUBLIC_API_URL}/api/categories/products`,
	parentCategory: `${process.env.NEXT_PUBLIC_API_URL}/api/parent-categories/products`,
};
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getProductCategories = async (): Promise<typeProductCategory[]> => {
	try {
		const response = await fetch(apiUrl.category, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching product categories", error);

		return [];
	}
};

export const getProductParentCategories = async (): Promise<typeProductParentCategory[]> => {
	try {
		const response = await fetch(apiUrl.parentCategory, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching product parent categories", error);

		return [];
	}
};
