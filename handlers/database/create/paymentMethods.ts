import prisma from "@/services/prisma";
import { typePaymentMethod } from "@/types/payment";

const addPaymentMethods = async (paymentMethods: typePaymentMethod[]) => {
	try {
		const users = await prisma.user.findMany();

		const result = await Promise.all(
			users.map(
				async u =>
					await Promise.all(
						paymentMethods.map(
							async m =>
								await prisma.paymentMethod.create({
									data: {
										...m,
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

export default addPaymentMethods;
