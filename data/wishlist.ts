import compoundId from "@/handlers/parsers/string/compoundId";
import products from "./products";
import { typeCart } from "@/types/cart";

const wishlist: typeCart[] = products
	.map(p => {
		const variant = p.variants[0];

		return products.indexOf(p) < 3
			? {
					id: compoundId.getCompoundId({ product: p, variant }),
					quantity: products.indexOf(p) + 1,
					product: products[products.indexOf(p)],
					variant: variant,
			  }
			: undefined;
	})
	.filter(p => p != undefined);

export default wishlist;
