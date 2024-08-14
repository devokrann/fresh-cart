"use client";

import { Anchor, Button, Card, Divider, Group, NumberFormatter, Paper, Stack, Table, Text, Title } from "@mantine/core";
import React, { useContext } from "react";

import ContextProducts from "@/contexts/Products";

import FormShopRedeem from "@/partials/forms/shop/Redeem";

import classes from "./Cart.module.scss";

export default function Cart() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = productsContext;

	const getTotal = () => {
		let total = 0;

		cart.map(p => {
			if (p.quantity) {
				total += p.price.present * p.quantity;
			}
		});

		return total;
	};

	const itemSubtotal = { label: "Item Subtotal", value: getTotal() };
	const serviceFee = { label: "Service Fee", value: 3 * cart.length };
	const subTotal = { label: "Subtotal", value: itemSubtotal.value + serviceFee.value };

	const data = [itemSubtotal, serviceFee, subTotal];

	const rows = data.map(item => (
		<Table.Tr key={item.label} fw={data.indexOf(item) == data.length - 1 ? "bold" : undefined}>
			<Table.Td>{item.label}</Table.Td>
			<Table.Td ta={"end"}>
				<NumberFormatter prefix="$ " suffix=".00" value={item.value} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Card className={classes.card} withBorder>
			<Stack gap={"xs"}>
				<Title order={2} fz={"lg"} c={"dark.4"}>
					Summary
				</Title>

				<Table bg={"var(--mantine-color-gray-light)"} style={{ borderRadius: "var(--mantine-radius-md)" }}>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>

				<Anchor underline="never" href="/shop/checkout">
					<Paper bg={"pri"} c={"white"} py={6} px={"sm"} fw={500}>
						<Group justify="space-between">
							<Text component="span" inherit>
								Go to Checkout
							</Text>
							<Text component="span" inherit>
								<NumberFormatter prefix="$ " suffix=".00" value={subTotal.value} />
							</Text>
						</Group>
					</Paper>
				</Anchor>

				<Text c="dimmed" fz={"xs"}>
					By placing your order, you agree to be bound by the Freshcart{" "}
					<Anchor underline="hover" inherit>
						Terms of Service
					</Anchor>{" "}
					and{" "}
					<Anchor underline="hover" inherit>
						Privacy Policy
					</Anchor>
					.
				</Text>

				<Divider />

				<Title order={3} fz={"md"} c={"dark.4"}>
					Add Promo or Gift Card
				</Title>

				<FormShopRedeem />

				<Text c="dimmed" fz={"xs"}>
					Terms and conditions apply.
				</Text>
			</Stack>
		</Card>
	);
}
