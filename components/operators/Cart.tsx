"use client";

import React, { useContext, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconShoppingCartMinus, IconShoppingCartPlus, IconShoppingCartX } from "@tabler/icons-react";
import { Box, Text } from "@mantine/core";
import { elementIsPresentInArray } from "@/utilities/array";
import { joinIds } from "@/handlers/parsers/string";
import ContextCart from "@/contexts/Cart";
import { typeProductVariant } from "@/types/productVariant";

export default function Cart({
	operation,
	children,
}: {
	operation: {
		type: "add" | "remove" | "decrease" | "increase" | "clear";
		items?: typeProductVariant[];
		unmount?: boolean;
		quantity?: number;
	};
	children: React.ReactNode;
}) {
	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const [mounted, setMounted] = useState(true);

	const addToCart = (set: typeProductVariant[]) => {
		const itemsToIgnore = cart
			? set.filter(item => elementIsPresentInArray(joinIds(item.product.id, item.variant.id), cart))
			: [];

		if (itemsToIgnore.length != set.length) {
			// Filter out all items already included
			const compoundIdsToIgnore = itemsToIgnore.map(item => joinIds(item.product.id, item.variant.id));

			cart &&
				setCart(
					cart.concat(
						set
							.map(s => {
								if (!compoundIdsToIgnore?.includes(joinIds(s.product.id, s.variant.id))) {
									return {
										compoundId: joinIds(s.product.id, s.variant.id),
										quantity: set.length > 1 ? 1 : operation.quantity ? operation.quantity : 1,
										...s,
									};
								} else {
									return undefined;
								}
							})
							.filter(p => p != undefined)
					)
				);

			notifications.show({
				id: `cart-add-${set.map(item => joinIds(item.product.id, item.variant.id)).join("-")}`,
				icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
				title: `Added to Cart`,
				message: (
					<Text inherit>
						{set.length > 1 ? (
							`${set.length} items`
						) : (
							<Text component="span" inherit fw={500} c={"sl.4"}>
								{set[0].product.title}
							</Text>
						)}{" "}
						added to your your cart.
					</Text>
				),
				variant: "success",
			});
		} else {
			notifications.show({
				id: `cart-added`,
				icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
				title: `Already Added`,
				message: `${set.length > 1 ? "All selected items" : set[0].product.title} already added to your cart.`,
				variant: "info",
			});
		}
	};

	const removeFromCart = (set: typeProductVariant[]) => {
		const itemsToRemove = cart
			? set.filter(item => elementIsPresentInArray(joinIds(item.product.id, item.variant.id), cart))
			: [];

		if (itemsToRemove.length > 0) {
			// Update the cart by filtering out all items in one go
			const compoundIdsToRemove = itemsToRemove.map(item => joinIds(item.product.id, item.variant.id));
			cart && setCart(cart.filter(p => !compoundIdsToRemove.includes(p.compoundId)));

			notifications.show({
				id: `cart-remove-${itemsToRemove.map(item => joinIds(item.product.id, item.variant.id)).join("-")}`,
				icon: <IconShoppingCartMinus size={16} stroke={1.5} />,
				title: `Removed From Cart`,
				message: (
					<Text inherit>
						{itemsToRemove.length > 1 ? (
							`${itemsToRemove.length} items`
						) : (
							<Text component="span" inherit fw={500} c={"sl.4"}>
								{itemsToRemove[0].product.title}
							</Text>
						)}{" "}
						removed from your cart.
					</Text>
				),
				variant: "failed",
			});
		} else {
			notifications.show({
				id: `cart-removed`,
				icon: <IconShoppingCartMinus size={16} stroke={1.5} />,
				title: `Already Removed`,
				message: `All selected items already removed from your cart.`,
				variant: "info",
			});
		}
	};

	const updateQuantity = {
		decrease(id: string) {
			cart &&
				setCart(
					cart.map(p =>
						p.compoundId == id ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : p.quantity } : p
					)
				);
		},

		increase(id: string) {
			cart &&
				setCart(
					cart.map(p =>
						p.compoundId == id ? { ...p, quantity: p.quantity < 99 ? p.quantity + 1 : p.quantity } : p
					)
				);
		},
	};

	const getOperation = () => {
		if (!operation.items) {
			operation.type == "clear" && setCart([]);
		} else {
			operation.type == "add" && addToCart(operation.items);
			operation.type == "remove" && removeFromCart(operation.items);
			operation.type == "decrease" &&
				updateQuantity.decrease(joinIds(operation.items[0].product.id, operation.items[0].variant.id));
			operation.type == "increase" &&
				updateQuantity.increase(joinIds(operation.items[0].product.id, operation.items[0].variant.id));
		}

		operation.unmount && setMounted(false);
	};

	useEffect(() => {
		cart && setMounted(cart.length > 0);
	}, [cart]);

	return (
		<Box onClick={getOperation} display={operation.unmount ? (mounted ? undefined : "none") : undefined}>
			{children}
		</Box>
	);
}
