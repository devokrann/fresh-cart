import { typeCart } from "@/types/cart";

const total = {
	getTotal(products: typeCart[]) {
		let total = 0;

		products.map(p => {
			if (p.quantity) {
				total += p.variant.price.present * p.quantity;
			}
		});

		return total;
	},
};

export default total;
