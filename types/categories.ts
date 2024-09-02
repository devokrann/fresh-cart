import { typeDatabaseFields } from "./database";
import { typePost } from "./post";
import { typeProduct } from "./product";

export interface typePostCategory extends typeDatabaseFields {
	title: string;

	// relationships
	posts: typePost[];
}

export interface typeProductCategory extends typeDatabaseFields {
	title: string;

	// relationships
	productParentCategory?: typeProductParentCategory;
	products: typeProduct[];
}

export interface typeProductParentCategory extends typeDatabaseFields {
	title: string;

	// relationships
	subCategories: typeProductCategory[];
	productCategories: typeProductCategory[];
}
