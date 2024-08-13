"use client";

import React from "react";

import NextImage from "next/image";
import { StaticImageData } from "next/image";

import { Stack, Tabs, Image } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons-react";

import classes from "./Product.module.scss";
import { useMediaQuery } from "@mantine/hooks";
import images from "@/assets/images";

const imagesSample = [
	{
		image: images.products.image1,
		alt: "image1",
	},
	{
		image: images.products.image2,
		alt: "image2",
	},
	{
		image: images.products.image3,
		alt: "image3",
	},
	{
		image: images.products.image4,
		alt: "image4",
	},
];

interface typeImage {
	image: string;
	alt: string;
}

export default function Product({ images = imagesSample }: { images?: typeImage[] }) {
	const mobile = useMediaQuery("(max-width: 36em)");
	const tablet = useMediaQuery("(min-width: 48em)");
	const desktop = useMediaQuery("(min-width: 62em)");

	const tabsList = (
		<Tabs.List grow>
			{images.map(image => (
				<Tabs.Tab key={image.alt} value={image.alt}>
					<Stack>
						<Image
							src={image.image}
							alt={image.alt}
							w={{ base: 72, md: 96, lg: 108 }}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							loading="lazy"
							className={classes.image}
						/>
					</Stack>
				</Tabs.Tab>
			))}
		</Tabs.List>
	);

	const panels = images.map(image => (
		<Tabs.Panel key={image.alt} value={image.alt}>
			<Stack h={"100%"}>
				<Image
					src={image.image}
					alt={image.alt}
					w={"100%"}
					radius={"md"}
					component={NextImage}
					width={1920}
					height={1080}
					loading="lazy"
				/>
			</Stack>
		</Tabs.Panel>
	));

	return (
		<Tabs
			defaultValue={images[0].alt}
			inverted={mobile || desktop}
			orientation={mobile || desktop ? "horizontal" : "vertical"}
			keepMounted={false}
			classNames={{ tab: classes.tab, panel: classes.panel }}
		>
			{mobile || desktop ? (
				<>
					<>{panels}</>
					<>{tabsList}</>
				</>
			) : (
				<>
					<>{tabsList}</>
					<>{panels}</>
				</>
			)}
		</Tabs>
	);
}
