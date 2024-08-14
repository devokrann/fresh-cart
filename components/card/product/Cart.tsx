"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import NextImage from "next/image";
import Link from "next/link";

import {
	Title,
	Image,
	Card,
	CardSection,
	Stack,
	Text,
	Anchor,
	Group,
	Rating,
	Button,
	Badge,
	ActionIcon,
	Tooltip,
	Grid,
	GridCol,
	Center,
	NumberFormatter,
	NumberInput,
	NumberInputHandlers,
} from "@mantine/core";

import {
	IconEye,
	IconHeart,
	IconMinus,
	IconPlus,
	IconShoppingCart,
	IconShoppingCartMinus,
	IconShoppingCartPlus,
	IconShoppingCartX,
	IconTrash,
} from "@tabler/icons-react";

import ModalProduct from "../../modal/Product";

import link from "@/handlers/parsers/string/link";
import getFraction from "@/handlers/fraction";

import classes from "./Cart.module.scss";

import { typeProduct } from "@/types/product";

import ContextProducts from "@/contexts/Products";

import InputNumberProduct from "@/components/inputs/number/Product";

import { notifications } from "@mantine/notifications";

export default function Cart({ data }: { data: typeProduct }) {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = productsContext;

	if (!data.quantity) {
		throw new Error("Quantity is required");
	}

	const removeFromCart = () => {
		if (!cart.find(p => p.title == data.title)?.title) {
			notifications.show({
				id: `cart-${data.title}`,
				icon: <IconShoppingCartX size={16} stroke={1.5} />,
				title: `Already Removed`,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						already removed from your cart
					</Text>
				),
				variant: "failed",
			});
		} else {
			setCart(cart.filter(p => p.title != data.title));

			notifications.show({
				id: `cart-${data.title}`,
				icon: <IconShoppingCartMinus size={16} stroke={1.5} />,
				title: `Removed From Cart`,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						removed from your cart
					</Text>
				),
				variant: "success",
			});
		}
	};

	useEffect(() => {}, [data.quantity]);

	return (
		<Card className={classes.card}>
			<Grid align="center">
				<GridCol span={{ base: 12, md: 2 }}>
					<Stack>
						<Image
							src={data.image}
							alt={data.title}
							w={"100%"}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>
				</GridCol>

				<GridCol span={{ base: 12, md: 5 }}>
					<Stack gap={4} align="start">
						<Anchor
							underline="never"
							component={Link}
							href={`/blog/${link.linkify(data.title)}`}
							className={classes.link}
						>
							<Title order={3} fz={"sm"} fw={"bold"} lh={1}>
								{data.title}
							</Title>
						</Anchor>

						<>
							{data.variants.capacity && (
								<Text fz={"sm"} c={"dimmed"}>
									{data.variants.capacity[0]} ml
								</Text>
							)}

							{data.variants.weight && (
								<Text fz={"sm"} c={"dimmed"}>
									{data.variants.weight[0]} g
								</Text>
							)}
						</>

						<Button
							p={4}
							h={"fit-content"}
							leftSection={<IconTrash size={16} stroke={2} />}
							variant="subtle"
							onClick={removeFromCart}
						>
							Remove
						</Button>
					</Stack>
				</GridCol>

				<GridCol span={{ base: 12, md: 3 }}>
					<InputNumberProduct data={data} />
				</GridCol>

				<GridCol span={{ base: 12, md: 2 }}>
					<Stack gap={"xs"}>
						<Text
							inherit
							lh={1}
							c={data.price.former ? "var(--mantine-color-red-6)" : undefined}
							fw={"bold"}
							ta={{ md: "end" }}
						>
							<NumberFormatter prefix="$" suffix=".00" value={data.quantity * data.price.present} />
						</Text>
						{data.price.former && (
							<Text inherit lh={1} c={"dimmed"} td={"line-through"} ta={{ md: "end" }}>
								<NumberFormatter prefix="$" suffix=".00" value={data.quantity * data.price.former} />
							</Text>
						)}
					</Stack>
				</GridCol>
			</Grid>
		</Card>
	);
}
