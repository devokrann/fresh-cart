import { typePurchase } from "./purchase";
import { typeUser } from "./user";

export interface typeReview {
	date: string;
	rating: number;
	title: string;
	desc: string;

	// relationships
	reviewer: typeUser;
	purchase: typePurchase;
}
