import { createOtp } from "@/controllers/otp/signUp";
import { createUser } from "@/controllers/user/signUp";
import { verifyEmail } from "@/libraries/email/signUp";
import { generateOtp } from "@/libraries/generators/otp";
import prisma from "@/services/prisma";
import hasher from "@/utilities/hasher";

export async function POST(req: Request) {
	try {
		const { name, email, image, password } = await req.json();

		// query database for user
		const userRecord = await prisma.user.findUnique({ where: { email } });

		if (!userRecord) {
			if (!password) {
				// create user record
				await createUser({ name, email, image, password });

				return Response.json({
					user: { exists: false },
					otp: null,
					resend: null,
				});
			} else {
				// create password hash
				const passwordHash = await hasher.create(password);

				// create user record
				passwordHash && (await createUser({ email, password: passwordHash }));

				// create otp
				const otpValue = generateOtp();
				// create otp hash
				const otpHash = await hasher.create(otpValue.toString());
				// create otp record
				otpHash && (await createOtp({ email, otp: otpHash }));

				console.log(otpValue);

				return Response.json({
					user: { exists: false },
					otp: { value: otpValue },
					// // send otp email and output result in response body
					// resend: await verifyEmail(otpValue, email),
				});
			}
		} else {
			if (!userRecord.verified) {
				return Response.json({ user: { exists: true, verified: false } });
			} else {
				return Response.json({ user: { exists: true, verified: true } });
			}
		}
	} catch (error) {
		console.error("x-> Error signing up:", (error as Error).message);
		return Response.error();
	}
}
