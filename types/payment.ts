export type typePaymentType = "mastercard" | "visa" | "discover" | "american express" | "paypal express";

export interface typePaymentMethods {
	title: string;
	name: string;
	number?: string;
	cvc?: string;
	email?: string;
	expiry?: string;
	type: typePaymentType | string;
	default: boolean;
}
