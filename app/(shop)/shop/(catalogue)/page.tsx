import React, { useContext, useEffect, useState } from "react";

import {
	ActionIcon,
	Box,
	Card,
	Divider,
	Grid,
	GridCol,
	Group,
	NumberFormatter,
	Pagination,
	Select,
	Skeleton,
	Stack,
	Text,
	Title,
} from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardProductShopGrid from "@/components/card/product/shop/Grid";
import CardProductShopList from "@/components/card/product/shop/List";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";
import { IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import getProducts from "@/handlers/requests/getProducts";
import getStores from "@/handlers/requests/getStores";

export default async function Shop() {
	const products = await getProducts();
	const stores = await getStores();

	// const [layout, setLayout] = useState<"grid" | "list">("grid");

	const getLayout = (layout: "list" | "grid") => {
		switch (layout) {
			case "grid":
				return products?.map(product => (
					<GridCol key={product.id} span={{ base: 12, md: 4, lg: 3 }}>
						<CardProductShopGrid data={product} />
					</GridCol>
				));
			case "list":
				return products?.map(product => (
					<GridCol key={product.id} span={12}>
						<CardProductShopList data={product} />
					</GridCol>
				));
		}
	};

	return (
		<LayoutPage padded stacked="lg">
			<LayoutSection>
				<Card bg={"light-dark(var(--mantine-color-gray-light),var(--mantine-color-gray-light))"} p={40}>
					<Stack align="start">
						<Title order={2} fz={40}>
							Snacks & Munchies
						</Title>

						<Stack align="start">
							<Stack gap={0}>
								<Title order={2} fz={"xl"} fw={"bold"} lh={1}>
									{stores[0].title}
								</Title>
								<Text fz={"sm"} c={"gray.6"}>
									Whatever the occasion, we&apos;ve got you covered.
								</Text>
							</Stack>

							<InputAutocompleteStores
								w={{ md: 320 }}
								placeholder={`Search ${stores[0].title}`}
								rightSection={<IconSearch size={16} stroke={2} />}
								data={products.map(p => p.title)}
							/>
						</Stack>
					</Stack>
				</Card>
			</LayoutSection>

			<LayoutSection>
				<Group justify="space-between">
					<Text fz={"sm"}>
						<Text component="span" inherit fw={"bold"}>
							<NumberFormatter value={products.length} thousandSeparator />
						</Text>{" "}
						Products found
					</Text>

					<Group>
						<ActionIcon size={32} variant="subtle" color={"gray"}>
							<IconList size={24} stroke={2} />
						</ActionIcon>
						<ActionIcon size={32} variant="subtle" color={"pri.6"}>
							<IconLayoutGrid size={24} stroke={2} />
						</ActionIcon>
						{/* <ActionIcon size={32} variant="subtle" c={"pri"}>
							<IconGridDots size={24} stroke={2} />
						</ActionIcon> */}

						<Select
							data={[
								{ value: "12", label: "Show 12" },
								{ value: "16", label: "Show 16" },
								{ value: "20", label: "Show 20" },
								{ value: "24", label: "Show 24" },
							]}
							defaultValue={"12"}
							allowDeselect={false}
							withCheckIcon={false}
							w={120}
						/>

						<Select
							placeholder="Sort By"
							data={[
								{ value: "featured", label: "Featured" },
								{ value: "price-ascending", label: "Price (Low to High)" },
								{ value: "price-descending", label: "Price (High to Low)" },
								{ value: "date-ascending", label: "Date (Oldest First)" },
								{ value: "date-descending", label: "Date (Newest First)" },
							]}
							defaultValue={"12"}
							allowDeselect={false}
							withCheckIcon={false}
							w={180}
						/>
					</Group>
				</Group>
			</LayoutSection>

			<LayoutSection>
				<Grid>{getLayout("grid")}</Grid>
			</LayoutSection>

			<LayoutSection>
				<Group justify="center" mt={"xl"}>
					<Pagination total={10} />
				</Group>
			</LayoutSection>
		</LayoutPage>
	);
}
