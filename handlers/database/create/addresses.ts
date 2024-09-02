import prisma from "@/services/prisma";
import { typeAddress } from "@/types/address";

const addAddresses = async (addresses: typeAddress[]) => {
	try {
		const users = await prisma.user.findMany();

		const result = await Promise.all(
			users.map(
				async u =>
					await Promise.all(
						addresses.map(
							async a =>
								await prisma.address.create({
									data: {
										...a,
										userId: u.id,
									},
								})
						)
					)
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding users to database:", error);
	}
};

export default addAddresses;
