import { auth } from "@/auth";
import prisma from "@/services/prisma";

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
		// const session = await auth();
		// const data = await req.json();

		// const paymentMethod = await prisma.user.update({
		// 	where: { id: session?.user.id! },
		// 	data: { paymentMethods: { create: data } },
		// 	include: { paymentMethods: true },
		// });

		return Response.json("paymentMethod");
	} catch (error) {
		console.error("Error adding payment method:", error);
		return Response.error();
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();
		const data = await req.json();

		const paymentMethod = await prisma.paymentMethod.update({
			where: {
				userId_name_title: {
					userId: session?.user.id!,
					name: data.formerValues.name,
					title: data.formerValues.title,
				},
			},
			data: {
				title: data.title,
				name: data.name,
				number: data.number,
				cvc: data.cvc,
				email: data.email,
				expiry: data.expiry,
				type: data.type,
				default: data.default,
			},
		});

		return Response.json(paymentMethod);
	} catch (error) {
		console.error("Error updating payment method:", error);
		return Response.error();
	}
}

export async function DELETE(req: Request) {
	try {
		const data = await req.json();

		const paymentMethod = await prisma.paymentMethod.delete({
			where: { id: data.id },
		});

		return Response.json(paymentMethod);
	} catch (error) {
		console.error("Error deleting payment method:", error);
		return Response.error();
	}
}
