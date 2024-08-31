import { typeDatabaseFields } from "./database";
import { typeUser } from "./user";

export interface typeOtl extends typeDatabaseFields {
	email: string;
	otl: string;

	// relationships
	user: typeUser;
}

export interface typeOtp extends typeDatabaseFields {
	email: string;
	otp: string;

	// relationships
	user: typeUser;
}
