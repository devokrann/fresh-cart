import prisma from "@/services/prisma";
import { typeProduct } from "@/types/product";

const postProducts = async (product: typeProduct) => {
	try {
		await prisma.products.create({
			data: {
				title: product.title,
				desc: product.desc,
				category: product.category,
				code: product.code,
				brand: product.brand,
				available: product.available,
				shippingDays: product.shippingDays,
				sale: product.sale,
				hot: product.hot,

				variants: { create: product.variants },
			},
			include: {
				variants: true,
			},
		});
	} catch (error) {
		console.error("x-> Error adding products to database:", error);
	}
};

export default postProducts;
