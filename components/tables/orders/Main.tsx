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

import { IconClearAll, IconEye, IconMoodEmpty, IconShoppingCartPlus, IconTrash, IconX } from "@tabler/icons-react";

import BadgeOrder from "@/components/badges/Order";

import classes from "./Main.module.scss";
import Link from "next/link";
import NotificationEmpty from "@/components/notification/Empty";
import { typeOrder } from "@/types/order";

export default function Main({ data }: { data: typeOrder[] }) {
	const rows = data.map(order => {
		let subTotal: number = 0;

		order.orderedProducts.map(op => subTotal += op.variant.pricePresent);

		const getTotal = () => subTotal + order.taxFee + order.serviceFee + order.shippingFee;

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
						{order.orderedProducts.length}
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
