import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const products = await prisma.products.findMany();

		const productsWithVariants = await Promise.all(
			products.map(async p => {
				const variants = await prisma.variants.findMany({
					where: { productId: p.id },
				});
				return { variants, ...p };
			})
		);

		const productsWithVariantsAndCategories = await Promise.all(
			productsWithVariants.map(async p => {
				const category = await prisma.productCategories.findUnique({
					where: { id: p.categoryId },
				});
				return { category, ...p };
			})
		);

		return Response.json(productsWithVariantsAndCategories);
	} catch (error) {
		console.error("x-> Error getting products:", error);
		return Response.error();
	}
}
