import prisma from "@/services/prisma";
import { typeCategory } from "@/types/categories";

const postCategories = async (category: typeCategory) => {
	try {
		await prisma.productCategories.create({
			data: {
				title: category.title,
				subCategories: {
					create: category.subCategories.map(sc => {
						return { title: sc };
					}),
				},
			},
			include: {
				subCategories: true,
			},
		});
	} catch (error) {
		console.error("x-> Error adding categories to database:", error);
	}
};

export default postCategories;
