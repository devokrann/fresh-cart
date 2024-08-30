"use client";

import React, { useEffect, useState } from "react";

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
import stores from "@/data/stores";
import { typeProduct } from "@/types/product";
import getProducts from "@/handlers/database/getProducts";

export default function Shop() {
	const [data, setData] = useState<typeProduct[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setData(await getProducts());
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const [layout, setLayout] = useState<"grid" | "list">("grid");

	const getLayout = () => {
		switch (layout) {
			case "grid":
				return data?.map(product => (
					<GridCol key={product.title} span={{ base: 12, md: 4, lg: 3 }}>
						<CardProductShopGrid data={product} />
					</GridCol>
				));
			case "list":
				return data?.map(product => (
					<GridCol key={product.title} span={12}>
						<CardProductShopList data={product} />
					</GridCol>
				));
		}
	};

	const loadingLayoutArray = [
		{
			id: "1",
			element: <Skeleton h={320} w={"100%"} />,
		},
		{
			id: "2",
			element: <Skeleton h={320} w={"100%"} />,
		},
		{
			id: "3",
			element: <Skeleton h={320} w={"100%"} />,
		},
		{
			id: "4",
			element: <Skeleton h={320} w={"100%"} />,
		},
	];

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

							{loading ? (
								<Skeleton w={360} h={32} />
							) : (
								<InputAutocompleteStores
									w={{ md: 320 }}
									placeholder={`Search ${stores[0].title}`}
									rightSection={<IconSearch size={16} stroke={2} />}
									data={data ? data.map(p => p.title) : []}
								/>
							)}
						</Stack>
					</Stack>
				</Card>
			</LayoutSection>

			<LayoutSection>
				<Group justify="space-between">
					{loading ? (
						<Skeleton w={160} h={16} />
					) : (
						<Text fz={"sm"}>
							<Text component="span" inherit fw={"bold"}>
								<NumberFormatter value={data?.length} thousandSeparator />
							</Text>{" "}
							Products found
						</Text>
					)}

					<Group>
						<ActionIcon
							size={32}
							variant="subtle"
							color={layout == "list" ? "pri.6" : "gray"}
							onClick={() => setLayout("list")}
						>
							<IconList size={24} stroke={2} />
						</ActionIcon>
						<ActionIcon
							size={32}
							variant="subtle"
							color={layout == "grid" ? "pri.6" : "gray"}
							onClick={() => setLayout("grid")}
						>
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
				<Grid>
					{loading
						? loadingLayoutArray.map(item => (
								<GridCol
									key={item.id}
									span={{ base: 12, md: 4, lg: 3 }}
									visibleFrom={
										loadingLayoutArray.indexOf(item) == loadingLayoutArray.length - 1
											? "lg"
											: undefined
									}
								>
									{item.element}
								</GridCol>
						  ))
						: getLayout()}
				</Grid>
			</LayoutSection>

			<LayoutSection>
				<Group justify="center" mt={"xl"}>
					<Pagination total={10} />
				</Group>
			</LayoutSection>
		</LayoutPage>
	);
}
