"use client";

import { Anchor, Group, NumberFormatter, Paper, Skeleton, Table, Text } from "@mantine/core";
import React, { useContext } from "react";

import ContextCart from "@/contexts/user/Cart";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Invoice() {
	const pathname = usePathname();

	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = cartContext;

	const getTotal = () => {
		let total = 0;

		cart?.map(p => {
			if (p.quantity) {
				total += p.variant.pricePresent * p.quantity;
			}
		});

		return total;
	};

	const itemSubtotal = { label: "Item Subtotal", value: getTotal() };
	const shipping = { label: "Shipping", value: Math.ceil(getTotal() * 0.1) };
	const serviceFee = { label: "Service Fee", value: Math.ceil(3 * cart?.length!) };
	const tax = { label: "Tax", value: Math.ceil(getTotal() * 0) };
	const discount = { label: "Discount", value: Math.ceil(getTotal() * 0.15) };
	const subTotal = {
		label: "Subtotal",
		value: Math.ceil(itemSubtotal.value + shipping.value + serviceFee.value + tax.value - discount.value),
	};

	const data = [itemSubtotal, shipping, serviceFee, tax, discount, subTotal];

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
										value={subTotal.value}
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
