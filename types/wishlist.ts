import { typeDatabaseFields } from "./database";
import { typeUser } from "./user";
import { typeVariant } from "./variant";

export interface typeWishlist extends typeDatabaseFields {
	// relationships
	user: typeUser;
	variant: typeVariant;
}
