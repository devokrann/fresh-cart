import { typeProduct, typeVariant } from "./product";

export interface typeCart {
	id: string;
	quantity: number;

	// relationships
	product: typeProduct;
	variant: typeVariant;
}
