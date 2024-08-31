import { typeAddress } from "./address";
import { typeCart } from "./cart";
import { typeUser } from "./user";

export interface typeOrder {
	id: string;
	datePlaced: Date;
	dateDelivered: Date | null;
	subtotal: number;
	taxFee: number;
	serviceFee: number;
	shippingFee: number;
	status: string | "processing" | "completed" | "canceled";

	// relationships
	user: typeUser;
	products: typeCart[];
	addresses: typeAddress[];
}
