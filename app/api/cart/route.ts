import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typeCart } from "@/types/cart";

export async function GET(req: Request) {
	try {
		const session = await auth();

		const databaseCart = await prisma.user.findUnique({
			where: { id: session?.user.id },
			include: { cart: { include: { variant: true, product: true } } },
		});

		return Response.json(databaseCart?.cart);
	} catch (error) {
		console.error("x-> Error getting wishlist:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();

		const cart = await req.json();

		const databaseCart = await prisma.user.findUnique({
			where: { id: session?.user.id },
			include: { cart: { include: { variant: true, product: true } } },
		});

		if (!databaseCart) {
			Response.json({ user: { exists: false } });
		} else {
			// filter database list to find items to remove
			const itemsToRemove = databaseCart.cart.filter(
				di => !cart.find((ci: typeCart) => ci.compoundId == di.compoundId && di.quantity == ci.quantity)
			);

			// remove items from database
			await Promise.all(
				itemsToRemove.map(
					async i =>
						await prisma.cart.delete({
							where: { userId_compoundId: { compoundId: i.compoundId, userId: session?.user.id! } },
							include: { product: true, variant: true },
						})
				)
			);

			// filter database list to find items to ignore
			const itemsToignore = databaseCart.cart.filter(di => {
				return cart.find((ci: typeCart) => ci.compoundId == di.compoundId && ci.quantity == di.quantity);
			});

			// filter cart to remove items already in database
			const itemsToInclude = cart.filter(
				(ci: typeCart) =>
					!itemsToignore.find(di => di.compoundId == ci.compoundId && di.quantity == ci.quantity)
			);

			// add filtrate to database
			const result = await prisma.user.update({
				where: { id: session?.user.id! },
				data: {
					cart: {
						createMany: {
							data: itemsToInclude.map((i: typeCart) => {
								return {
									compoundId: i.compoundId,
									quantity: i.quantity,
									productId: i.product?.id!,
									variantId: i.variant?.id!,
								};
							}),
						},
					},
				},
			});

			return Response.json(result);
		}
	} catch (error) {
		console.error("x-> Error updating cart:", error);
		return Response.error();
	}
}
