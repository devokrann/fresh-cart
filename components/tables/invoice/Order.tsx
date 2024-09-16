"use client";

import { Anchor, Group, NumberFormatter, Paper, Skeleton, Table, Text } from "@mantine/core";
import React, { useContext } from "react";

import ContextCart from "@/contexts/Cart";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { calculateOrderedProducts, useCalculateCart } from "@/hooks/calculator";
import { typeOrderedProduct } from "@/types/orderedProducts";

export default function Order({ products }: { products: typeOrderedProduct[] }) {
	const pathname = usePathname();

	const { array: data, object } = calculateOrderedProducts(products);

	const rows = data.map(item => (
		<Table.Tr key={item.label} fw={data.indexOf(item) == data.length - 1 ? "bold" : undefined}>
			<Table.Td>{item.label}</Table.Td>
			<Table.Td ta={"end"} c={item.label == "Discount" ? "red.6" : undefined}>
				<Group justify="end" gap={4}>
					<>
						{item.label == "Discount" ? "-" : ""}{" "}
						<NumberFormatter thousandSeparator prefix={"$ "} suffix=".00" value={item.value} />
					</>
				</Group>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			<Table bg={"var(--mantine-color-gray-light)"} style={{ borderRadius: "var(--mantine-radius-md)" }}>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>

			{pathname == "/shop/cart" && (
				<Anchor underline="never" component={Link} href="/shop/checkout">
					<Paper bg={"pri"} c={"white"} py={6} px={"sm"} fw={500}>
						<Group justify="space-between">
							<Text component="span" inherit>
								Go to Checkout
							</Text>
							<Text component="span" inherit>
								<NumberFormatter
									thousandSeparator
									prefix="$ "
									suffix=".00"
									value={object.subTotal.value}
								/>
							</Text>
						</Group>
					</Paper>
				</Anchor>
			)}
		</>
	);
}
