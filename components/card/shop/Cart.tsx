"use client";

import { Anchor, Button, Card, Divider, Group, NumberFormatter, Paper, Stack, Table, Text, Title } from "@mantine/core";
import React, { useContext } from "react";

import ContextProducts from "@/contexts/Products";

import FormShopRedeem from "@/partials/forms/shop/Redeem";

import classes from "./Cart.module.scss";

import TableInvoice from "@/components/tables/Invoice";

export default function Cart() {
	return (
		<Card className={classes.card} withBorder>
			<Stack gap={"xs"}>
				<Title order={2} fz={"lg"}>
					Summary
				</Title>

				<TableInvoice />

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
