import { typeCart } from "./cart";
import { typeDatabaseFields } from "./database";
import { typeOrderedProduct } from "./orderedProducts";
import { typeProduct } from "./product";
import { typeWishlist } from "./wishlist";

export interface typeVariant extends typeDatabaseFields {
	image: string;
	available: boolean;
	priceFormer: number | null;
	pricePresent: number;
	unitType: "mass" | "volume" | "size";
	unitValue: string;

	// relationships
	product: typeProduct;
	cart: typeCart[];
	wishlist: typeWishlist[];
	orderedProducts: typeOrderedProduct[];
}
