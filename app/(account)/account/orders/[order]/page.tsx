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

import CardShopCheckout from "@/components/card/shop/Checkout";
import CardAddressOrder from "@/components/card/address/Order";

import { typeParams } from "./layout";
import getFraction from "@/handlers/fraction";
import TableOrdersProducts from "@/components/tables/orders/Products";

import TabsReview from "@/components/tabs/product/Review";
import orders from "@/data/orders";
import { typeOrder } from "@/types/order";
import addresses from "@/data/addresses";

import BadgeOrder from "@/components/badges/Order";

export default function Order({ params }: { params: typeParams }) {
	const data: typeOrder | undefined = orders.find(order => order.id == params.order);

	if (!data) {
		throw Error("Order must be defined");
	}

	return (
		<LayoutPage>
			<LayoutSection>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group>
							<Stack gap={0}>
								<Group>
									<Title order={2} fw={"bold"}>
										Order (#{data.id})
									</Title>

									<BadgeOrder status={data.status} />
								</Group>
								<Text inherit>
									Order <u>{data.id}</u> was placed on <u>{data.datePlaced}</u> and is currently being
									prepared.
								</Text>
								<Text inherit>
									If you have any questions, please feel free to contact us, our customer service
									center is working for you 24/7.
								</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<TableOrdersProducts data={data.products} />
					</GridCol>

					<GridCol span={12}>
						<Divider />
					</GridCol>

					<GridCol span={12}>
						<Grid>
							<GridCol span={{ base: 12, md: 5 }}>
								<CardShopCheckout />
							</GridCol>

							<GridCol span={{ base: 12, md: 7 }}>
								<Grid>
									{addresses.map(address => (
										<GridCol key={address.title} span={{ base: 12, md: 6 }}>
											<CardAddressOrder data={address} />
										</GridCol>
									))}
								</Grid>
							</GridCol>
						</Grid>
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
