export interface typeAddress {
	title: string;
	fname: string;
	lname: string;
	street: string;
	city: string;
	zip: string;
	state: string;
	country: string;
	email: string | null;
	phone: string | null;

	type: "billing" | "shipping" | string;
	default: boolean;
}
