"use client";

import React, { useContext, useState } from "react";

import NextImage from "next/image";

import {
	ActionIcon,
	Anchor,
	Badge,
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

import ContextProducts from "@/contexts/Products";
import { IconTrash } from "@tabler/icons-react";

import classes from "./Wishlist.module.scss";

export default function Wishlist() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { wishlist, setWishlist } = productsContext;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const rows = wishlist.map(item => (
		<TableTr
			key={item.title}
			bg={selectedRows.includes(item.title) ? "var(--mantine-color-gray-light)" : undefined}
		>
			<TableTd>
				<Center>
					<Checkbox
						aria-label="Select row"
						checked={selectedRows.includes(item.title)}
						onChange={event =>
							setSelectedRows(
								event.currentTarget.checked
									? [...selectedRows, item.title]
									: selectedRows.filter(position => position !== item.title)
							)
						}
					/>
				</Center>
			</TableTd>
			<TableTd>
				<Center>
					<Image
						src={item.image}
						alt={item.title}
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
					<Title order={2} fz={"md"} fw={500}>
						{item.title}
					</Title>
					{item.variants.capacity && (
						<Text inherit fz={"sm"}>
							{item.variants.capacity[0]} ml
						</Text>
					)}
					{item.variants.weight && (
						<Text inherit fz={"sm"}>
							{item.variants.weight[0]} g
						</Text>
					)}
				</Stack>
			</TableTd>
			<TableTd>
				<NumberFormatter prefix="$ " value={item.price.present} />
			</TableTd>
			<TableTd>
				{item.available ? (
					<Badge radius={"md"} color="green" c={"white"}>
						In Stock
					</Badge>
				) : (
					<Badge radius={"md"} color="red">
						Out of Stock
					</Badge>
				)}
			</TableTd>
			<TableTd>
				<ActionIcon size={32} color="red" variant="subtle">
					<IconTrash size={24} stroke={2} />
				</ActionIcon>
			</TableTd>
		</TableTr>
	));

	return (
		<Table
			classNames={classes}
			withColumnBorders={false}
			style={{ borderRadius: "var(--mantine-radius-md)", overflow: "hidden" }}
		>
			<TableThead>
				<TableTr>
					<TableTh />
					<TableTh>Image</TableTh>
					<TableTh ta={"start"}>Product</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Status</TableTh>
					<TableTh />
				</TableTr>
			</TableThead>

			<TableTbody>{rows}</TableTbody>

			<TableCaption opacity={selectedRows.length > 0 ? 1 : 0}>
				<Anchor underline="hover" inherit>
					Remove selected products ({selectedRows.length})
				</Anchor>
			</TableCaption>
		</Table>
	);
}
