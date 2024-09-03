import addOrders from "@/handlers/database/create/orders";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const stores = await prisma.store.findMany();

		return Response.json(stores);
	} catch (error) {
		console.error("x-> Error getting orders:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		// const response = await addOrders(orders);

		return Response.json('');
	} catch (error) {
		console.error("x-> Error adding orders:", error);
		return Response.error();
	}
}
