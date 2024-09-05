import { typeCart } from "@/types/cart";

export const getTotal = (products: typeCart[]) => {
	let total = 0;

	products.map(p => {
		if (p.quantity) {
			total += p.variant.pricePresent * p.quantity;
		}
	});

	return total;
};
