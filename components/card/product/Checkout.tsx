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

import classes from "./Checkout.module.scss";

import InputNumberProduct from "@/components/inputs/number/Product";

import { notifications } from "@mantine/notifications";
import { typeCart } from "@/types/cart";
import variant from "@/handlers/variant";

export default function Checkout({ data }: { data: typeCart }) {
	return (
		<Card className={classes.card}>
			<Grid align="center">
				<GridCol span={{ base: 12, md: 2 }}>
					<Stack>
						<Image
							src={data.variant.image}
							alt={data.product.title}
							w={"100%"}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>
				</GridCol>

				<GridCol span={{ base: 12, md: 6 }}>
					<Stack gap={4} align="start">
						<Anchor
							underline="never"
							component={Link}
							href={`/shop/products/${link.linkify(data.product.title)}`}
							className={classes.link}
						>
							<Title order={3} fz={"sm"} fw={"bold"} lh={1}>
								{data.product.title}
							</Title>
						</Anchor>

						<Text inherit fz={"sm"}>
							{data.variant.unitValue} {variant.getUnit(data.variant)}
						</Text>
					</Stack>
				</GridCol>

				<GridCol span={{ base: 12, md: 1 }}>
					<Text inherit c={"dimmed"} fz={"xs"} ta={"end"}>
						{data.quantity}
					</Text>
				</GridCol>

				<GridCol span={{ base: 12, md: 3 }}>
					<Stack gap={"xs"} ta={{ md: "end" }} fz={"sm"}>
						<Text
							inherit
							lh={1}
							c={data.variant.priceFormer ? "var(--mantine-color-red-6)" : undefined}
							fw={"bold"}
						>
							<NumberFormatter
								prefix="$"
								suffix=".00"
								value={data.quantity * data.variant.pricePresent}
							/>
						</Text>
						{data.variant.priceFormer && (
							<Text inherit lh={1} c={"dimmed"} td={"line-through"}>
								<NumberFormatter
									prefix="$"
									suffix=".00"
									value={data.quantity * data.variant.priceFormer}
								/>
							</Text>
						)}
					</Stack>
				</GridCol>
			</Grid>
		</Card>
	);
}
