import { typeCategory } from "./categories";
import { typeReview } from "./review";

export interface typeVariant {
	id: string;
	image: string;
	available: boolean;
	priceFormer: number | null;
	pricePresent: number;
	unitType: "mass" | "volume" | "size";
	unitValue: string;
}

export interface typeProduct {
	id: string;
	title: string;
	desc: string;
	code: string;
	brand: string;
	available: boolean;
	shippingDays: number;
	sale: boolean;
	hot: boolean;
	variants: typeVariant[];

	// relationships
	category: typeCategory;
	reviews: typeReview[];
}

export interface typeProductVariant {
	product: typeProduct;
	variant: typeVariant;
}
