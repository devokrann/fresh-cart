import { typeAddress } from "./address";
import { typeCart } from "./cart";
import { typeDatabaseFields } from "./database";
import { typeOrder } from "./order";
import { typeOtl, typeOtp } from "./ots";
import { typePaymentMethod } from "./payment";
import { typePost } from "./post";
import { typeProfile } from "./profile";
import { typeReview } from "./review";
import { typeWishlist } from "./wishlist";

export interface typeUser extends typeDatabaseFields {
	email: string;
	image?: string;
	name?: string;
	position?: string;
	password?: string;
	verified?: boolean;
	emailVerified?: Date;
	role?: string;

	// relationships
	profile?: typeProfile;
	accounts: any[];
	sessions: any[];
	authenticators: any[];
	otps: typeOtp[];
	otls: typeOtl[];
	reviews: typeReview[];
	orders: typeOrder[];
	cart: typeCart[];
	wishlist: typeWishlist[];
	addresses: typeAddress[];
	posts: typePost[];
	paymentMethods: typePaymentMethod[];
}
