import { typePurchase } from "./purchase";
import { typeUser } from "./user";

export interface typeReview {
	date: Date;
	rating: number;
	title: string;
	desc: string;

	purchase: typePurchase;
}
