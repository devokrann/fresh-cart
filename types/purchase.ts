import { typeDatabaseFields } from "./database";
import { typeOrder } from "./order";

export interface typePurchase extends typeDatabaseFields {
	date: Date;

	// relationships
	order: typeOrder;
}
