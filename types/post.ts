import { typePostCategory } from "./categories";
import { typeDatabaseFields } from "./database";
import { typeUser } from "./user";

export interface typePost extends typeDatabaseFields {
	image: string;
	title: string;
	description: string;
	quoteText: string;
	quoter: string;
	date: string;
	readingTime: number;

	// relationships
	user: typeUser;
	category: typePostCategory;
}
