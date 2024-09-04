import { typeDatabaseFields } from "./database";
import { typeProduct } from "./product";
import { typeUser } from "./user";
import { typeVariant } from "./variant";

export interface typeWishlist {
	compoundId: string;

	// relationships
	user?: typeUser;
	variant?: typeVariant;
	product?: typeProduct;
}
