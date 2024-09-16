"use client";

import { Anchor, Group, NumberFormatter, Paper, Skeleton, Table, Text } from "@mantine/core";
import React, { useContext } from "react";

import ContextCart from "@/contexts/Cart";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCalculateCart } from "@/hooks/calculator";

export default function Cart() {
	const pathname = usePathname();

	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = cartContext;

	const { array: data, object } = useCalculateCart();

	const rows = data.map(item => (
		<Table.Tr key={item.label} fw={data.indexOf(item) == data.length - 1 ? "bold" : undefined}>
			<Table.Td>{item.label}</Table.Td>
			<Table.Td ta={"end"} c={item.label == "Discount" ? "red.6" : undefined}>
				<Group justify="end" gap={4}>
					{!cart ? (
						<Skeleton height={16} width={64} />
					) : (
						<>
							{item.label == "Discount" ? "-" : ""}{" "}
							<NumberFormatter thousandSeparator prefix={"$ "} suffix=".00" value={item.value} />
						</>
					)}
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
								{!cart ? (
									<Skeleton height={16} width={64} />
								) : (
									<NumberFormatter
										thousandSeparator
										prefix="$ "
										suffix=".00"
										value={object.subTotal.value}
									/>
								)}
							</Text>
						</Group>
					</Paper>
				</Anchor>
			)}
		</>
	);
}
