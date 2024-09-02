import { typeProductCategory } from "./categories";
import { typeDatabaseFields } from "./database";
import { typeReview } from "./review";
import { typeVariant } from "./variant";

export interface typeProduct extends typeDatabaseFields {
	title: string;
	desc: string;
	code: string;
	brand: string;
	available: boolean;
	shippingDays: number;
	sale: boolean;
	hot: boolean;

	// relationships
	category: typeProductCategory;
	variants: typeVariant[];
	reviews: typeReview[];
}
