"use client";

import React, { useContext, useEffect, useState } from "react";

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
	Skeleton,
} from "@mantine/core";

import {
	IconEye,
	IconHeart,
	IconPlus,
	IconShoppingCart,
	IconShoppingCartPlus,
	IconShoppingCartX,
} from "@tabler/icons-react";

import ModalProduct from "../../../modal/Product";

import { linkify } from "@/handlers/parsers/string";

import classes from "./Grid.module.scss";

import { typeProduct } from "@/types/product";

import OperatorCart from "@/components/operators/Cart";
import OperatorWishlist from "@/components/operators/Wishlist";

export default function Grid({ data }: { data: typeProduct }) {
	const defaultProductVariant = data.variants[0];

	return (
		<Card className={classes.card}>
			<Stack>
				<CardSection pos={"relative"}>
					<Stack p={"xl"}>
						<Image
							src={defaultProductVariant.image}
							alt={data.title}
							w={"100%"}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>

					<Stack className={classes.overlay}>
						{data.sale && (
							<Badge color={`red.9`} radius={"md"}>
								sale
							</Badge>
						)}

						{data.hot && (
							<Badge color={`red.9`} radius={"md"}>
								hot
							</Badge>
						)}

						{defaultProductVariant.priceFormer && (
							<Badge color={`green.9`} radius={"md"}>
								-{" "}
								{Math.floor(
									((defaultProductVariant.priceFormer - defaultProductVariant.pricePresent) /
										defaultProductVariant.priceFormer) *
										100
								)}{" "}
								%
							</Badge>
						)}

						<Group justify="center" className={classes.buttonGroup}>
							<ModalProduct data={data}>
								<Tooltip label={"Quick View"} withArrow fz={"sm"}>
									<ActionIcon size={32}>
										<IconEye size={20} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
							</ModalProduct>

							<OperatorWishlist
								operation={{ type: "add", items: [{ product: data, variant: defaultProductVariant }] }}
							>
								<Tooltip label={"Add to Wishlist"} withArrow fz={"sm"}>
									<ActionIcon size={32}>
										<IconHeart size={20} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
							</OperatorWishlist>

							<OperatorCart
								operation={{ type: "add", items: [{ product: data, variant: defaultProductVariant }] }}
							>
								<Tooltip label={"Add to Cart"} withArrow fz={"sm"}>
									<ActionIcon size={32}>
										<IconShoppingCart size={20} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
							</OperatorCart>
						</Group>
					</Stack>
				</CardSection>

				<Stack gap={"xs"}>
					<Stack gap={4}>
						<Text fz={"sm"} c={"dimmed"}>
							{data.category.title}
						</Text>
						<Anchor
							underline="never"
							component={Link}
							href={`/shop/products/${linkify(data.title)}`}
							className={classes.link}
						>
							<Title order={3} fz={"md"} fw={"bold"}>
								{data.title}
							</Title>
						</Anchor>
					</Stack>

					{/* <Group gap={4} fz={"xs"} c={"dimmed"}>
						<Rating value={data.rating.rating} fractions={getFraction(data.rating.rating)} readOnly />
						<Text inherit lh={0.5}>
							{data.rating.rating}
						</Text>
						<Text inherit lh={0.5}>
							({data.rating.raters})
						</Text>
					</Group> */}
				</Stack>

				<Group justify="space-between" mt={"xs"}>
					<Group gap={4}>
						<Text inherit lh={0.5}>
							${defaultProductVariant.pricePresent}
						</Text>

						{defaultProductVariant.priceFormer && (
							<Text inherit lh={0.5} c={"dimmed"} td={"line-through"}>
								${defaultProductVariant.priceFormer}
							</Text>
						)}
					</Group>
				</Group>
			</Stack>
		</Card>
	);
}
