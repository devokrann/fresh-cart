import { typeDatabaseFields } from "./database";
import { typeUser } from "./user";

export interface typeProfile extends typeDatabaseFields {
	fname?: string;
	lname?: string;
	bio?: string;

	// relationships
	user: typeUser;
}
