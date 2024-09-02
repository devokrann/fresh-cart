import prisma from "@/services/prisma";
import { typeUser } from "@/types/user";

const addUsers = async (users: typeUser[]) => {
	try {
		const result = await Promise.all(
			users.map(
				async u =>
					await prisma.user.create({
						data: {
							image: u.image,
							name: u.name,
							email: u.email,
							verified: u.verified,
						},
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding users to database:", error);
	}
};

export default addUsers;
