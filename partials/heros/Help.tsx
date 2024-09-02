import React from "react";

import { Metadata } from "next";

import {
	Anchor,
	Button,
	Card,
	Flex,
	Grid,
	GridCol,
	Group,
	List,
	ListItem,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";

import {
	IconChevronRight,
	IconGift,
	IconMail,
	IconPhone,
	IconShoppingBag,
	IconTruckDelivery,
	IconTruckReturn,
} from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";
import InputAutocompleteHelp from "@/components/inputs/autocomplete/Help";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";

import classes from "./Contact.module.scss";
import help from "@/data/help";
import Link from "next/link";
import faqs from "@/data/faqs";

export default function Help() {
	const data = [
		{
			icon: IconTruckDelivery,
			link: "#",
			label: "Track your order",
		},
		{
			icon: IconShoppingBag,
			link: "#",
			label: "Edit or cancel order",
		},
		{
			icon: IconTruckReturn,
			link: "#",
			label: "Returns & refunds",
		},
		{
			icon: IconGift,
			link: "#",
			label: "My bonus account",
		},
	];

	return (
		<LayoutSection margined containerized={"responsive"}>
			<Card bg={"light-dark(var(--mantine-color-pri-light),var(--mantine-color-gray-light))"}>
				<LayoutSection padded containerized={"sm"}>
					<Stack gap={40}>
						<Stack gap={"xl"}>
							<Title order={2} fw={"bold"} ta={"center"}>
								How Can We Help?
							</Title>

							<Stack w={{ md: "60%" }} mx={"auto"}>
								<InputAutocompleteHelp />
							</Stack>
						</Stack>

						<Group justify="space-between">
							{data.map(item => (
								<Anchor key={item.label} component={Link} href={"#"} c={"var(--mantine-color-text)"}>
									<Stack align="center">
										<ThemeIcon size={56} radius={"xl"} variant={"light"}>
											<item.icon size={24} stroke={1.5} />
										</ThemeIcon>
										<Text ta={"center"} inherit fz={"sm"}>
											{item.label}
										</Text>
									</Stack>
								</Anchor>
							))}
						</Group>
					</Stack>
				</LayoutSection>
			</Card>
		</LayoutSection>
	);
}
