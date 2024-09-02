import addProducts from "@/handlers/database/create/products";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const products = await prisma.product.findMany({ include: { variants: true, category: true } });

		return Response.json(products);
	} catch (error) {
		console.error("x-> Error getting products:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		// const response = await addProducts(products);

		return Response.json("");
	} catch (error) {
		console.error("x-> Error adding products:", error);
		return Response.error();
	}
}
