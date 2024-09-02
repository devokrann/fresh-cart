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

import ContextOrders from "@/contexts/user/Orders";
import { IconClearAll, IconEye, IconMoodEmpty, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import BadgeOrder from "@/components/badges/Order";

import classes from "./Main.module.scss";
import Link from "next/link";
import NotificationEmpty from "@/components/notification/Empty";

export default function Main() {
	const ordersContext = useContext(ContextOrders);

	if (!ordersContext) {
		throw new Error("ChildComponent must be used within a ContextOrders.Provider");
	}

	const { orders, setOrders } = ordersContext;

	const rows = orders?.map(order => {
		const getTotal = () => order.subtotal + order.taxFee + order.serviceFee + order.shippingFee;

		return (
			<TableTr key={order.id}>
				<TableTd>
					<Text inherit fz={"sm"}>
						# {order.id}
					</Text>
				</TableTd>
				<TableTd>
					<Text inherit fz={"sm"}>
						{order.datePlaced.toDateString()}
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

	const skeletons = (
		<TableTr>
			<TableTd>
				<Skeleton height={16} w={32} />
			</TableTd>
			<TableTd>
				<Skeleton height={16} w={64} />
			</TableTd>
			<TableTd>
				<Skeleton height={16} w={16} />
			</TableTd>
			<TableTd>
				<Skeleton height={16} w={96} />
			</TableTd>
			<TableTd>
				<Skeleton height={16} w={32} />
			</TableTd>
			<TableTd>
				<Skeleton height={32} w={120} />
			</TableTd>
		</TableTr>
	);

	return !orders ? (
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

			<TableTbody>{skeletons}</TableTbody>
		</Table>
	) : orders.length > 0 ? (
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
