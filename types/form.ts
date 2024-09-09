import { typeAddress } from "./address";

export interface typeFormContact {
	fname: string;
	lname: string;
	email: string;
	phone: string | null;
	subject: string;
	message: string;
}

export interface typeFormRating {
	fname: string;
	lname: string;
	rating: string;
	review: string;
}

export interface typeFormSignUp {
	email: string;
	password: string;
}

export interface typeFormSignIn {
	email: string;
	password: string;
	remember: boolean;
}
