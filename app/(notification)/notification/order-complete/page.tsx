import React from "react";

import { Metadata } from "next";

import NextImage from "next/image";

import {
	Anchor,
	Button,
	ButtonGroup,
	Card,
	Center,
	Flex,
	Grid,
	GridCol,
	Group,
	Image,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";

import { IconMail, IconPhone, IconTrash } from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";
import TableWishlist from "@/components/tables/Wishlist";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";
import Link from "next/link";

export const metadata: Metadata = { title: "Order Complete" };

export default async function OrderComplete() {
	return (
		<LayoutPage>
			<LayoutSection padded={120} containerized={"xs"}>
				<Stack align="center" gap={"xl"}>
					<Stack w={48}>
						<Image
							src={"https://img.icons8.com/?size=100&id=4DpNVfpKdNK1&format=png&color=000000"}
							alt={"Not Found"}
							component={NextImage}
							priority
							width={1920}
							height={1080}
						/>
					</Stack>

					<Stack align="center">
						<Title order={2} fw={"bold"} ta={"center"} fz={32}>
							Your Order Has Been Placed!
						</Title>
						<Text fz={"lg"} ta={"center"}>
							Your order{" "}
							<Anchor inherit href="#" underline="always">
								673290789
							</Anchor>{" "}
							has been completed. Your order details are shown for your personal accont.
						</Text>
					</Stack>

					<Button size="lg" component={Link} href={"#"}>
						View Orders
					</Button>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
