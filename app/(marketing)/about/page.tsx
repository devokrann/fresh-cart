import React from "react";

import { Metadata } from "next";
import NextImage from "next/image";

import { Anchor, Center, Grid, GridCol, Stack, Text, Title, Image, Flex } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardStats from "@/components/card/Stats";
import CardAbout from "@/components/card/About";

import images from "@/assets/images";
import Link from "next/link";
import icons from "@/assets/icons";

export const metadata: Metadata = { title: "About" };

export default async function About() {
	const data = {
		about: [
			{
				image: icons.about.about1,
				title: "Grow my business with Freshcart",
				description:
					"Duis placerat, urna ut dictum lobortis, erat libero feugiat nulla, ullamcorper fermentum lectus dolor ut tortor.",
				cta: "Frashcart Platform",
			},
			{
				image: icons.about.about2,
				title: "Advertise my brand on Freshcart",
				description:
					"Duis placerat, urna ut dictum lobortis, erat libero feugiat nulla, ullamcorper fermentum lectus dolor ut tortor.",
				cta: "Frashcart Ads",
			},
			{
				image: icons.about.about3,
				title: "Learn more about Frashcart",
				description:
					"Vivamus non risus id sapien egestas tempus id sed lla mus justo metus, suscipit non hendrerit.",
				cta: "Learn More",
			},
		],
		stats: [
			{
				number: "500k",
				title: "Shoppers",
			},
			{
				number: "4,500+",
				title: "Cities",
			},
			{
				number: "40k+",
				title: "Stores",
			},
			{
				number: "650+",
				title: "Brands",
			},
		],
	};

	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid align="center" gutter={{ base: "xl", sm: "md" }}>
					<GridCol span={{ base: 12, sm: 6 }}>
						<Center>
							<Stack w={{ base: "100%", sm: "80%", md: "66%", lg: "50%" }}>
								<Title order={2} fw={"bolder"} fz={36} ta={{ base: "center", sm: "start" }}>
									The Future of Grocery Delivery:
								</Title>
								<Text ta={{ base: "center", sm: "start" }}>
									By powering the future of grocery with our retail partners, we give everyone access
									to the food they love and more time to enjoy it together.
								</Text>
							</Stack>
						</Center>
					</GridCol>
					<GridCol span={{ base: 12, sm: 6 }}>
						<Flex align={{ base: "center", md: "stretch" }} direction={{ base: "column", sm: "row" }}>
							<Image
								src={images.about}
								alt="About Image"
								// w={{ base: 320, md: 640 }}
								h={{ sm: 320, md: 320 }}
								radius={"md"}
								component={NextImage}
								width={1920}
								height={1080}
								priority
							/>
						</Flex>
					</GridCol>
				</Grid>
			</LayoutSection>

			<LayoutSection padded shadowed containerized={"responsive"}>
				<Stack gap={"xl"}>
					<Grid gutter={"xl"} justify="center">
						{data.about.map(item => (
							<GridCol key={item.title} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
								<CardAbout data={item} />
							</GridCol>
						))}
					</Grid>

					<Text ta={"center"}>
						For assistance using FreshCart services, please visit our{" "}
						<Anchor inherit underline="never" fw={500} component={Link} href="#">
							help center
						</Anchor>
						.
					</Text>
				</Stack>
			</LayoutSection>

			<LayoutSection
				padded
				shadowed
				containerized={"responsive"}
				bg={"light-dark(var(--mantine-color-pri-6),var(--mantine-color-pri-light))"}
				c={"light-dark(var(--mantine-color-white),var(--mantine-color-white))"}
			>
				<Stack gap={"xl"}>
					<Stack>
						<Title order={2} fz={32} ta={"center"} fw={"bolder"} c={"white"}>
							Trusted by retailers. Loved by customers.
						</Title>
						<Text ta={"center"}>
							We give everyone access to the books they love and more time to enjoy it together.
						</Text>
					</Stack>

					<Grid gutter={"xl"} justify="center">
						{data.stats.map(stat => (
							<GridCol key={stat.title} span={{ base: 6, md: 3, lg: 2 }}>
								<CardStats data={stat} />
							</GridCol>
						))}
					</Grid>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
