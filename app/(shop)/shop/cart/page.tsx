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

import OperatorCart from "@/components/operators/Cart";

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
								<Text inherit>There are {"5"} products in your cart.</Text>
							</Stack>

							<Group gap={"xs"}>
								<OperatorCart operation={{ type: "clear", unmount: true }}>
									<Button
										variant="outline"
										color="green.6"
										leftSection={<IconTrash size={16} stroke={2} />}
									>
										Clear Cart
									</Button>
								</OperatorCart>

								<Button color="black" leftSection={<IconRefresh size={16} stroke={2} />}>
									Update Cart
								</Button>
							</Group>
						</Group>
					</GridCol>

					<GridCol span={{ md: 8, lg: 8.5 }}>
						<Stack>
							<TableCart />

							<Group justify="space-between">
								<Button
									component={Link}
									href={"/shop"}
									variant="outline"
									color={"pri.6"}
									leftSection={<IconChevronLeft size={16} stroke={2} />}
								>
									Continue Shopping
								</Button>

								<Button
									component={Link}
									href={"/shop/checkout"}
									rightSection={<IconChevronRight size={16} stroke={2} />}
								>
									Proceed to Checkout
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
