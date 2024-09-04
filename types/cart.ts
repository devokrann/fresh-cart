import { typeDatabaseFields } from "./database";
import { typeVariant } from "./variant";
import { typeUser } from "./user";
import { typeProduct } from "./product";

export interface typeCart {
	quantity: number;
	compoundId: string;

	// relationships
	user?: typeUser;
	variant: typeVariant;
	product: typeProduct;
}
