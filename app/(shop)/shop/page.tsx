import React from "react";

import { Box, Divider, Grid, GridCol, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardProduct from "@/components/card/Product";

import blog from "@/data/blog";
import products from "@/data/products";

export default function Shop() {
	return (
		<LayoutPage>
			<LayoutPage padded>
				<LayoutSection>
					<Grid>
						{products.map(product => (
							<GridCol key={product.title} span={{ base: 12, md: 4, lg: 3 }}>
								<CardProduct data={product} />
							</GridCol>
						))}
					</Grid>
				</LayoutSection>
			</LayoutPage>
		</LayoutPage>
	);
}
