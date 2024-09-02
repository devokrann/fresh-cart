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
	Skeleton,
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

import ContextWishlist from "@/contexts/Wishlist";
import { IconClearAll, IconMoodEmpty, IconSelect, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import classes from "./Wishlist.module.scss";
import Link from "next/link";
import NotificationEmpty from "../notification/Empty";
import link from "@/handlers/parsers/string/link";

import OperatorCart from "@/components/operators/Cart";
import OperatorWishlist from "@/components/operators/Wishlist";
import variant from "@/handlers/variant";

export default function Wishlist() {
	const wishlistContext = useContext(ContextWishlist);

	if (!wishlistContext) {
		throw new Error("ChildComponent must be used within a ContextWishlist.Provider");
	}

	const { wishlist, setWishlist } = wishlistContext;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const widths = {
		checkBox: "5%",
		image: "15%",
		product: "30%",
		price: "10%",
		status: "10%",
		cart: "20%",
		remove: "10%",
	};

	const rows = wishlist?.map(item => (
		<TableTr key={item.id} bg={selectedRows.includes(item.id) ? "var(--mantine-color-gray-light)" : undefined}>
			<TableTd w={widths.checkBox}>
				<Stack align="end">
					<Checkbox
						aria-label="Select row"
						checked={selectedRows.includes(item.id)}
						onChange={event =>
							setSelectedRows(
								event.currentTarget.checked
									? [...selectedRows, item.id]
									: selectedRows.filter(position => position !== item.id)
							)
						}
					/>
				</Stack>
			</TableTd>
			<TableTd w={widths.image}>
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
			<TableTd w={widths.product} ta={"start"}>
				<Stack gap={0} align="start">
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
			<TableTd w={widths.price}>
				<NumberFormatter prefix="$ " value={item.variant.pricePresent} />
			</TableTd>
			<TableTd w={widths.status}>
				{item.variant.available ? (
					<Badge radius={"md"} color="green" c={"white"} size="sm">
						In Stock
					</Badge>
				) : (
					<Badge radius={"md"} color="red" size="sm">
						Out of Stock
					</Badge>
				)}
			</TableTd>
			<TableTd w={widths.cart}>
				<OperatorWishlist operation={{ type: "transfer", items: [item.variant] }}>
					<OperatorCart operation={{ type: "add", items: [item.variant] }}>
						<Button
							variant="outline"
							leftSection={<IconShoppingCartPlus size={16} stroke={2} />}
							onClick={() => setSelectedRows(selectedRows.filter(position => position !== item.id))}
							size="xs"
						>
							Add to Cart
						</Button>
					</OperatorCart>
				</OperatorWishlist>
			</TableTd>
			<TableTd w={widths.remove}>
				<OperatorWishlist operation={{ type: "remove", items: [item.variant] }}>
					<ActionIcon
						size={32}
						color="red.6"
						variant="subtle"
						onClick={() => setSelectedRows(selectedRows.filter(position => position !== item.id))}
					>
						<IconTrash size={24} stroke={2} />
					</ActionIcon>
				</OperatorWishlist>
			</TableTd>
		</TableTr>
	));

	const skeletonRow = (
		<TableTr>
			<TableTd w={widths.checkBox}>
				<Stack align="end">
					<Skeleton height={16} w={16} />
				</Stack>
			</TableTd>
			<TableTd w={widths.image}>
				<Center>
					<Skeleton height={56} w={56} />
				</Center>
			</TableTd>
			<TableTd w={widths.product}>
				<Stack align="start" gap={"xs"}>
					<Skeleton height={16} w={"50%"} />
					<Skeleton height={16} w={64} />
				</Stack>
			</TableTd>
			<TableTd w={widths.price}>
				<Center>
					<Skeleton height={16} w={32} />
				</Center>
			</TableTd>
			<TableTd w={widths.status}>
				<Center>
					<Skeleton height={16} w={"75%"} />
				</Center>
			</TableTd>
			<TableTd w={widths.cart}>
				<Center>
					<Skeleton height={32} w={"75%"} />
				</Center>
			</TableTd>
			<TableTd w={widths.remove}>
				<Center>
					<Skeleton height={32} w={32} />
				</Center>
			</TableTd>
		</TableTr>
	);

	return !wishlist ? (
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
					<TableTh style={{ borderTopLeftRadius: "var(--mantine-radius-md)" }} />
					<TableTh>Image</TableTh>
					<TableTh ta={"start"}>Product</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Status</TableTh>
					<TableTh />
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }} />
				</TableTr>
			</TableThead>

			<TableTbody>
				{skeletonRow}
				{skeletonRow}
				{skeletonRow}
			</TableTbody>
		</Table>
	) : wishlist.length > 0 ? (
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
					<TableTh style={{ borderTopLeftRadius: "var(--mantine-radius-md)" }} />
					<TableTh>Image</TableTh>
					<TableTh ta={"start"}>Product</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Status</TableTh>
					<TableTh />
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }} />
				</TableTr>
			</TableThead>

			<TableTbody>{rows}</TableTbody>

			<TableCaption display={selectedRows.length > 0 ? undefined : "none"}>
				<Group justify="space-between">
					<Group gap={"xs"}>
						<Button
							variant="subtle"
							color="gray"
							leftSection={<IconClearAll size={16} stroke={2} />}
							onClick={() => setSelectedRows([])}
							size="xs"
						>
							Clear ({selectedRows.length})
						</Button>
						<Button
							variant="subtle"
							color="gray"
							leftSection={<IconSelect size={16} stroke={2} />}
							onClick={() => setSelectedRows(wishlist.map(i => i.id))}
							size="xs"
						>
							Select All ({selectedRows.length})
						</Button>
					</Group>

					<Group>
						<OperatorWishlist
							operation={{
								type: "remove",
								items: selectedRows
									.map(r => wishlist.find(p => p.id == r)?.variant)
									.filter(p => p != undefined),
							}}
						>
							<Button
								variant="subtle"
								color="red.6"
								leftSection={<IconTrash size={16} stroke={2} />}
								onClick={() => setSelectedRows([])}
								size="xs"
							>
								Remove ({selectedRows.length})
							</Button>
						</OperatorWishlist>

						<OperatorWishlist
							operation={{
								type: "transfer",
								items: selectedRows
									.map(r => wishlist.find(p => p.id == r)?.variant)
									.filter(p => p != undefined),
							}}
						>
							<OperatorCart
								operation={{
									type: "add",
									items: selectedRows
										.map(r => wishlist.find(p => p.id == r)?.variant)
										.filter(p => p != undefined),
								}}
							>
								<Button
									variant="subtle"
									color="green.6"
									leftSection={<IconShoppingCartPlus size={16} stroke={2} />}
									onClick={() => setSelectedRows([])}
									size="xs"
								>
									Add to cart ({selectedRows.length})
								</Button>
							</OperatorCart>
						</OperatorWishlist>
					</Group>
				</Group>
			</TableCaption>
		</Table>
	) : (
		<NotificationEmpty label="wishlist" />
	);
}
