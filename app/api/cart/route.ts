import prisma from "@/services/prisma";
import { typeCart } from "@/types/cart";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const stores = await prisma.store.findMany();

		return Response.json(stores);
	} catch (error) {
		console.error("x-> Error getting wishlist:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const { userId, cart } = await req.json();

		const databaseCart = await prisma.user.findUnique({
			where: { id: userId },
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
							where: { compoundId: i.compoundId },
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
				where: { id: userId },
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
