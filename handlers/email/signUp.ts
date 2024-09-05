import contact from "../resend/contact";
import code from "../resend/email/auth/code";

export const verifyEmail = async (otpValue: number, email: string) => {
	// send otp email
	const emailResponse = await code.signUp({ otp: otpValue.toString(), email });
	// add to audience
	const contactResponse = await contact.create({ email });

	return { email: emailResponse, contact: contactResponse };
};
