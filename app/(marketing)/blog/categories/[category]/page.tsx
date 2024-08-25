import React from "react";

import { Box, Divider, Grid, GridCol, Group, Pagination, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

import CardBlog from "@/components/card/Blog";

import blog from "@/data/blog";
import { typeParams } from "../layout";
import capitalize from "@/handlers/parsers/string/capitalize";

export default function Categories({ params }: { params: typeParams }) {
	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Stack>
					<Title order={2} fz={36} fw={900}>
						{capitalize.word(params.category)}
					</Title>

					<Grid gutter={"xl"}>
						{blog
							.filter(p => p.category.toLowerCase() == params.category)
							.map(post => (
								<GridCol key={post.title} span={{ base: 12, sm: 6, md: 4 }}>
									<CardBlog data={post} />
								</GridCol>
							))}
					</Grid>
				</Stack>
			</LayoutSection>

			<LayoutSection margined>
				<Group justify="center">
					<Pagination total={10} />
				</Group>
			</LayoutSection>
		</LayoutPage>
	);
}
