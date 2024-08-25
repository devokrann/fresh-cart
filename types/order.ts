import { typeAddress } from "./address";
import { typeCart } from "./cart";
import { typeUser } from "./user";

export interface typeOrder {
	id: string;
	datePlaced: string;
	dateDelivered: string;
	subtotal: number;
	tax: number;
	serviceFee: number;
	shipping: number;
	status: string | "processing" | "completed" | "canceled";

	// relationships
	user: typeUser;
	products: typeCart[];
	invoiceAddress: typeAddress;
	shippingAddress: typeAddress;
}
