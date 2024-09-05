import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {
	try {
		const session = await auth();

		const user = await prisma.user.findUnique({
			where: { id: session?.user.id! },
			include: { paymentMethods: true },
		});

		return Response.json(user?.paymentMethods);
	} catch (error) {
		console.error("x-> Error getting payment methods:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		// const response = await addPaymentMethods(paymentMethods);

		return Response.json("");
	} catch (error) {
		console.error("x-> Error adding payment methods:", error);
		return Response.error();
	}
}
