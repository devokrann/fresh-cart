"use client";

import React, { useContext, useEffect } from "react";

import {
	ActionIcon,
	Box,
	Button,
	Center,
	Divider,
	Drawer,
	Group,
	Indicator,
	NumberFormatter,
	Skeleton,
	Stack,
	Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMoodEmpty, IconShoppingCart } from "@tabler/icons-react";
import IndicatorCart from "../indicators/Cart";
import CardProductCart from "../card/product/Cart";
import NotificationEmpty from "../notification/Empty";

import classes from "./Cart.module.scss";

import ContextCart from "@/contexts/Cart";
import Link from "next/link";
import compoundId from "@/handlers/parsers/string/compoundId";
import total from "@/handlers/total";

export default function Cart() {
	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const [opened, { open, close }] = useDisclosure(false);

	const skeletons = [
		{
			id: "1",
			element: <Skeleton height={48} w={"100%"} />,
		},
	];

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				size={560}
				title={
					<Text component="span" inherit fw={500}>
						Cart
					</Text>
				}
				position="right"
				classNames={classes}
			>
				<Stack gap={"xl"} justify="space-between" style={{ height: "calc(100vh - 80px)" }}>
					{!cart ? (
						skeletons.map(s => s.element)
					) : cart.length > 0 ? (
						<Stack
							gap={0}
							pt={"md"}
							px={"xs"}
							style={{
								height: "calc(100vh - 144px)",
								overflowY: "scroll",
							}}
						>
							{cart.map(item => (
								<Box
									key={compoundId.getCompoundId(item)}
									style={{
										borderTop:
											cart.indexOf(item) > 0
												? "1px solid var(--mantine-color-default-border)"
												: "",
										paddingTop: cart.indexOf(item) > 0 ? "var(--mantine-spacing-xs)" : "",
										paddingBottom:
											cart.indexOf(item) < cart.length - 1 ? "var(--mantine-spacing-xs)" : "",
									}}
								>
									<CardProductCart data={item} />
								</Box>
							))}
						</Stack>
					) : (
						<NotificationEmpty label="cart" />
					)}

					<Stack gap={"xs"} px={"md"}>
						<Group fz={"xl"} justify="space-between">
							<Text inherit>Subtotal: </Text>
							{!cart ? (
								<Skeleton height={24} width={32} />
							) : (
								<Text inherit fw={"bold"}>
									<NumberFormatter
										prefix="$ "
										suffix=".00"
										value={total.getTotal(cart)}
										thousandSeparator
									/>
								</Text>
							)}
						</Group>

						<Group grow>
							<Button
								variant="outline"
								onClick={close}
								component={Link}
								href={"/shop/cart"}
								color="pri.6"
							>
								View Cart
							</Button>
							<Button component={Link} href={"/shop/checkout"}>
								Checkout
							</Button>
						</Group>
					</Stack>
				</Stack>
			</Drawer>

			{/* <Skeleton height={mobile ? 16 : tablet ? 20 : 20} circle /> */}

			<IndicatorCart>
				<Center>
					<ActionIcon onClick={open} variant="transparent" color="gray">
						<Center>
							<IconShoppingCart size={24} stroke={1} />
						</Center>
					</ActionIcon>
				</Center>
			</IndicatorCart>
		</>
	);
}
