import { typeUser } from "./user";

export interface typePost {
	image: string;
	title: string;
	description: { quote: { text: string; person: string }; preview: string; prose: string[] };
	date: string;
	length: number;
	category: string;

	// relationships
	author: typeUser;
}
