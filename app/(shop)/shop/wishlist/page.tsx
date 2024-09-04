import React from "react";

import { Metadata } from "next";

import {
	Anchor,
	Button,
	ButtonGroup,
	Card,
	Flex,
	Grid,
	GridCol,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";

import {
	IconArrowRight,
	IconChevronLeft,
	IconChevronRight,
	IconMail,
	IconPhone,
	IconRefresh,
	IconTrash,
} from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";
import TableCart from "@/components/tables/Cart";
import CardShopCart from "@/components/card/shop/Cart";
import TableWishlist from "@/components/tables/Wishlist";

import OperatorWishlist from "@/components/operators/Wishlist";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";
import Link from "next/link";

export const metadata: Metadata = { title: "Wishlist" };

export default async function Wishlist() {
	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group align="start" justify="space-between">
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									My Wishlist
								</Title>
								<Text inherit>There are {"5"} products in your wishlist.</Text>
							</Stack>

							<Group gap={"xs"}>
								<Button
									component={Link}
									href={"/shop"}
									variant="outline"
									color={"pri.6"}
									leftSection={<IconChevronLeft size={16} stroke={2} />}
								>
									Continue Shopping
								</Button>

								<OperatorWishlist operation={{ type: "clear", unmount: true }}>
									<Button leftSection={<IconTrash size={16} stroke={2} />}>Clear Whishlist</Button>
								</OperatorWishlist>
							</Group>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<TableWishlist />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
