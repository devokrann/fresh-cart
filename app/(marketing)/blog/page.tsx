import React from "react";

import { Box, Divider, Grid, GridCol, Group, Pagination, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

import CardBlog from "@/components/card/Blog";

import blog from "@/data/posts";

export default function Blog() {
	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Stack>
					<Title order={2} fz={36} fw={900}>
						FreshCart Blog
					</Title>

					<Grid gutter={"xl"}>
						<GridCol span={12}>
							<CardBlog data={blog[blog.length - 1]} orientation="horizontal" />
						</GridCol>

						{blog.map(
							post =>
								blog.filter(p => p != blog[blog.length - 1]) && (
									<GridCol key={post.title} span={{ base: 12, sm: 6, md: 4 }}>
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
