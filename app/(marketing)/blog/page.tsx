import React from "react";

import { Box, Divider, Grid, GridCol, Group, Pagination, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

import CardBlog from "@/components/card/Blog";
import getPosts from "@/handlers/database/getPosts";

export default async function Blog() {
	const posts = await getPosts();

	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Stack>
					<Title order={2} fz={36} fw={900}>
						FreshCart Blog
					</Title>

					<Grid gutter={"xl"}>
						<GridCol span={12}>
							<CardBlog data={posts[posts.length - 1]} orientation="horizontal" />
						</GridCol>

						{posts.map(
							post =>
								posts.filter(p => p != posts[posts.length - 1]) && (
									<GridCol key={post.id} span={{ base: 12, sm: 6, md: 4 }}>
										<CardBlog data={post} />
									</GridCol>
								)
						)}
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
