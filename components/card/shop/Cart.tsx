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
				<Title order={2} fz={"lg"} c={"dark.4"}>
					Summary
				</Title>

				<TableInvoice />

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
