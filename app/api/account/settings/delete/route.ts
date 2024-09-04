import prisma from "@/services/prisma";
import hasher from "@/utilities/hasher";

export async function POST(req: Request) {
	try {
		const { userId, password } = await req.json();

		const userRecord = await prisma.user.findUnique({ where: { id: userId } });

		if (!userRecord) {
			return Response.json({ user: { exists: false } });
		} else {
			if (!userRecord.password) {
				if (!password) {
					await handleDelete(userId);

					return Response.json({ user: { exists: true, password: { match: true } } });
				} else {
					return Response.json({ user: { exists: true, password: { match: false } } });
				}
			} else {
				const passwordMatch = await hasher.compare(password, userRecord.password);

				if (!passwordMatch) {
					return Response.json({ user: { exists: true, password: { match: false } } });
				} else {
					await handleDelete(userId);

					return Response.json({ user: { exists: true, password: { match: true } } });
				}
			}
		}
	} catch (error) {
		console.error("x-> Error deleting account:", (error as Error).message);
		return Response.error();
	}
}

const handleDelete = async (id: string) => {
	// delete user and user-related records
	await prisma.user.delete({
		where: { id },
		include: {
			profile: true,
			accounts: true,
			sessions: true,
			authenticators: true,
			otps: true,
			otls: true,
			reviews: true,
			orders: true,
			cart: true,
			wishlist: true,
			addresses: true,
			posts: true,
			paymentMethods: true,
		},
	});
};
