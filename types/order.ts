import { typeAddress } from "./address";
import { typeCart } from "./cart";
import { typeDatabaseFields } from "./database";
import { typePurchase } from "./purchase";
import { typeUser } from "./user";

export interface typeOrder extends typeDatabaseFields {
	datePlaced: Date;
	dateDelivered: Date | null;
	taxFee: number;
	serviceFee: number;
	shippingFee: number;
	status: string | "processing" | "completed" | "canceled";

	// relationships
	user: typeUser;
	purchase?: typePurchase;
	addresses: typeAddress[];
	orderedProducts: typeCart[];
}
