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

import CardProductInvoiceOrder from "../product/invoice/Order";

import TableInvoiceCart from "@/components/tables/invoice/Cart";

import classes from "./Order.module.scss";
import contact from "@/data/contact";
import { typeOrderedProduct } from "@/types/orderedProducts";

export default function Order({ orderedProducts }: { orderedProducts: typeOrderedProduct[] }) {
	return (
		<Card className={classes.card} withBorder>
			<Stack gap={"xs"}>
				<Title order={2} fz={"lg"}>
					Order Details
				</Title>

				<Stack gap={0}>
					{orderedProducts.map(product => (
						<Box
							key={product.id}
							style={
								orderedProducts.indexOf(product) > 0
									? {
											borderTop: "1px solid var(--mantine-color-default-border)",
									  }
									: undefined
							}
						>
							<CardProductInvoiceOrder data={product} />
						</Box>
					))}
				</Stack>

				<TableInvoiceCart />

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
