import prisma from "@/services/prisma";
import { typePostCategory } from "@/types/categories";

const addPostCategories = async (categories: typePostCategory[]) => {
	try {
		const result = await Promise.all(
			categories.map(
				async c =>
					await prisma.postCategory.create({
						data: { title: c.title },
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding post categories to database:", error);
	}
};

export default addPostCategories;
