import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		// const ordersWithRelations = await prisma.order.findMany({
		// 	include: {
		// 		user: true,
		// 		orderedProducts: true,
		// 		addresses: true,
		// 	},
		// });

		const orders = await prisma.order.findMany();

		const ordersUser = await Promise.all(
			orders.map(async o => {
				const user = await prisma.user.findUnique({
					where: { id: o.userId },
				});
				return { user, ...o };
			})
		);

		const ordersUserProducts = await Promise.all(
			ordersUser.map(async o => {
				const orderedProducts = await prisma.orderedProduct.findMany({
					where: { orderId: o.id },
				});
				return { orderedProducts, ...o };
			})
		);

		const ordersUserProductsAddresses = await Promise.all(
			ordersUserProducts.map(async o => {
				const addresses = await prisma.address.findMany({
					where: { orderId: o.id },
				});
				return { addresses, ...o };
			})
		);

		return Response.json(ordersUserProductsAddresses);
	} catch (error) {
		console.error("x-> Error getting products:", error);
		return Response.error();
	}
}
