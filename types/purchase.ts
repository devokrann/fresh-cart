import { typeOrder } from "./order";

export interface typePurchase {
	verified: boolean;

	// relationships
	order: typeOrder;
}
