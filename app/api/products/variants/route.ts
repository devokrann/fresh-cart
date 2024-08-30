import prisma from "@/services/prisma";

export async function POST(req: Request) {
	try {
		const { productId } = await req.json();

		const variants = await prisma.variants.findMany({ where: { productId } });

		return Response.json(variants);
	} catch (error) {
		console.error("x-> Error getting product variants:", error);
		return Response.error();
	}
}
