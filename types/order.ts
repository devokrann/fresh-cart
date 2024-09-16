import { typeAddress } from "./address";
import { typeDatabaseFields } from "./database";
import { typeOrderedProduct } from "./orderedProducts";
import { typePurchase } from "./purchase";
import { typeUser } from "./user";

export interface typeOrder {
	id: number;
	datePlaced: Date;
	dateDelivered: Date | null;
	deliveryInstructions: string;
	status: string | "processing" | "completed" | "canceled";

	// relationships
	user: typeUser;
	purchase?: typePurchase;
	addresses: typeAddress[];
	orderedProducts: typeOrderedProduct[];
}
