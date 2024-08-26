import React from "react";

import NextImage from "next/image";
import Link from "next/link";

import {
	Flex,
	Grid,
	Container,
	Image as Image,
	Text,
	Title,
	List,
	Anchor,
	Divider,
	Group,
	GridCol,
	ListItem,
	Center,
	AspectRatio,
} from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import PartialLandscape from "../brand/Landscape";

import icons from "@/assets/icons";

import classes from "./Main.module.scss";

import contact from "@/data/contact";

const linkSets = [
	{
		title: "Get to Know Us",
		links: [
			{ label: "Company", link: "#company" },
			{ label: "Blog", link: "#blog" },
			{ label: "Help Center", link: "/help" },
			{ label: "Our Value", link: "#value" },
		],
	},
	{
		title: "For Consumers",
		links: [
			{ label: "Payments", link: "#payments" },
			{ label: "Shipping", link: "#shipping" },
			{ label: "Product Returns", link: "#returns" },
			{ label: "FAQ", link: "#faq" },
		],
	},
	{
		title: "Become a Shopper",
		links: [
			{ label: "Shopper Opportinities", link: "#Join" },
			{ label: "Earnings", link: "#Follow" },
			{ label: "Ideas & Guides", link: "#Email" },
			{ label: "New Retailers", link: "#GitHub" },
		],
	},
	{
		title: "Bookly Programs",
		links: [
			{ label: "Gift Cards", link: "#gift-cards" },
			{ label: "Promos & Coupons", link: "#promos-and-coupons" },
			{ label: "Bookly Adds", link: "#ads" },
			{ label: "Careers", link: "#careers" },
		],
	},
];

const payment = [
	{
		link: "#amazon",
		alt: "Amazon",
		icon: icons.payment.amazon,
	},
	{
		link: "#americanExpress",
		alt: "American Express",
		icon: icons.payment.americanExpress,
	},
	{
		link: "#mastercard",
		alt: "Mastercard",
		icon: icons.payment.mastercard,
	},
	{
		link: "#paypal",
		alt: "PayPal",
		icon: icons.payment.paypal,
	},
	{
		link: "#visa",
		alt: "Visa",
		icon: icons.payment.visa,
	},
];

const appButtons = [
	{
		link: "#appStore",
		alt: "App Store",
		icon: icons.other.appStore,
	},
	{
		link: "#playStore",
		alt: "Play Store",
		icon: icons.other.playStore,
	},
];

export default function Main() {
	return (
		<LayoutSection className={classes.footer} padded={64}>
			<LayoutSection containerized="responsive">
				<Grid>
					<GridCol span={{ base: 12, md: 4 }}>
						<Flex direction={"column"} align={{ base: "center", md: "start" }} gap={"md"}>
							<PartialLandscape />
							<Text className="textResponsive" ta={{ base: "center", md: "start" }}>
								Vivamus non risus id sapien egestas tempus id sed lla mus justo metus, suscipit non
								hendrerit.Duis placerat, urna ut dictum lobortis, erat libero feugiat nulla, ullamcorper
								fermentum lectus dolor ut tortor.
							</Text>
						</Flex>
					</GridCol>
					<GridCol span={{ base: 12, md: 8 }} visibleFrom="sm">
						<Grid mt={{ sm: "xl", md: 0 }}>
							{linkSets.map(linkSet => (
								<GridCol
									key={linkSet.title}
									span={"auto"}
									visibleFrom={linkSets.indexOf(linkSet) == linkSets.length - 1 ? "lg" : undefined}
								>
									<Flex direction={"column"} align={{ base: "center", md: "end" }} gap={"xs"}>
										<Title
											order={4}
											fz={"md"}
											c={"light-dark(var(--mantine-color-sl-4),var(--mantine-color-sl-4))"}
											fw={"bold"}
										>
											{linkSet.title}
										</Title>
										<List listStyleType="none">
											{linkSet.links.map(link => (
												<ListItem key={link.link} className={classes.listItem}>
													<Anchor
														component={Link}
														href={link.link}
														title={link.label}
														className={classes.link}
													>
														{link.label}
													</Anchor>
												</ListItem>
											))}
										</List>
									</Flex>
								</GridCol>
							))}
						</Grid>
					</GridCol>
				</Grid>
			</LayoutSection>

			<LayoutSection containerized="responsive">
				<Divider mt={"lg"} mb={2} />
			</LayoutSection>

			<LayoutSection containerized="responsive" padded="md" visibleFrom="xs">
				<Flex
					direction={{ base: "column", xs: "row" }}
					align={"center"}
					justify={{ xs: "space-between" }}
					gap={{ base: "xs", xs: "md" }}
				>
					<Group gap={"xs"}>
						{payment.map(item => (
							<Center key={item.alt}>
								<Image
									src={item.icon}
									alt={item.alt}
									title={item.alt}
									h={{ base: 32, lg: 40 }}
									loading="lazy"
									component={NextImage}
									width={1920}
									height={1080}
								/>
							</Center>
						))}
					</Group>

					<Group gap={"xs"}>
						{appButtons.map(item => (
							<Center key={item.alt}>
								<Image
									src={item.icon}
									alt={item.alt}
									title={item.alt}
									h={{ base: 32, lg: 40 }}
									loading="lazy"
									component={NextImage}
									width={1920}
									height={1080}
								/>
							</Center>
						))}
					</Group>
				</Flex>
			</LayoutSection>

			<LayoutSection containerized="responsive">
				<Divider mb={"lg"} mt={2} />
			</LayoutSection>

			<LayoutSection containerized="responsive">
				<Flex
					direction={{ base: "column", xs: "row" }}
					align={"center"}
					justify={{ xs: "space-between" }}
					gap={{ base: "xs", xs: "md" }}
				>
					<Text c={"dimmed"} fz={{ base: "xs", xs: "sm" }}>
						© 2024 Bookly. All rights reserved. Powered by{" "}
						<Anchor inherit fw={500} underline="never" component={Link} href={"#"}>
							devokrann
						</Anchor>
						.
					</Text>
					<Group gap={"xs"}>
						{contact.socials.map(social => (
							<a key={social.link} href={social.link}>
								<Image
									src={social.icon}
									alt={social.title}
									title={social.title}
									h={{ base: 24, md: 28 }}
									loading="lazy"
									component={NextImage}
									width={1920}
									height={1080}
								/>
							</a>
						))}
					</Group>
				</Flex>
			</LayoutSection>
		</LayoutSection>
	);
}
