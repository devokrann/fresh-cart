import { createContext, Dispatch, SetStateAction } from "react";

import { typeProduct } from "@/types/product";

interface typeContextProducts {
	wishlist: typeProduct[];
	setWishlist: Dispatch<SetStateAction<typeProduct[]>>;
	cart: typeProduct[];
	setCart: Dispatch<SetStateAction<typeProduct[]>>;
}

const Products = createContext<typeContextProducts | null>(null);

export default Products;
