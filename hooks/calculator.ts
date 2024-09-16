import { useContext } from "react";

import ContextUserCart from "@/contexts/Cart";
import { typeOrderedProduct } from "@/types/orderedProducts";

export const useCalculateCart = () => {
	const cartContext = useContext(ContextUserCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const getTotal = () => {
		let total = 0;

		cart?.map(p => {
			if (p.quantity) {
				total += p.variant.pricePresent * p.quantity;
			}
		});

		return total;
	};

	const itemSubtotal = { label: "Item Subtotal", value: getTotal() };
	const shipping = { label: "Shipping", value: Math.ceil(getTotal() * 0.1) };
	const serviceFee = { label: "Service Fee", value: Math.ceil(3 * cart?.length!) };
	const tax = { label: "Tax", value: Math.ceil(getTotal() * 0) };
	const discount = { label: "Discount", value: Math.ceil(getTotal() * 0.15) };
	const subTotal = {
		label: "Subtotal",
		value: Math.ceil(itemSubtotal.value + shipping.value + serviceFee.value + tax.value - discount.value),
	};

	const array = [itemSubtotal, shipping, serviceFee, tax, discount, subTotal];
	const object = { itemSubtotal, shipping, serviceFee, tax, discount, subTotal };

	return { array, object };
};

export const calculateOrderedProducts = (products: typeOrderedProduct[]) => {
	const getTotal = () => {
		let total = 0;

		products?.map(p => {
			if (p.quantity) {
				total += p.variant.pricePresent * p.quantity;
			}
		});

		return total;
	};

	const itemSubtotal = { label: "Item Subtotal", value: getTotal() };
	const shipping = { label: "Shipping", value: Math.ceil(getTotal() * 0.1) };
	const serviceFee = { label: "Service Fee", value: Math.ceil(3 * products?.length!) };
	const tax = { label: "Tax", value: Math.ceil(getTotal() * 0) };
	const discount = { label: "Discount", value: Math.ceil(getTotal() * 0.15) };
	const subTotal = {
		label: "Subtotal",
		value: Math.ceil(itemSubtotal.value + shipping.value + serviceFee.value + tax.value - discount.value),
	};

	const array = [itemSubtotal, shipping, serviceFee, tax, discount, subTotal];
	const object = { itemSubtotal, shipping, serviceFee, tax, discount, subTotal };

	return { array, object };
};
