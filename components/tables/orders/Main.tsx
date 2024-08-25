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
import { IconClearAll, IconEye, IconMoodEmpty, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import BadgeOrder from "@/components/badges/Order";

import classes from "./Main.module.scss";
import Link from "next/link";
import NotificationEmpty from "@/components/notification/Empty";

export default function Main() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { orders, setOrders } = productsContext;

	const rows = orders.map(order => {
		const getTotal = () => order.subtotal + order.tax + order.serviceFee + order.shipping;

		return (
			<TableTr key={order.id}>
				<TableTd>
					<Text inherit fz={"sm"}>
						# {order.id}
					</Text>
				</TableTd>
				<TableTd>
					<Text inherit fz={"sm"}>
						{order.datePlaced}
					</Text>
				</TableTd>
				<TableTd>
					<Text inherit fz={"sm"}>
						{order.products.length}
					</Text>
				</TableTd>
				<TableTd>
					<BadgeOrder status={order.status} />
				</TableTd>
				<TableTd>
					<NumberFormatter prefix="$ " value={getTotal()} thousandSeparator />
				</TableTd>
				<TableTd>
					<Button
						size="xs"
						variant="outline"
						leftSection={<IconEye size={16} stroke={2} />}
						component={Link}
						href={`/account/orders/${order.id}`}
					>
						View Order
					</Button>
				</TableTd>
			</TableTr>
		);
	});

	return orders.length > 0 ? (
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
					<TableTh style={{ borderTopLeftRadius: "var(--mantine-radius-md)" }}>Order</TableTh>
					<TableTh>Date</TableTh>
					<TableTh>Items</TableTh>
					<TableTh>Status</TableTh>
					<TableTh>Amount</TableTh>
					<TableTh style={{ borderTopRightRadius: "var(--mantine-radius-md)" }} />
				</TableTr>
			</TableThead>

			<TableTbody>{rows}</TableTbody>
		</Table>
	) : (
		<NotificationEmpty label="order list" />
	);
}
