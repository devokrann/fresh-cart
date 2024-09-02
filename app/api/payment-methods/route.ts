import paymentMethods from "@/data/payment";
import addPaymentMethods from "@/handlers/database/create/paymentMethods";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const posts = await prisma.paymentMethod.findMany();

		return Response.json(posts);
	} catch (error) {
		console.error("x-> Error getting payment methods:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		const response = await addPaymentMethods(paymentMethods);

		return Response.json(response);
	} catch (error) {
		console.error("x-> Error adding payment methods:", error);
		return Response.error();
	}
}
