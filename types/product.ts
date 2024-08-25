import { typeRating } from "./rating";

export interface typeVariant {
	id: string;
	image: string;
	available: boolean;
	price: { former: number | null; present: number };
	unit: { type: "mass" | "volume" | "size"; value: string };
}

export interface typeProduct {
	id: string;
	title: string;
	desc: string;
	category: string;
	code: string;
	brand: string;
	available: boolean;
	shipping: { days: number };
	status: { sale: boolean; hot: boolean };
	variants: typeVariant[];

	// relationships
	rating: typeRating;
}

export interface typeProductVariant {
	product: typeProduct;
	variant: typeVariant;
}
