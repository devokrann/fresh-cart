import { typeReview } from "./review";

export interface typeVariant {
	image: string;
	available: boolean;
	priceFormer: number | null;
	pricePresent: number;
	unitType: "mass" | "volume" | "size";
	unitValue: string;
}

export interface typeProduct {
	title: string;
	desc: string;
	category: string;
	code: string;
	brand: string;
	available: boolean;
	shippingDays: number;
	sale: boolean;
	hot: boolean;
	variants: typeVariant[];

	// relationships
	reviews: typeReview[];
}

export interface typeProductVariant {
	product: typeProduct;
	variant: typeVariant;
}
