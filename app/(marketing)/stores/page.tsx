import React from "react";

import { Metadata } from "next";
import NextImage from "next/image";

import { Anchor, Center, Grid, GridCol, Stack, Text, Title, Image, Flex, Group } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardStore from "@/components/card/Store";

import classes from "./Stores.module.scss";
import images from "@/assets/images";
import stores from "@/data/stores";

export const metadata: Metadata = { title: "Stores" };

export default async function Stores() {
	return (
		<LayoutPage>
			<LayoutSection containerized={"responsive"} margined={48}>
				<Group justify="space-between" className={classes.card}>
					<Title
						order={2}
						fz={{ base: "xl", lg: 36 }}
						fw={"bold"}
						ml={{ md: "md", lg: "xl" }}
						className={classes.title}
					>
						Stores
					</Title>
					<Stack>
						<Image
							src={images.storeGraphics}
							alt="Store Image"
							w={{ base: 160, xs: 280, sm: 400, md: 480 }}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>
				</Group>
			</LayoutSection>

			<LayoutSection containerized={"responsive"} margined>
				<Grid>
					{stores.map(store => (
						<GridCol key={store.title} span={{ base: 12, sm: 6, md: 4 }}>
							<CardStore data={store} />
						</GridCol>
					))}
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
