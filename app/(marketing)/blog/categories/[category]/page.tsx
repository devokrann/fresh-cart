import React from "react";

import { Box, Divider, Grid, GridCol, Group, Pagination, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

import CardBlog from "@/components/card/Blog";

import { typeParams } from "../layout";
import capitalize from "@/handlers/parsers/string/capitalize";
import link from "@/handlers/parsers/string/link";
import getPostCategories from "@/handlers/database/getPostCategories";
import getPosts from "@/handlers/database/getPosts";

export default async function Categories({ params }: { params: typeParams }) {
	const postCategories = await getPostCategories();
	const posts = await getPosts();

	const category = postCategories.find(c => link.linkify(c.id) == params.id);

	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Stack>
					<Title order={2} fz={36} fw={900}>
						{category && capitalize.word(category.title)}
					</Title>

					<Grid gutter={"xl"}>
						{posts
							.filter(p => p.category.id == category?.id)
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
