import { typeBlogPostCategory } from "./categories";
import { typeUser } from "./user";

export interface typePost {
	id: string;
	image: string;
	title: string;
	description: string;
	quoteText: string;
	quoter: string;
	date: string;
	length: number;
	category: typeBlogPostCategory;

	// relationships
	user: typeUser;
}
