import { typeDatabaseFields } from "./database";
import { typeProduct } from "./product";
import { typeUser } from "./user";

export interface typeReview extends typeDatabaseFields {
	date: Date;
	rating: number;
	title: string;
	desc: string;

	// relationships
	product: typeProduct;
	user: typeUser;
}
