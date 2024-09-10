import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typePaymentMethod } from "@/types/payment";

export async function GET(req: Request) {
	try {
		const session = await auth();

		const paymentMethods = await prisma.paymentMethod.findMany({ where: { userId: session?.user.id } });

		return Response.json(paymentMethods);
	} catch (error) {
		console.error("x-> Error getting payment methods:", error);
		return Response.error();
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();

		const data: typePaymentMethod[] = await req.json();

		const userPaymentMethods: typePaymentMethod[] = await prisma.paymentMethod.findMany({
			where: { userId: session?.user.id },
		});

		// find items to remove from database
		const itemsToRemove = userPaymentMethods.filter(m => !data.find(dm => dm.id == m.id));

		if (itemsToRemove.length > 0) {
			// remove items from database
			await Promise.all(
				userPaymentMethods.map(async dm => {
					const isPresent = itemsToRemove.find(m => m.id == dm.id);

					if (isPresent) {
						await prisma.paymentMethod.delete({ where: { id: dm.id } });
					}
				})
			);
		}

		const result = await Promise.all(
			data.map(async m => {
				// check if context item is present in database
				const isPresent = userPaymentMethods.find(dm => dm.id == m.id);

				if (isPresent) {
					// update item in database
					await prisma.paymentMethod.update({
						where: { id: m.id },
						data: {
							title: m.title,
							name: m.name,
							number: m.number,
							cvc: m.cvc,
							email: m.email,
							expiry: m.expiry,
							type: m.type,
							default: m.default,
						},
					});
				} else {
					// add new item to database
					await prisma.user.update({
						where: { id: session?.user.id },
						data: {
							paymentMethods: {
								create: [
									{
										title: m.title,
										name: m.name,
										number: m.number,
										cvc: m.cvc,
										email: m.email,
										expiry: m.expiry,
										type: m.type,
										default: m.default,
									},
								],
							},
						},
					});
				}
			})
		);

		return Response.json(result);
	} catch (error) {
		console.error("Error updating payment methods:", error);
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
