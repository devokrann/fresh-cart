import { Dispatch, SetStateAction } from "react";
import { typeProduct } from "./product";
import { typeCart } from "./cart";
import { typeOrder } from "./order";
import { typeWishlist } from "./wishlist";
import { typePaymentMethod } from "./payment";

export interface typeContextProducts {
	products: typeProduct[] | null;
	setProducts: Dispatch<SetStateAction<typeProduct[] | null>>;
}

export interface typeContextCart {
	cart: typeCart[] | null;
	setCart: Dispatch<SetStateAction<typeCart[] | null>>;
}

export interface typeContextOrders {
	orders: typeOrder[] | null;
	setOrders: Dispatch<SetStateAction<typeOrder[] | null>>;
}

export interface typeContextWishlist {
	wishlist: typeWishlist[] | null;
	setWishlist: Dispatch<SetStateAction<typeWishlist[] | null>>;
}

export interface typeContextPaymentMethod {
	paymentMethods: typePaymentMethod[] | null;
	setPaymentMethods: Dispatch<SetStateAction<typePaymentMethod[] | null>>;
}
