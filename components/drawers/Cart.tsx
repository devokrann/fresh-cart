"use client";

import React, { useContext } from "react";

import {
	ActionIcon,
	Box,
	Button,
	Center,
	Divider,
	Drawer,
	Group,
	Indicator,
	Skeleton,
	Stack,
	Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMoodEmpty, IconShoppingCart } from "@tabler/icons-react";
import ProviderIndicatorProducts from "@/providers/indicators/Products";
import CardProductCart from "../card/product/Cart";
import NotificationEmpty from "../notification/Empty";

import classes from "./Cart.module.scss";

import ContextProducts from "@/contexts/Products";
import Link from "next/link";

export default function Cart() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = productsContext;

	const [opened, { open, close }] = useDisclosure(false);

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
				classNames={{
					body: classes.body,
					header: classes.header,
					inner: classes.inner,
					overlay: classes.overlay,
					root: classes.root,
					title: classes.title,
				}}
			>
				{cart.length > 0 ? (
					<Stack gap={"xl"} justify="space-between">
						<Stack
							gap={0}
							pt={"md"}
							px={"xs"}
							style={{
								height: "calc(100vh - 144px)",
								overflowY: "scroll",
							}}
						>
							{cart.map(product => (
								<Box
									key={product.title}
									style={{
										borderTop:
											cart.indexOf(product) > 0
												? "1px solid var(--mantine-color-default-border)"
												: "",
										paddingTop: cart.indexOf(product) > 0 ? "var(--mantine-spacing-xs)" : "",
										paddingBottom:
											cart.indexOf(product) < cart.length - 1 ? "var(--mantine-spacing-xs)" : "",
									}}
								>
									<CardProductCart data={product} />
								</Box>
							))}
						</Stack>

						<Group grow px={"md"}>
							<Button variant="outline" onClick={close} component={Link} href={"/shop/cart"}>
								View Cart
							</Button>
							<Button component={Link} href={"/shop/checkout"}>
								Checkout
							</Button>
						</Group>
					</Stack>
				) : (
					<NotificationEmpty label="cart" />
				)}
			</Drawer>

			{/* <Skeleton height={mobile ? 16 : tablet ? 20 : 20} circle /> */}

			<ProviderIndicatorProducts variant="cart">
				<Center>
					<ActionIcon onClick={open} variant="transparent" color="gray">
						<Center>
							<IconShoppingCart size={24} />
						</Center>
					</ActionIcon>
				</Center>
			</ProviderIndicatorProducts>
		</>
	);
}
