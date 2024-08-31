import { typePurchase } from "./purchase";
import { typeUser } from "./user";

export interface typeReview {
	date: Date;
	rating: number;
	title: string;
	desc: string;

	// rels
	purchase: typePurchase;
	user: typeUser;
}
