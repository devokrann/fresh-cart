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

import ContextProducts from "@/contexts/Products";
import InputNumberProduct from "../inputs/number/Product";
import NotificationEmpty from "../notification/Empty";

import { IconClearAll, IconGift, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import classes from "./Cart.module.scss";

export default function Cart() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = productsContext;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const rows = cart.map(item => (
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
				<InputNumberProduct data={item} />
			</TableTd>
			<TableTd>
				{item.quantity && <NumberFormatter prefix="$ " value={item.price.present * item.quantity} />}
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

	const mininumDiscountPrice = 300;

	const getTotal = () => {
		let total = 0;

		cart.map(p => {
			if (p.quantity) {
				total += p.price.present * p.quantity;
			}
		});

		return total;
	};

	const [value, setValue] = useState(getTotal());

	useEffect(() => {
		setValue(getTotal());
	}, [cart]);

	return cart.length > 0 ? (
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
					{getTotal() > mininumDiscountPrice ? (
						<Text inherit>
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
						<Text inherit>
							Spend{" "}
							<Text component="span" inherit fw={"bold"}>
								${mininumDiscountPrice - getTotal()}
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
							thumbChildren={<IconGift size={16} stroke={2} />}
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
					<Button
						variant="subtle"
						color="gray"
						leftSection={<IconClearAll size={16} stroke={2} />}
						onClick={() => setSelectedRows([])}
					>
						Clear Selection ({selectedRows.length})
					</Button>

					<Group>
						<Button variant="subtle" color="red" leftSection={<IconTrash size={16} stroke={2} />}>
							Remove selected items ({selectedRows.length})
						</Button>

						<Button
							variant="subtle"
							color="green"
							leftSection={<IconShoppingCartPlus size={16} stroke={2} />}
						>
							Add selected items to cart ({selectedRows.length})
						</Button>
					</Group>
				</Group>
			</TableCaption>
		</Table>
	) : (
		<NotificationEmpty label="cart" />
	);
}
