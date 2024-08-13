import React from "react";

import {
	ActionIcon,
	Box,
	Card,
	Divider,
	Grid,
	GridCol,
	Group,
	Pagination,
	Select,
	Stack,
	Text,
	Title,
} from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardProductShop from "@/components/card/product/Shop";

import blog from "@/data/blog";
import products from "@/data/products";
import { IconGridDots, IconLayoutGrid, IconList } from "@tabler/icons-react";

export default function Shop() {
	return (
		<LayoutPage>
			<LayoutPage padded stacked="lg">
				<LayoutSection>
					<Card bg={"gray.1"} p={40}>
						<Title order={2} fz={40} c={"dark.6"}>
							Snacks & Munchies
						</Title>
					</Card>
				</LayoutSection>

				<LayoutSection>
					<Group justify="space-between">
						<Text fz={"sm"}>
							<Text component="span" inherit fw={"bold"}>
								{products.length}
							</Text>{" "}
							Products found
						</Text>

						<Group>
							<ActionIcon size={32} variant="subtle" color={"gray"}>
								<IconList size={24} stroke={2} />
							</ActionIcon>
							<ActionIcon size={32} variant="subtle" color={"gray"}>
								<IconLayoutGrid size={24} stroke={2} />
							</ActionIcon>
							<ActionIcon size={32} variant="subtle" c={"pri"}>
								<IconGridDots size={24} stroke={2} />
							</ActionIcon>

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
								styles={{
									input: {
										backgroundColor: "transparent",
										border: "1px solid var(--mantine-color-default-border)",
									},
									dropdown: {
										backgroundColor: "var(--mantine-color-white)",
										border: "1px solid var(--mantine-color-default-border)",
									},
								}}
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
								styles={{
									input: {
										backgroundColor: "transparent",
										border: "1px solid var(--mantine-color-default-border)",
									},
									dropdown: {
										backgroundColor: "var(--mantine-color-white)",
										border: "1px solid var(--mantine-color-default-border)",
									},
								}}
							/>
						</Group>
					</Group>
				</LayoutSection>

				<LayoutSection>
					<Grid>
						{products.map(product => (
							<GridCol key={product.title} span={{ base: 12, md: 4, lg: 3 }}>
								<CardProductShop data={product} />
							</GridCol>
						))}
					</Grid>
				</LayoutSection>

				<LayoutSection>
					<Group justify="center" mt={"xl"}>
						<Pagination total={10} />
					</Group>
				</LayoutSection>
			</LayoutPage>
		</LayoutPage>
	);
}
