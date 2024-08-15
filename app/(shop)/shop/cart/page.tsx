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

import { IconArrowRight, IconChevronLeft, IconMail, IconPhone, IconRefresh, IconTrash } from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";
import TableCart from "@/components/tables/Cart";
import CardShopCart from "@/components/card/shop/Cart";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";
import Link from "next/link";

export const metadata: Metadata = { title: "Cart" };

export default async function Cart() {
	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group align="start" justify="space-between">
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									My Cart
								</Title>
								<Text fz={"lg"}>There are {"5"} products in your cart.</Text>
							</Stack>

							<ButtonGroup>
								<Button variant="outline" leftSection={<IconTrash size={16} stroke={2} />}>
									Clear Cart
								</Button>
								<Button rightSection={<IconArrowRight size={16} stroke={2} />}>Checkout</Button>
							</ButtonGroup>
						</Group>
					</GridCol>

					<GridCol span={{ md: 8, lg: 8.5 }}>
						<Stack>
							<TableCart />

							<Group justify="space-between">
								<Button
									component={Link}
									href={"/shop"}
									leftSection={<IconChevronLeft size={16} stroke={2} />}
								>
									Continue Shopping
								</Button>
								<Button color="black" leftSection={<IconRefresh size={16} stroke={2} />}>
									Update Cart
								</Button>
							</Group>
						</Stack>
					</GridCol>

					<GridCol span={{ md: 4, lg: 3.5 }}>
						<CardShopCart />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
