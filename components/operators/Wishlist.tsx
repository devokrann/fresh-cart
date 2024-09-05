"use client";

import React, { useContext, useEffect, useState } from "react";

import { notifications } from "@mantine/notifications";
import { IconHeartMinus, IconHeartPlus, IconShoppingCartPlus } from "@tabler/icons-react";
import { Box, Text } from "@mantine/core";
import { elementIsPresentInArray } from "@/utilities/array";
import { joinIds } from "@/handlers/parsers/string";
import ContextWishlist from "@/contexts/Wishlist";
import { typeProductVariant } from "@/types/productVariant";

export default function Wishlist({
	operation,
	children,
}: {
	operation: {
		type: "add" | "remove" | "transfer" | "clear";
		items?: typeProductVariant[];
		unmount?: boolean;
	};
	children: React.ReactNode;
}) {
	const wishlistContext = useContext(ContextWishlist);

	if (!wishlistContext) {
		throw new Error("ChildComponent must be used within a ContextWishlist.Provider");
	}

	const { wishlist, setWishlist } = wishlistContext;

	const [mounted, setMounted] = useState(true);

	const addToWishlist = (set: typeProductVariant[]) => {
		const itemsToIgnore = wishlist
			? set.filter(item => elementIsPresentInArray(joinIds(item.product.id, item.variant.id), wishlist))
			: [];

		if (itemsToIgnore.length != set.length) {
			// Filter out all items already included
			const compoundIdsToIgnore = itemsToIgnore.map(item => joinIds(item.product.id, item.variant.id));

			wishlist &&
				setWishlist(
					wishlist.concat(
						set
							.map(s => {
								if (!compoundIdsToIgnore.includes(joinIds(s.product.id, s.variant.id))) {
									return { ...s, compoundId: joinIds(s.product.id, s.variant.id) };
								} else {
									return undefined;
								}
							})
							.filter(p => p != undefined)
					)
				);

			notifications.show({
				id: `wishlist-add-${set.map(item => joinIds(item.product.id, item.variant.id)).join("-")}`,
				icon: <IconHeartPlus size={16} stroke={1.5} />,
				title: `Added to Wishlist`,
				message: (
					<Text inherit>
						{set.length > 1 ? (
							`${set.length} items`
						) : (
							<Text component="span" inherit fw={500} c={"sl.4"}>
								{set[0].product.title}
							</Text>
						)}{" "}
						added to your your wishlist.
					</Text>
				),
				variant: "success",
			});
		} else {
			notifications.show({
				id: `wishlist-added`,
				icon: <IconHeartPlus size={16} stroke={1.5} />,
				title: `Already Added`,
				message: `${
					set.length > 1 ? "All selected items" : set[0].product.title
				} already added to your wishlist.`,
				variant: "info",
			});
		}
	};

	const removeFromWishlist = (set: typeProductVariant[]) => {
		const itemsToRemove = wishlist
			? set.filter(item => elementIsPresentInArray(joinIds(item.product.id, item.variant.id), wishlist))
			: [];

		if (itemsToRemove.length > 0) {
			// Update the wishlist by filtering out all items in one go
			const compoundIdsToRemove = itemsToRemove.map(item => joinIds(item.product.id, item.variant.id));
			wishlist && setWishlist(wishlist.filter(p => !compoundIdsToRemove.includes(p.compoundId)));

			operation.type != "transfer" &&
				notifications.show({
					id: `wishlist-remove-${itemsToRemove
						.map(item => joinIds(item.product.id, item.variant.id))
						.join("-")}`,
					icon: <IconHeartMinus size={16} stroke={1.5} />,
					title: `Removed From Wishlist`,
					message: (
						<Text inherit>
							{itemsToRemove.length > 1 ? (
								`${itemsToRemove.length} items`
							) : (
								<Text component="span" inherit fw={500} c={"sl.4"}>
									{itemsToRemove[0].product.title}
								</Text>
							)}{" "}
							removed from your wishlist.
						</Text>
					),
					variant: "failed",
				});
		} else {
			notifications.show({
				id: `wishlist-removed`,
				icon: <IconHeartMinus size={16} stroke={1.5} />,
				title: `Already Removed`,
				message: `All selected items already removed from your wishlist.`,
				variant: "info",
			});
		}
	};

	const getOperation = () => {
		if (!operation.items) {
			operation.type == "clear" && setWishlist([]);
		} else {
			operation.type == "add" && addToWishlist(operation.items);
			operation.type == "remove" && removeFromWishlist(operation.items);
			operation.type == "transfer" && removeFromWishlist(operation.items);
		}

		operation.unmount && setMounted(false);
	};

	useEffect(() => {
		wishlist && setMounted(wishlist.length > 0);
	}, [wishlist]);

	return (
		<Box onClick={getOperation} display={operation.unmount ? (mounted ? undefined : "none") : undefined}>
			{children}
		</Box>
	);
}
