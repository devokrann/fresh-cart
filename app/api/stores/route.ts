import stores from "@/data/stores";
import addStores from "@/handlers/database/create/stores";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const stores = await prisma.store.findMany();

		return Response.json(stores);
	} catch (error) {
		console.error("x-> Error getting stores:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		const response = await addStores(stores);

		return Response.json(response);
	} catch (error) {
		console.error("x-> Error adding stores:", error);
		return Response.error();
	}
}
