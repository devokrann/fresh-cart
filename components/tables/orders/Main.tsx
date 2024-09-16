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
import { calculateOrderedProducts } from "@/hooks/calculator";
import { parseDateYmd } from "@/handlers/parsers/date";
import { prependZeros } from "@/handlers/parsers/number";

export default function Main({ data }: { data: typeOrder[] }) {
	const rows = data.map(order => {
		const { object: totals } = calculateOrderedProducts(order.orderedProducts);

		const getTotal = () =>
			totals.subTotal.value + totals.tax.value + totals.serviceFee.value + totals.shipping.value;

		return (
			<TableTr key={order.id}>
				<TableTd>
					<Text inherit fz={"sm"}>
						#{prependZeros(5, order.id)}
					</Text>
				</TableTd>
				<TableTd>
					<Text inherit fz={"sm"}>
						{parseDateYmd(order.datePlaced)}
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
		<NotificationEmpty label="No orders" />
	);
}
