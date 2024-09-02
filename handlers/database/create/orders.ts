import prisma from "@/services/prisma";
import { typeOrder } from "@/types/order";

const addOrders = async (orders: typeOrder[]) => {
	try {
		const users = await prisma.user.findMany();

		const result = await Promise.all(
			users.map(
				async u =>
					await Promise.all(
						orders.map(
							async o =>
								await prisma.order.create({
									data: {
										...o,
										userId: u.id,
									},
								})
						)
					)
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding payment methods to database:", error);
	}
};

export default addOrders;
