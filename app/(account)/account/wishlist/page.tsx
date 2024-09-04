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

import { IconMail, IconPhone, IconTrash } from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";
import TableWishlist from "@/components/tables/Wishlist";

import OperatorWishlist from "@/components/operators/Wishlist";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Wishlist" };

export default async function Wishlist() {
	const session = await auth();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	return (
		<LayoutPage>
			<LayoutSection>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group align="start" justify="space-between">
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									My Wishlist
								</Title>
								<Text inherit>There are {"5"} products in your wishlist.</Text>
							</Stack>

							<OperatorWishlist operation={{ type: "clear", unmount: true }}>
								<Button leftSection={<IconTrash size={16} stroke={2} />}>Clear Whishlist</Button>
							</OperatorWishlist>
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
