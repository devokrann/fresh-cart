import prisma from "@/services/prisma";
import { typeProductCategory } from "@/types/categories";

const addProductCategories = async (categories: typeProductCategory[]) => {
	try {
		const result = await Promise.all(
			categories.map(
				async c =>
					await prisma.productCategory.create({
						data: { title: c.title },
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding product categories to database:", error);
	}
};

export default addProductCategories;
