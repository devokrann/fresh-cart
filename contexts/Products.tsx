import { createContext, Dispatch, SetStateAction } from "react";

import { typeOrder } from "@/types/order";
import { typeCart } from "@/types/cart";
import { typeWishlist } from "@/types/wishlist";

interface typeContextProducts {
	wishlist: typeWishlist[];
	setWishlist: Dispatch<SetStateAction<typeWishlist[]>>;
	cart: typeCart[];
	setCart: Dispatch<SetStateAction<typeCart[]>>;
	orders: typeOrder[];
	setOrders: Dispatch<SetStateAction<typeOrder[]>>;
}

const Products = createContext<typeContextProducts | null>(null);

export default Products;
