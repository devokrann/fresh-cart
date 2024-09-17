import React, { useContext } from "react";

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
import CardProductShopList from "@/components/card/product/shop/List";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";

import CarouselShop from "@/components/carousel/Shop";

import { IconGridDots, IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import TabsProduct from "@/components/tabs/product/Images";

import CardInvoiceOrder from "@/components/card/invoice/Order";
import CardAddressOrder from "@/components/card/address/Order";

import { typeParams } from "./layout";
import TableOrdersProducts from "@/components/tables/orders/Products";

import TabsReview from "@/components/tabs/product/Review";
import { typeOrder } from "@/types/order";

import BadgeOrder from "@/components/badges/Order";

import { getOrders } from "@/handlers/requests/database/orders";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { parseDateYmd } from "@/handlers/parsers/date";
import { prependZeros } from "@/handlers/parsers/number";

export default async function Order({ params }: { params: typeParams }) {
	const session = await auth();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	const orders = session?.user.id ? await getOrders() : null;

	const data: typeOrder | undefined = orders?.find(order => order.id == params.order);

	let sentence;

	switch (data?.status) {
		case "processing":
			sentence = <>is currently being processed</>;
			break;
		case "completed":
			const currentDate = new Date(Date.now());
			sentence = !data.dateDelivered ? (
				<>is yet to be delivered</>
			) : currentDate > data.dateDelivered! ? (
				<>was delivered on {parseDateYmd(data.dateDelivered!)}</>
			) : (
				<>is currently being delivered</>
			);
			break;
		case "canceled":
			sentence = <>was later cancelled</>;
			break;
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
										Order (#{data?.id})
									</Title>

									<BadgeOrder status={data?.status!} />
								</Group>
								<Text inherit>
									Order <u>#{prependZeros(5, data?.id!)}</u> was placed on{" "}
									{parseDateYmd(data?.datePlaced!)} and {sentence}.
								</Text>
								<Text inherit>
									If you have any questions, please feel free to contact us, our customer service
									center is working for you 24/7.
								</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<TableOrdersProducts data={data?.orderedProducts!} />
					</GridCol>

					<GridCol span={12}>
						<Divider />
					</GridCol>

					<GridCol span={12}>
						<Grid>
							<GridCol span={{ base: 12, md: 7, lg: 5 }}>
								<CardInvoiceOrder orderedProducts={data?.orderedProducts!} />
							</GridCol>

							<GridCol span={{ base: 12, md: 5, lg: 7 }}>
								<Grid>
									{data?.addresses?.map(address => (
										<GridCol key={address.id} span={{ base: 12, lg: 6 }}>
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
