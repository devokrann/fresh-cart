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
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Order Placed" };

export default async function OrderPlaced() {
	const session = await auth();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

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
							Thank you, {"Julie"}. Your order has been completed. Your order hasn&apos;t shipped yet but
							we will send you an email when it does.
						</Text>
					</Stack>

					<Button size="lg" component={Link} href={"/account/orders"}>
						View Orders
					</Button>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
