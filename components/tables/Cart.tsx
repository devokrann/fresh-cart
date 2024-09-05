"use client";

import React, { useContext, useEffect, useState } from "react";

import NextImage from "next/image";

import {
	ActionIcon,
	Anchor,
	Badge,
	Box,
	Button,
	Center,
	Checkbox,
	Group,
	Image,
	NumberFormatter,
	Skeleton,
	Slider,
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

import ContextCart from "@/contexts/Cart";
import InputNumberProduct from "../inputs/number/Product";
import NotificationEmpty from "../notification/Empty";

import OperatorCart from "@/components/operators/Cart";

import { IconClearAll, IconGift, IconSelect, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import classes from "./Cart.module.scss";
import Link from "next/link";
import { linkify } from "@/handlers/parsers/string";
import { getUnits } from "@/utilities/variant";
import { typeCart } from "@/types/cart";

import { getTotal } from "@/utilities/total";

export default function Cart() {
	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const widths = {
		checkBox: "5%",
		image: "15%",
		product: "30%",
		amount: "20%",
		price: "10%",
		status: "10%",
		remove: "10%",
	};

	const rows = cart?.map(item => (
		<TableTr
			key={item.compoundId}
			bg={selectedRows.includes(item.compoundId) ? "var(--mantine-color-gray-light)" : undefined}
		>
			<TableTd w={widths.checkBox}>
				<Stack align="end">
					<Checkbox
						aria-label="Select row"
						checked={selectedRows.includes(item.compoundId)}
						onChange={event =>
							setSelectedRows(
								event.currentTarget.checked
									? [...selectedRows, item.compoundId]
									: selectedRows.filter(position => position !== item.compoundId)
							)
						}
					/>
				</Stack>
			</TableTd>
			<TableTd w={widths.image}>
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
			<TableTd w={widths.product} ta={"start"}>
				<Stack gap={0} align="start">
					<Anchor
						underline="never"
						component={Link}
						href={`/shop/products/${linkify(item.product.title)}`}
						className={classes.link}
					>
						<Title order={2} fz={"md"} fw={"bold"}>
							{item.product.title}
						</Title>
					</Anchor>

					<Text inherit fz={"sm"}>
						{item.variant.unitValue} {getUnits(item.variant)}
					</Text>
				</Stack>
			</TableTd>
			<TableTd w={widths.amount}>
				<InputNumberProduct data={item} />
			</TableTd>
			<TableTd w={widths.price}>
				{item.quantity && <NumberFormatter prefix="$ " value={item.variant.pricePresent * item.quantity} />}
			</TableTd>
			<TableTd w={widths.status}>
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
			<TableTd w={widths.remove}>
				<OperatorCart operation={{ type: "remove", items: [{ product: item.product, variant: item.variant }] }}>
					<ActionIcon
						size={32}
						color="red.6"
						variant="subtle"
						onClick={() => setSelectedRows(selectedRows.filter(position => position !== item.compoundId))}
					>
						<IconTrash size={24} stroke={2} />
					</ActionIcon>
				</OperatorCart>
			</TableTd>
		</TableTr>
	));

	const skeletonRows = (
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
			<TableTd w={widths.amount}>
				<Center>
					<Skeleton height={32} w={"75%"} />
				</Center>
			</TableTd>
			<TableTd w={widths.price}>
				<Center>
					<Skeleton height={16} w={"50%"} />
				</Center>
			</TableTd>
			<TableTd w={widths.status}>
				<Center>
					<Skeleton height={16} w={"75%"} />
				</Center>
			</TableTd>
			<TableTd w={widths.remove}>
				<Center>
					<Skeleton height={32} w={32} />
				</Center>
			</TableTd>
		</TableTr>
	);

	const mininumDiscountPrice = 300;

	const [value, setValue] = useState(cart ? getTotal(cart) : 0);

	useEffect(() => {
		setValue(cart ? getTotal(cart) : 0);
	}, [cart]);

	return !cart ? (
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
					<TableTh>Amount</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Status</TableTh>
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }} />
				</TableTr>
			</TableThead>
			<TableTbody>
				{skeletonRows}
				{skeletonRows}
				{skeletonRows}
			</TableTbody>

			<TableCaption>
				<Stack p={"xs"} ta={"start"} gap={"xl"}>
					<Skeleton height={16} width={240} />

					<Skeleton height={16} />
				</Stack>
			</TableCaption>
		</Table>
	) : cart.length > 0 ? (
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
					<TableTh>Amount</TableTh>
					<TableTh>Price</TableTh>
					<TableTh>Status</TableTh>
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }} />
				</TableTr>
			</TableThead>
			<TableTbody>{rows}</TableTbody>

			<TableCaption>
				<Stack p={"xs"} ta={"start"}>
					{getTotal(cart) > mininumDiscountPrice ? (
						<Text inherit c={"light-dark(var(--mantine-color-gray-6),var(--mantine-color-text))"}>
							You&apos;ve spent more than{" "}
							<Text component="span" inherit fw={"bold"}>
								${mininumDiscountPrice}
							</Text>
							. You have{" "}
							<Text component="span" inherit fw={"bold"}>
								Free Shipping
							</Text>
							!
						</Text>
					) : (
						<Text inherit c={"light-dark(var(--mantine-color-gray-6),var(--mantine-color-text))"}>
							Spend{" "}
							<Text component="span" inherit fw={"bold"}>
								${mininumDiscountPrice - getTotal(cart)}
							</Text>{" "}
							more to get{" "}
							<Text component="span" inherit fw={"bold"}>
								Free Shipping
							</Text>
						</Text>
					)}

					<Box pos={"relative"}>
						<Slider
							label={null}
							thumbChildren={
								<IconGift
									size={16}
									stroke={2}
									color="light-dark(var(--mantine-color-pri-6),var(--mantine-color-white))"
								/>
							}
							thumbSize={32}
							value={value}
							onChange={setValue}
							max={mininumDiscountPrice}
							pt={16}
							pb={24}
						/>
						<Box pos={"absolute"} left={0} top={0} right={0} bottom={0} style={{ zIndex: 10 }}></Box>
					</Box>
				</Stack>
			</TableCaption>

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
							onClick={() => setSelectedRows(cart.map(i => i.compoundId))}
							size="xs"
						>
							Select All ({selectedRows.length})
						</Button>
					</Group>

					<OperatorCart
						operation={{
							type: "remove",
							items: selectedRows
								.map(r => {
									const item = cart.find(p => p.compoundId == r);

									return { product: item?.product!, variant: item?.variant! };
								})
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
					</OperatorCart>
				</Group>
			</TableCaption>
		</Table>
	) : (
		<NotificationEmpty label="Your cart is empty" />
	);
}
