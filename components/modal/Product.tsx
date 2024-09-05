"use client";

import NextImage from "next/image";

import {
	Modal,
	Button,
	Stack,
	Text,
	Image,
	Tooltip,
	ActionIcon,
	Grid,
	GridCol,
	Title,
	Rating,
	Group,
	Divider,
	Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconEye, IconHeart, IconShoppingCart, IconX } from "@tabler/icons-react";

import TabsProduct from "../tabs/product/Images";
import SelectorVariant from "@/components/selector/Variant";

import { getFraction } from "@/utilities/fraction";

import { typeProduct } from "@/types/product";
import { typeVariant } from "@/types/variant";
import React, { useEffect, useState } from "react";

export default function Product({ data, children }: { data: typeProduct; children: React.ReactNode }) {
	const defaultProductVariant = data.variants[0];

	const [opened, { open, close }] = useDisclosure(false);

	const metadata = [
		{ label: "Product Code", value: data.code },
		{ label: "Availability", value: data.available ? "In Stock" : "Out of Stock" },
		{ label: "Type", value: data.category.title },
		{
			label: "Shipping",
			value: `${data.shippingDays} day${data.shippingDays > 1 ? "s" : ""} (free pickup today)`,
		},
	];

	const closeButton = (
		<ActionIcon color="gray" variant="subtle" onClick={close}>
			<IconX size={16} stroke={2} />
		</ActionIcon>
	);

	return (
		<>
			<Modal opened={opened} onClose={close} centered size={1080} withCloseButton={false} h={"fit-content"}>
				<Grid gutter={"xl"}>
					<GridCol span={{ base: 12, md: 6 }}>
						<Stack>
							<Box style={{ alignSelf: "end" }} hiddenFrom="md">
								{closeButton}
							</Box>
							<TabsProduct />
						</Stack>
					</GridCol>

					<GridCol span={{ base: 12, md: 6 }}>
						<Stack>
							<Box style={{ alignSelf: "end" }} visibleFrom="md">
								{closeButton}
							</Box>

							<Text c={"sl.4"} fw={500}>
								{data.category.title}
							</Text>

							<Stack justify="space-between">
								<Title order={2} fw={"bold"} fz={{ lg: 36 }} lh={0.5}>
									{data.title}
								</Title>
								{/* <Group gap={"xs"} c={"pri"} fw={500}>
									<Rating
										value={data.rating.rating}
										fractions={getFraction(data.rating.rating)}
										readOnly
									/>
									<Text inherit lh={0.5}>
										({data.rating.raters} reviews)
									</Text>
								</Group> */}
							</Stack>

							<Group gap={4} fz={24}>
								<Text inherit lh={0.5} fw={500}>
									${defaultProductVariant.pricePresent}
								</Text>
								{defaultProductVariant.priceFormer && (
									<Group>
										<Text inherit lh={0.5} c={"dimmed"} td={"line-through"} fw={500}>
											${defaultProductVariant.priceFormer}
										</Text>

										<Text inherit lh={0.5} c={"red.9"} fz={"md"}>
											{100 -
												Math.floor(
													(defaultProductVariant.pricePresent /
														defaultProductVariant.priceFormer) *
														100
												)}
											% off
										</Text>
									</Group>
								)}
							</Group>

							<Divider />

							<SelectorVariant data={data} />

							<Divider visibleFrom="lg" />

							<Stack gap={4} justify="space-between" c={"dimmed"} fw={500} visibleFrom="lg">
								{metadata.map(item => (
									<Grid gutter={0} key={item.label}>
										<GridCol span={{ base: 6 }}>
											<Text inherit>{item.label}:</Text>
										</GridCol>
										<GridCol span={{ base: 6 }}>
											<Text inherit>{item.value}</Text>
										</GridCol>
									</Grid>
								))}
							</Stack>
						</Stack>
					</GridCol>
				</Grid>
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
