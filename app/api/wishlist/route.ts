import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typeWishlist } from "@/types/wishlist";

export async function GET(req: Request) {
	try {
		const session = await auth();

		const databaseWishlist = await prisma.user.findUnique({
			where: { id: session?.user.id },
			include: { wishlist: { include: { variant: true, product: true } } },
		});

		return Response.json(databaseWishlist?.wishlist);
	} catch (error) {
		console.error("x-> Error getting wishlist:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();

		const wishlist = await req.json();

		const databaseWishlist = await prisma.user.findUnique({
			where: { id: session?.user.id },
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
							where: { userId_compoundId: { compoundId: i.compoundId, userId: session?.user.id! } },
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
				where: { id: session?.user.id },
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
