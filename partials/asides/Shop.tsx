import React from "react";

import { Autocomplete, Button, Card, Checkbox, Group, Rating, Stack, Title } from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import NavShop from "@/components/navigation/Shop";
import SliderPrice from "@/components/sliders/Price";
import InputCheckboxStores from "@/components/inputs/checkbox/Stores";
import CardShopOffer from "@/components/card/shop/Offer";
import FormShopStores from "../forms/shop/Stores";

import getProducts from "@/handlers/database/getProducts";
import getProductParentCategories from "@/handlers/database/getProductParentCategories";

export default async function Shop() {
	const products = await getProducts();
	const productParentCategories = await getProductParentCategories();

	return (
		<LayoutSection padded>
			<Stack gap={"xl"}>
				<LayoutSection>
					<Stack gap={4}>
						<Title order={2} fz={{ md: "lg" }}>
							Categories
						</Title>

						<Stack gap={0}>
							<NavShop data={productParentCategories} />
						</Stack>
					</Stack>
				</LayoutSection>

				<LayoutSection>
					<Stack gap={4}>
						<Title order={2} fz={{ md: "lg" }}>
							Stores
						</Title>

						<FormShopStores />
					</Stack>
				</LayoutSection>

				<LayoutSection>
					<Stack gap={4}>
						<Title order={2} fz={{ md: "lg" }}>
							Price
						</Title>

						<SliderPrice data={products} />
					</Stack>
				</LayoutSection>

				<LayoutSection>
					<Stack gap={"xs"}>
						<Title order={2} fz={{ md: "lg" }}>
							Rating
						</Title>

						<Stack gap={"xs"}>
							<InputCheckboxStores title={<Rating defaultValue={5} readOnly />} />
							<InputCheckboxStores title={<Rating defaultValue={4} readOnly />} />
							<InputCheckboxStores title={<Rating defaultValue={3} readOnly />} />
							<InputCheckboxStores title={<Rating defaultValue={2} readOnly />} />
							<InputCheckboxStores title={<Rating defaultValue={1} readOnly />} />
						</Stack>
					</Stack>
				</LayoutSection>

				<Group grow>
					<Button variant="outline" color={"pri.6"}>
						Reset
					</Button>
					<Button>Apply</Button>
				</Group>

				<LayoutSection>
					<CardShopOffer discount={25} />
				</LayoutSection>
			</Stack>
		</LayoutSection>
	);
}
