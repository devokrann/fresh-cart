import prisma from "@/services/prisma";
import { typeWishlist } from "@/types/wishlist";

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
		const { userId, wishlist } = await req.json();

		const databaseWishlist = await prisma.user.findUnique({
			where: { id: userId },
			include: { wishlist: { include: { variant: true, product: true } } },
		});

		if (!databaseWishlist) {
			Response.json({ user: { exists: false } });
		} else {
			// filter database list to find items to remove
			const itemsToRemove = databaseWishlist.wishlist.filter(
				di => !wishlist.find((wi: typeWishlist) => wi.compoundId == di.compoundId)
			);

			// remove items from database
			await Promise.all(
				itemsToRemove.map(
					async i =>
						await prisma.wishlist.delete({
							where: { compoundId: i.compoundId },
							include: { product: true, variant: true },
						})
				)
			);

			// filter database list to find items to ignore
			const itemsToignore = databaseWishlist.wishlist.filter(di =>
				wishlist.find((wi: typeWishlist) => wi.compoundId == di.compoundId)
			);

			// filter wishlist to remove items already in database
			const itemsToInclude = wishlist.filter(
				(wi: typeWishlist) => !itemsToignore.find(di => di.compoundId == wi.compoundId)
			);

			// add filtrate to database
			const result = await prisma.user.update({
				where: { id: userId },
				data: {
					wishlist: {
						createMany: {
							data: itemsToInclude.map((i: typeWishlist) => {
								return {
									compoundId: i.compoundId,
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
		console.error("x-> Error updating wishlist:", error);
		return Response.error();
	}
}
