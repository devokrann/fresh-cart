import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const categories = await prisma.productCategories.findMany();

		return Response.json(categories);
	} catch (error) {
		console.error("x-> Error getting product categories:", error);
		return Response.error();
	}
}
