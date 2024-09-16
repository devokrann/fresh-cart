"use client";

import { Anchor, Button, Card, Divider, Group, NumberFormatter, Paper, Stack, Table, Text, Title } from "@mantine/core";
import React, { useContext } from "react";

import FormShopRedeem from "@/partials/forms/shop/Redeem";

import classes from "./Cart.module.scss";

import TableInvoiceCart from "@/components/tables/invoice/Cart";

export default function Cart() {
	return (
		<Card className={classes.card} withBorder>
			<Stack gap={"xs"}>
				<Title order={2} fz={"lg"}>
					Summary
				</Title>

				<TableInvoiceCart />

				<Divider />

				<Title order={3} fz={"md"}>
					Add Promo or Gift Card
				</Title>

				<FormShopRedeem />

				<Text c="light-dark(var(--mantine-color-gray-6),var(--mantine-color-text))" fz={"xs"}>
					Terms and conditions apply.
				</Text>
			</Stack>
		</Card>
	);
}
