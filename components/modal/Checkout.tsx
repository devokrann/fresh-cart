"use client";

import React, { useContext } from "react";
import { typeAddress } from "@/types/address";
import ContextUserCart from "@/contexts/Cart";
import ContextUserWishlist from "@/contexts/Wishlist";
import { updateAddress } from "@/handlers/requests/database/addresses";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronRight, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import OperatorWishlist from "../operators/Wishlist";
import OperatorCart from "../operators/Cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { joinIds } from "@/handlers/parsers/string";

export default function Checkout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const cartContext = useContext(ContextUserCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const wishlistContext = useContext(ContextUserWishlist);

	if (!wishlistContext) {
		throw new Error("ChildComponent must be used within a ContextWishlist.Provider");
	}

	const { wishlist, setWishlist } = wishlistContext;

	const outStocked = cart?.filter(i => !i.variant.available);

	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			title: `Checkout with Available Items?`,
			children: (
				<Text size="sm">
					Your cart contains items that are out of stock, these items will be moved to your wishlist.
				</Text>
			),
			labels: {
				confirm: "Confirm",
				cancel: "Cancel",
			},
			onCancel: () =>
				notifications.show({
					id: "address-default-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `Checkout canceled.`,
					variant: "failed",
				}),
			onConfirm: async () => {
				// remove unstocked items from cart
				setCart(cart?.filter(i => i.variant.available)!);

				// add unstocked items to wishlist
				setWishlist([
					...wishlist!,
					...outStocked?.map(i => {
						return { ...i, compoundId: joinIds(i.product.id!, i.variant.id!) };
					})!,
				]);

				// redirect to checkout
				router.push("/shop/checkout");
			},
		});

	return !outStocked ? (
		<Button component={Link} href={"/shop/checkout"} rightSection={<IconChevronRight size={16} stroke={2} />}>
			{children}
		</Button>
	) : (
		<Button onClick={openModal} rightSection={<IconChevronRight size={16} stroke={2} />}>
			{children}
		</Button>
	);
}
