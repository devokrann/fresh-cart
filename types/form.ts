import { typeAddress } from "./address";

export interface typeContact {
	fname: string;
	lname: string;
	email: string;
	phone: string | null;
	subject: string;
	message: string;
}

export interface typeFormAddress {
	billing: typeAddress;
	different: boolean;
	shipping: typeAddress;
}

export interface typeRating {
	fname: string;
	lname: string;
	rating: string;
	review: string;
}

export interface typeSignUp {
	email: string;
	password: string;
}

export interface typeSignIn {
	email: string;
	password: string;
	save: boolean;
}
