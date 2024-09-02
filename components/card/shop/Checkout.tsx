"use client";

import {
	Anchor,
	Box,
	Button,
	Card,
	Divider,
	Group,
	NumberFormatter,
	Paper,
	Skeleton,
	Stack,
	Table,
	Text,
	Title,
} from "@mantine/core";
import React, { useContext } from "react";

import ContextCart from "@/contexts/user/Cart";

import FormShopRedeem from "@/partials/forms/shop/Redeem";

import CardProductCheckout from "../product/Checkout";

import TableInvoice from "@/components/tables/Invoice";

import classes from "./Checkout.module.scss";
import contact from "@/data/contact";

export default function Checkout() {
	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const skeleton = <Skeleton height={64} />;

	return (
		<Card className={classes.card} withBorder>
			<Stack gap={"xs"}>
				<Title order={2} fz={"lg"}>
					Order Details
				</Title>

				{!cart ? (
					<Stack gap={"xs"}>
						{skeleton}
						{skeleton}
						{skeleton}
					</Stack>
				) : (
					<Stack gap={0}>
						{cart.map(product => (
							<Box
								key={product.id}
								style={
									cart.indexOf(product) > 0
										? {
												borderTop: "1px solid var(--mantine-color-default-border)",
										  }
										: undefined
								}
							>
								<CardProductCheckout data={product} />
							</Box>
						))}
					</Stack>
				)}

				<TableInvoice />

				<Text c="dimmed" fz={"xs"}>
					By placing your order, you agree to be bound by the {contact.name.company}{" "}
					<Anchor underline="hover" inherit>
						Terms of Service
					</Anchor>{" "}
					and{" "}
					<Anchor underline="hover" inherit>
						Privacy Policy
					</Anchor>
					.
				</Text>
			</Stack>
		</Card>
	);
}
