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

import ContextProducts from "@/contexts/Products";
import { IconClearAll, IconMoodEmpty, IconSelect, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import classes from "./Wishlist.module.scss";
import Link from "next/link";
import NotificationEmpty from "../notification/Empty";
import link from "@/handlers/parsers/string/link";

import ProviderProductCart from "@/providers/products/Cart";
import ProviderProductWishlist from "@/providers/products/Wishlist";
import variant from "@/handlers/variant";

export default function Wishlist() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, wishlist, setWishlist } = productsContext;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const rows = wishlist.map(item => (
		<TableTr key={item.id} bg={selectedRows.includes(item.id) ? "var(--mantine-color-gray-light)" : undefined}>
			<TableTd>
				<Center>
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
				</Center>
			</TableTd>
			<TableTd>
				<Center>
					<Image
						src={item.variant.image}
						alt={item.product.title}
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
				<Stack gap={0} align="start">
					<Anchor
						underline="never"
						component={Link}
						href={`/shop/products/${link.linkify(item.product.title)}`}
						className={classes.link}
					>
						<Title order={2} fz={"md"} fw={"bold"}>
							{item.product.title}
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
			<TableTd>
				{item.variant.available ? (
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
				<ProviderProductWishlist
					operation={{ type: "transfer", items: [{ product: item.product, variant: item.variant }] }}
				>
					<ProviderProductCart
						operation={{ type: "add", items: [{ product: item.product, variant: item.variant }] }}
					>
						<Button
							variant="outline"
							leftSection={<IconShoppingCartPlus size={16} stroke={2} />}
							onClick={() => setSelectedRows(selectedRows.filter(position => position !== item.id))}
							size="xs"
						>
							Add to Cart
						</Button>
					</ProviderProductCart>
				</ProviderProductWishlist>
			</TableTd>
			<TableTd>
				<ProviderProductWishlist
					operation={{ type: "remove", items: [{ product: item.product, variant: item.variant }] }}
				>
					<ActionIcon
						size={32}
						color="red.6"
						variant="subtle"
						onClick={() => setSelectedRows(selectedRows.filter(position => position !== item.id))}
					>
						<IconTrash size={24} stroke={2} />
					</ActionIcon>
				</ProviderProductWishlist>
			</TableTd>
		</TableTr>
	));

	return wishlist.length > 0 ? (
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
						<ProviderProductWishlist
							operation={{
								type: "remove",
								items: selectedRows.map(r => wishlist.find(p => p.id == r)).filter(p => p != undefined),
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
						</ProviderProductWishlist>

						<ProviderProductWishlist
							operation={{
								type: "transfer",
								items: selectedRows.map(r => wishlist.find(p => p.id == r)).filter(p => p != undefined),
							}}
						>
							<ProviderProductCart
								operation={{
									type: "add",
									items: selectedRows
										.map(r => wishlist.find(p => p.id == r))
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
							</ProviderProductCart>
						</ProviderProductWishlist>
					</Group>
				</Group>
			</TableCaption>
		</Table>
	) : (
		<NotificationEmpty label="wishlist" />
	);
}
