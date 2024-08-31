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
	IconX,
} from "@tabler/icons-react";

import ModalProduct from "../../modal/Product";

import link from "@/handlers/parsers/string/link";
import getFraction from "@/handlers/fraction";

import classes from "./Cart.module.scss";

import ContextProducts from "@/contexts/Products";

import InputNumberProduct from "@/components/inputs/number/Product";
import OperatorCart from "@/components/operators/Cart";

import variant from "@/handlers/variant";

import { notifications } from "@mantine/notifications";
import { typeCart } from "@/types/cart";

export default function Cart({ data }: { data: typeCart }) {
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

				<GridCol span={{ base: 12, md: 4 }}>
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

						<Text fz={"sm"} c={"dimmed"}>
							{data.variant.unitValue} {variant.getUnit(data.variant)}
						</Text>
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
							c={data.variant.priceFormer ? "var(--mantine-color-red-6)" : undefined}
							fw={"bold"}
							ta={{ md: "end" }}
						>
							<NumberFormatter
								prefix="$"
								suffix=".00"
								value={data.quantity * data.variant.pricePresent}
							/>
						</Text>
						{data.variant.priceFormer && (
							<Text inherit lh={1} c={"dimmed"} td={"line-through"} ta={{ md: "end" }}>
								<NumberFormatter
									prefix="$"
									suffix=".00"
									value={data.quantity * data.variant.priceFormer}
								/>
							</Text>
						)}
					</Stack>
				</GridCol>

				<GridCol span={{ base: 12, md: 1 }}>
					<OperatorCart
						operation={{
							type: "remove",
							items: [{ product: data.product, variant: data.variant }],
						}}
					>
						<ActionIcon size={24} color="gray" variant="subtle">
							<IconX size={16} stroke={2} />
						</ActionIcon>
					</OperatorCart>
				</GridCol>
			</Grid>
		</Card>
	);
}
