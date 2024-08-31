import { typeDatabaseFields } from "./database";
import { typeOrder } from "./order";
import { typeVariant } from "./variant";

export interface typeOrderedProduct extends typeDatabaseFields {
	quantity: number;

	// relationships
	variant: typeVariant;
	order: typeOrder;
}
