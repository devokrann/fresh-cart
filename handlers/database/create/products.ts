import prisma from "@/services/prisma";
import { typeProduct } from "@/types/product";

const addProducts = async (products: typeProduct[]) => {
	const categories = await prisma.productCategory.findMany();
	const users = await prisma.user.findMany();

	try {
		const result = await Promise.all(
			products.map(
				async p =>
					await prisma.product.create({
						data: {
							...p,
							categoryId: categories[0].id,
							variants: { create: p.variants },
							reviews: {
								create: [{ ...p.reviews[0], userId: users[1].id }],
							},
						},
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding products to database:", error);
	}
};

export default addProducts;
