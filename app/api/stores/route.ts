import storesd from "@/data/stores";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const stores = await prisma.stores.findMany();

		return Response.json(stores);
	} catch (error) {
		console.error("x-> Error getting product categories:", error);
		return Response.error();
	}
}
