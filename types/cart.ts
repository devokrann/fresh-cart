import { typeDatabaseFields } from "./database";
import { typeVariant } from "./variant";
import { typeUser } from "./user";

export interface typeCart extends typeDatabaseFields {
	compoundId: string;
	quantity: number;

	// relationships
	user: typeUser;
	variant: typeVariant;
}
