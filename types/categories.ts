import { typePost } from "./post";
import { typeProduct } from "./product";

export interface typeProductSubCategory {
	id: string;
	title: string;
}

export interface typeProductCategory {
	id: string;
	title: string;

	// rels
	subCategories: typeProductSubCategory[];
	products: typeProduct[];
}

export interface typeBlogPostCategory {
	id: string;
	title: string;

	// rels
	posts: typePost[];
}
