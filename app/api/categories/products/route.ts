import categories from "@/data/categories";
import addProductCategories from "@/handlers/database/create/productCategories";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const productCategories = await prisma.productCategory.findMany();

		return Response.json(productCategories);
	} catch (error) {
		console.error("x-> Error getting product categories:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		const response = await addProductCategories(categories.product);

		return Response.json(response);
	} catch (error) {
		console.error("x-> Error adding product categories:", error);
		return Response.error();
	}
}
