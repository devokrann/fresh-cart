import { typeProduct, typeVariant } from "./product";

export interface typeWishlist {
	id: string;

	// relationships
	product: typeProduct;
	variant: typeVariant;
}
