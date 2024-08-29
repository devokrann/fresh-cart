import { typeUser } from "./user";

export interface typePost {
	image: string;
	title: string;
	description: string;
	quoteText: string;
	quoter: string;
	date: string;
	length: number;
	category: string;

	// relationships
	user: typeUser;
}
