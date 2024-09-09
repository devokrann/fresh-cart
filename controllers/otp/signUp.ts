import prisma from "@/services/prisma";

export const createOtp = async (fields: { email: string; otp: string }) => {
	const expiry = new Date(Date.now() + 60 * 60 * 1000);

	try {
		await prisma.user.update({
			where: {
				email: fields.email,
			},
			data: {
				otps: {
					create: [{ email: fields.email, otp: fields.otp, expiresAt: expiry }],
				},
			},
		});
	} catch (error) {
		console.error("x-> Error creating otp record:", (error as Error).message);
		throw error;
	}
};
