import { typeDatabaseFields } from "./database";
import { typeOrder } from "./order";
import { typeUser } from "./user";

export interface typeAddress extends typeDatabaseFields {
	title: string;
	fname: string;
	lname: string;
	street: string;
	city: string;
	zip: string;
	state: string;
	country: string;
	email?: string | null;
	phone?: string | null;
	type: "billing" | "shipping" | string;
	default: boolean;

	// relationships
	user?: typeUser;
	order?: typeOrder | null;
}
