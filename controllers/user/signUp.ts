import prisma from "@/services/prisma";

export const createUser = async (fields: { name?: string; email: string; image?: string; password: string | null }) => {
	try {
		await prisma.user.create({
			data: {
				name: fields.name,
				email: fields.email,
				image: fields.image,
				password: fields.password ? fields.password : null,
				verified: fields.password ? false : true,
			},
		});
	} catch (error) {
		console.error("x-> Error creating user record:", (error as Error).message);
		throw error;
	}
};
