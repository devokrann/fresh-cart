import { typeAddress } from "./address";
import { typeCart } from "./cart";
import { typeDatabaseFields } from "./database";
import { typeOrder } from "./order";
import { typePaymentMethod } from "./payment";
import { typeReview } from "./review";
import { typeWishlist } from "./wishlist";

export interface typeUser extends typeDatabaseFields {
	image?: string;
	name?: string;
	position?: string;
	password?: string;
	email: string;
	verified: boolean;
	emailVerified?: Date;
	role: string;

	// relationships
	profile: any;
	accounts: any;
	sessions: any;
	authenticators: any;
	otps: any[];
	otls: any[];
	reviews: typeReview[];
	orders: typeOrder[];
	cart: typeCart[];
	wishlist: typeWishlist[];
	addresses: typeAddress[];
	posts: any[];
	paymentMethods: typePaymentMethod[];
}
