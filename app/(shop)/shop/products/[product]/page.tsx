import React, { useContext, useEffect, useState } from "react";

import {
	ActionIcon,
	Box,
	Card,
	Container,
	Divider,
	Grid,
	GridCol,
	Group,
	Pagination,
	Rating,
	Select,
	Skeleton,
	Stack,
	Text,
	Title,
} from "@mantine/core";

import { Carousel, CarouselSlide } from "@mantine/carousel";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardProductShopGrid from "@/components/card/product/shop/Grid";
import CardProductShopList from "@/components/card/product/shop/List";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";

import CarouselShop from "@/components/carousel/Shop";

import { IconGridDots, IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import { linkify } from "@/handlers/parsers/string";
import TabsProduct from "@/components/tabs/product/Images";
import SelectorVariant from "@/components/selector/Variant";

import { typeParams } from "./layout";
import { typeProduct } from "@/types/product";

import TabsReview from "@/components/tabs/product/Review";
import { getProducts } from "@/handlers/requests/database/getProducts";

export default async function Shop({ params }: { params: typeParams }) {
	const products = await getProducts();

	const data: typeProduct | undefined = products?.find(p => linkify(p.title) == params.product);

	const variant = data?.variants[0];

	const metadata = [
		{ label: "Product Code", value: data?.code },
		{ label: "Availability", value: data?.available ? "In Stock" : "Out of Stock" },
		{ label: "Type", value: data?.category.title },
		{
			label: "Shipping",
			value: `${data?.shippingDays} day${
				data?.shippingDays ? (data.shippingDays > 1 ? "s" : "") : ""
			} (free pickup today)`,
		},
	];

	return (
		<LayoutPage>
			<LayoutSection containerized="responsive" padded>
				<Grid gutter={{ base: "xl", md: 64 }}>
					<GridCol span={{ base: 12, md: 6 }}>
						<Stack>
							<TabsProduct />
						</Stack>
					</GridCol>

					<GridCol span={{ base: 12, md: 6 }}>
						<Stack gap={"lg"}>
							<Text c={"pri"} fw={500}>
								{data?.category.title}
							</Text>

							<Stack justify="space-between">
								<Title order={2} fw={"bold"} fz={{ lg: 36 }} lh={0.5}>
									{data?.title}
								</Title>

								<Group gap={"xs"} c={"pri"} fw={500}>
									<Rating
										// value={}
										// fractions={getFraction()}
										readOnly
									/>
									<Text inherit lh={0.5}>
										({data?.reviews.length} reviews)
									</Text>
								</Group>
							</Stack>

							<Group gap={4} fz={24}>
								<Text inherit lh={0.5} fw={500}>
									${variant?.pricePresent}
								</Text>

								{variant?.priceFormer && (
									<Group>
										<Text inherit lh={0.5} c={"dimmed"} td={"line-through"} fw={500}>
											${variant.priceFormer}
										</Text>

										<Text inherit lh={0.5} c={"red.9"} fz={"md"}>
											{100 - Math.floor((variant.pricePresent / variant.priceFormer) * 100)}% off
										</Text>
									</Group>
								)}
							</Group>

							<Text>{data?.desc}</Text>

							<Divider />

							<SelectorVariant data={data!} />

							<Divider />

							<Stack gap={4} justify="space-between" c={"dimmed"} fw={500}>
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
			</LayoutSection>

			<LayoutSection containerized="responsive" padded>
				<TabsReview data={data!} />
			</LayoutSection>

			<LayoutSection padded>
				<Stack gap={"xl"}>
					<Container size={"responsive"} w={"100%"}>
						<Title order={2}>You Might Also Like</Title>
					</Container>

					<CarouselShop data={products} />
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
