import React from "react";

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

import blog from "@/data/blog";
import products from "@/data/products";
import { IconGridDots, IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import stores from "@/data/stores";
import link from "@/handlers/parsers/string/link";
import TabsProduct from "@/components/tabs/product/Images";
import SelectorVariant from "@/components/selector/Variant";

import { typeParams } from "./layout";
import getFraction from "@/handlers/fraction";
import { typeProduct } from "@/types/product";

import TabsReview from "@/components/tabs/product/Review";

export default function Shop({ params }: { params: typeParams }) {
	const data: typeProduct | undefined = products.find(p => link.linkify(p.title) == params.product);

	if (!data) {
		throw Error("Product must be defined");
	}

	const variant = data.variants[0];

	const metadata = [
		{ label: "Product Code", value: data.code },
		{ label: "Availability", value: data.available ? "In Stock" : "Out of Stock" },
		{ label: "Type", value: data.category },
		{
			label: "Shipping",
			value: `${data.shipping.days} day${data.shipping.days > 1 ? "s" : ""} (free pickup today)`,
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
								{data.category}
							</Text>

							<Stack justify="space-between">
								<Title order={2} fw={"bold"} fz={{ lg: 36 }} lh={0.5}>
									{data.title}
								</Title>
								<Group gap={"xs"} c={"pri"} fw={500}>
									<Rating
										value={data.rating.rating}
										fractions={getFraction(data.rating.raters)}
										readOnly
									/>
									<Text inherit lh={0.5}>
										({data.rating.raters} reviews)
									</Text>
								</Group>
							</Stack>

							<Group gap={4} fz={24}>
								<Text inherit lh={0.5} fw={500}>
									${variant.price.present}
								</Text>
								{variant.price.former && (
									<Group>
										<Text inherit lh={0.5} c={"dimmed"} td={"line-through"} fw={500}>
											${variant.price.former}
										</Text>

										<Text inherit lh={0.5} c={"red.9"} fz={"md"}>
											{100 - Math.floor((variant.price.present / variant.price.former) * 100)}%
											off
										</Text>
									</Group>
								)}
							</Group>

							<Text>{data.desc}</Text>

							<Divider />

							<SelectorVariant data={data} />

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
				<TabsReview data={data} />
			</LayoutSection>

			<LayoutSection padded>
				<Stack gap={"xl"}>
					<Container size={"responsive"} w={"100%"}>
						<Title order={2}>You Might Also Like</Title>
					</Container>

					<CarouselShop />
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
