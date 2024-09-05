"use client";

import React, { useContext, useState } from "react";

import NextImage from "next/image";

import {
	ActionIcon,
	Anchor,
	Badge,
	Button,
	Card,
	Center,
	Checkbox,
	Group,
	Image,
	NumberFormatter,
	Stack,
	Table,
	TableCaption,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	Title,
} from "@mantine/core";

import { IconClearAll, IconMoodEmpty, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import classes from "./Products.module.scss";
import Link from "next/link";
import NotificationEmpty from "@/components/notification/Empty";
import link from "@/handlers/parsers/string/link";
import variant from "@/handlers/variant";
import { typeCart } from "@/types/cart";

export default function Products({ data }: { data: typeCart[] }) {
	const rows = data.map(item => (
		<TableTr key={item.variant.id}>
			<TableTd>
				<Center>
					<Image
						src={item.variant.image}
						alt={item.variant.product.title}
						h={{ md: 64 }}
						radius={"md"}
						component={NextImage}
						width={1920}
						height={1080}
						priority
					/>
				</Center>
			</TableTd>
			<TableTd ta={"start"}>
				<Stack gap={0}>
					<Anchor
						underline="never"
						component={Link}
						href={`/shop/products/${link.linkify(item.variant.product.title)}`}
						className={classes.link}
					>
						<Title order={2} fz={"md"} fw={"bold"}>
							{item.variant.product.title}
						</Title>
					</Anchor>

					<Text inherit fz={"sm"}>
						{item.variant.unitValue} {variant.getUnit(item.variant)}
					</Text>
				</Stack>
			</TableTd>
			<TableTd>
				<NumberFormatter prefix="$ " value={item.variant.pricePresent} />
			</TableTd>
			<TableTd>{item.quantity}</TableTd>
			<TableTd>
				<NumberFormatter prefix="$ " value={item.variant.pricePresent * item.quantity} thousandSeparator />
			</TableTd>
		</TableTr>
	));

	return data.length > 0 ? (
		<Table
			classNames={classes}
			withColumnBorders={false}
			captionSide="top"
			style={{
				borderRadius: "var(--mantine-radius-md)",
				borderBottomRightRadius: "var(--mantine-radius-md)",
				overflow: "hidden",
			}}
		>
			<TableThead>
				<TableTr>
					<TableTh style={{ borderTopLeftRadius: "var(--mantine-radius-md)" }}>Image</TableTh>
					<TableTh ta={"start"}>Product</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Quantity</TableTh>
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }}>Total</TableTh>
				</TableTr>
			</TableThead>

			<TableTbody>{rows}</TableTbody>
		</Table>
	) : (
		<NotificationEmpty label="Your wishlist is empty" />
	);
}
