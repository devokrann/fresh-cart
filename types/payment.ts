import { typeDatabaseFields } from "./database";
import { typeUser } from "./user";

export type typePaymentType = "mastercard" | "visa" | "discover" | "american express" | "paypal express";

export interface typePaymentMethod extends typeDatabaseFields {
	title: string;
	name: string;
	number?: string;
	cvc?: string;
	email?: string;
	expiry?: string;
	type: typePaymentType | string;
	default: boolean;

	// relationships
	user: typeUser;
}
