import { typeOrder } from "./order";

export interface typePurchase {
	verified: boolean;
	date: Date;

	// relationships
	order: typeOrder;
}
