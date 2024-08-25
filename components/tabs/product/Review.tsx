"use client";

import React from "react";

import NextImage from "next/image";
import { StaticImageData } from "next/image";

import {
	Stack,
	Tabs,
	Image,
	Grid,
	GridCol,
	Title,
	Text,
	Group,
	Select,
	Box,
	Card,
	Rating,
	Progress,
	NumberFormatter,
	Button,
	Divider,
} from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings, IconStarFilled } from "@tabler/icons-react";

import LayoutSection from "@/layouts/Section";

import classes from "./Review.module.scss";
import { useMediaQuery } from "@mantine/hooks";
import images from "@/assets/images";
import CardReviewShop from "@/components/card/review/Shop";
import FormReview from "@/partials/forms/Review";

import { typeProduct } from "@/types/product";
import reviews from "@/data/reviews";
import getFraction from "@/handlers/fraction";

export default function Review({ data }: { data: typeProduct }) {
	const details = [
		{
			title: "About",
			desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.",
		},
		{
			title: "Nutrient Value & Benefits",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing sagittis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "Storage Tips",
			desc: "Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing sagittis sed.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "Unit",
			desc: "3 Units",
		},
		{
			title: "Seller",
			desc: "DMart Pvt. LTD",
		},
		{
			title: "Disclaimer",
			desc: "Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain accuracy of all information displayed.",
		},
	];

	const rates = [
		{
			star: 5,
			rate: data.rating.stars.five / data.rating.raters,
		},
		{
			star: 4,
			rate: data.rating.stars.four / data.rating.raters,
		},
		{
			star: 3,
			rate: data.rating.stars.three / data.rating.raters,
		},
		{
			star: 2,
			rate: data.rating.stars.two / data.rating.raters,
		},
		{
			star: 1,
			rate: data.rating.stars.one / data.rating.raters,
		},
	];

	const additional = [
		{ label: "Category", item: data.category },
		{ label: "Brand", item: data.brand },
		{ label: "Product Number", item: data.code },
		{ label: "Shipping Days", item: data.shipping.days },
		{ label: "Available packaging", item: "LOLDuis aute irure dolor in reprehenderit" },
		{ label: "Sunt in culpa qui", item: "Lorem ipsum dolor sit amet" },
		{ label: "Weight", item: "Dolor sit amet" },
		{ label: "Available packaging2", item: "LOLDuis aute irure dolor in reprehenderit" },
	];

	const tabs = [
		{
			title: "Product Details",
			panel: (
				<LayoutSection padded="xl">
					<Stack>
						{details.map(item => (
							<Stack key={item.title} gap={0}>
								<Title order={4}>{item.title}</Title>
								<Text inherit>{item.desc}</Text>
							</Stack>
						))}
					</Stack>
				</LayoutSection>
			),
		},
		{
			title: "Information",
			panel: (
				<LayoutSection padded="xl">
					<Grid>
						{additional.map(item => (
							<GridCol key={item.label} span={{ base: 12, xs: 6 }}>
								<Grid>
									<GridCol span={{ base: 4 }}>
										<Text inherit fw={500}>
											{item.label}
										</Text>
									</GridCol>
									<GridCol span={{ base: 8 }}>
										<Text inherit>{item.item}</Text>
									</GridCol>
								</Grid>
							</GridCol>
						))}
					</Grid>
				</LayoutSection>
			),
		},
		{
			title: "Reviews",
			panel: (
				<LayoutSection padded="xl">
					<Grid gutter={{ base: "xl", md: 64 }}>
						<GridCol span={{ base: 12, md: 4 }}>
							<Stack gap={"lg"}>
								<Stack gap={"xs"}>
									<Title order={2}>Customer Reviews</Title>

									<Group>
										<Rating
											value={data.rating.rating}
											fractions={getFraction(data.rating.rating)}
											readOnly
										/>
										<Text inherit>{data.rating.rating} out of 5</Text>
									</Group>

									<Text inherit>
										<NumberFormatter value={data.rating.raters} thousandSeparator /> global ratings
									</Text>
								</Stack>

								<Grid>
									<GridCol span={12}>
										{rates.map(rate => (
											<Grid key={rate.star} align="center" gutter={0} my={"xs"}>
												<GridCol span={0.5}>
													<Text inherit ta={"center"}>
														{rate.star}
													</Text>
												</GridCol>
												<GridCol span={1}>
													<Group justify="center">
														<IconStarFilled size={16} color="orange" />
													</Group>
												</GridCol>
												<GridCol span={9}>
													<Progress value={Math.floor(rate.rate * 100)} color="yellow" />
												</GridCol>
												<GridCol span={1.5}>
													<Text inherit ta={"end"}>
														{Math.floor(rate.rate * 100)}%
													</Text>
												</GridCol>
											</Grid>
										))}
									</GridCol>
								</Grid>

								<Stack>
									<Stack gap={0}>
										<Title order={2}>Review this product</Title>
										<Text inherit>Share your thoughts with other customers.</Text>
									</Stack>

									<Button color="gray" variant="outline" size="md" component="a" href="#review">
										Wite the Review
									</Button>
								</Stack>
							</Stack>
						</GridCol>

						<GridCol span={{ base: 12, md: 8 }}>
							<Stack gap={"xl"}>
								<Stack>
									<Group justify="space-between">
										<Title order={3}>Reviews</Title>

										<Select
											defaultValue={"top"}
											allowDeselect={false}
											data={[
												{ value: "top", label: "Top Reviews" },
												{ value: "latest", label: "Latest Reviews" },
											]}
										/>
									</Group>

									<Stack gap={"xs"}>
										{reviews.map(review => (
											<Box
												key={review.title}
												style={
													reviews.indexOf(review) > 0
														? {
																borderTop:
																	"1px solid var(--mantine-color-default-border)",
																paddingTop: "var(--mantine-spacing-xs)",
														  }
														: undefined
												}
											>
												<CardReviewShop data={review} />
											</Box>
										))}
									</Stack>
								</Stack>

								{/* <Divider color="pri" /> */}

								<Stack pt={"xl"} id="review">
									<Title order={2}>Leave A Review</Title>

									<FormReview />
								</Stack>
							</Stack>
						</GridCol>
					</Grid>
				</LayoutSection>
			),
		},
	];

	const tabsList = (
		<Tabs.List grow>
			<Grid gutter={0} w={"100%"}>
				{tabs.map(item => (
					<GridCol key={item.title} span={{ base: 6, xs: 3, md: 1.5 }}>
						<Tabs.Tab value={item.title} w={"100%"}>
							{item.title}
						</Tabs.Tab>
					</GridCol>
				))}
			</Grid>
		</Tabs.List>
	);

	const panels = tabs.map(item => (
		<Tabs.Panel key={item.title} value={item.title}>
			{item.panel}
		</Tabs.Panel>
	));

	return (
		<Tabs defaultValue={tabs[0].title} classNames={{ tab: classes.tab, panel: classes.panel }}>
			{tabsList}

			{panels}
		</Tabs>
	);
}
