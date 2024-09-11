import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typePaymentMethod } from "@/types/payment";

export async function GET(req: Request) {
	try {
		const session = await auth();

		// add items from database
		const paymentMethods = await prisma.paymentMethod.findMany({ where: { userId: session?.user.id } });

		return Response.json(paymentMethods);
	} catch (error) {
		console.error("x-> Error getting payment methods:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();

		const method: typePaymentMethod = await req.json();

		// check if item is default
		if (method.default) {
			// remove existing user default from database
			await prisma.user.update({
				where: { id: session?.user.id },
				data: {
					paymentMethods: {
						updateMany: { where: { default: true }, data: { default: false } },
					},
				},
			});
		}

		// add new item to database
		const addMethod = await prisma.user.update({
			where: { id: session?.user.id },
			data: {
				paymentMethods: {
					create: [
						{
							title: method.title,
							name: method.name,
							number: method.number,
							cvc: method.cvc,
							email: method.email,
							expiry: method.expiry,
							type: method.type,
							default: method.default,
						},
					],
				},
			},
		});

		return Response.json(addMethod);
	} catch (error) {
		console.error("Error adding payment method:", error);
		return Response.error();
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();

		const { paymentMethod, formerValues, context } = await req.json();

		// check context
		if (context == "default") {
			// remove existing user default from database
			await prisma.user.update({
				where: { id: session?.user.id },
				data: {
					paymentMethods: {
						updateMany: { where: { default: true }, data: { default: false } },
					},
				},
			});
		}

		// update item in database
		const updateMethod = await prisma.paymentMethod.update({
			where: {
				userId_name_title: {
					userId: session?.user.id!,
					name: formerValues.name,
					title: formerValues.title,
				},
			},
			data: {
				title: paymentMethod.title,
				name: paymentMethod.name,
				number: paymentMethod.number,
				cvc: paymentMethod.cvc,
				email: paymentMethod.email,
				expiry: paymentMethod.expiry,
				type: paymentMethod.type,
				default: context == "default" ? true : paymentMethod.default,
			},
		});

		return Response.json(updateMethod);
	} catch (error) {
		console.error("Error updating payment method:", error);
		return Response.error();
	}
}

export async function DELETE(req: Request) {
	try {
		const session = await auth();

		const method = await req.json();

		let deleteMethod;

		if (!method.id) {
			// delete item from database using unique values
			deleteMethod = await prisma.paymentMethod.delete({
				where: {
					userId_name_title: {
						userId: session?.user.id!,
						name: method.name,
						title: method.title,
					},
				},
			});
		} else {
			// delete item from database
			deleteMethod = await prisma.paymentMethod.delete({ where: { id: method.id } });
		}

		return Response.json(deleteMethod);
	} catch (error) {
		console.error("Error deleting payment method:", error);
		return Response.error();
	}
}
