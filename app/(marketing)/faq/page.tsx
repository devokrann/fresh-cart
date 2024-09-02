import React from "react";

import { Metadata } from "next";

import { Anchor, Card, Flex, Grid, GridCol, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";

import { IconMail, IconPhone } from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";

import classes from "./Contact.module.scss";

export const metadata: Metadata = { title: "FAQ's" };

export default async function Faq() {
	const data = [
		{
			title: "Orders",
			desc: [
				{
					label: "Bring of had which their whose you're it own?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Over shall air can't subdue fly divide him?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Waters one you'll creeping?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Fowl, given morning seed fruitful kind beast be?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
			],
		},
		{
			title: "Shipping & Returns",
			desc: [
				{
					label: "Seas their gathered fruitful whose rule darkness?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Evening earth replenish land that his place?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "His in fowl morning to upon?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Divide called which created was?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
			],
		},
		{
			title: "Payment",
			desc: [
				{
					label: "Above beginning won't over?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Good gathering image called, fifth good?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Fly beast days dominion firmament?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
				{
					label: "Fowl, given morning seed fruitful kind beast be?",
					item: "Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule creepeth own lesser years itself so seed fifth for grass.",
				},
			],
		},
	];

	return (
		<LayoutPage>
			<LayoutSection padded containerized={"md"}>
				<Stack gap={64}>
					<Stack>
						<Title order={2} fw={"bold"}>
							Frequently Asked Questions
						</Title>
						<Text fz={"lg"}>
							This form is for retailer inquiries only. For all other customer or shopper support
							requests, please visit the links below this form.
						</Text>
					</Stack>

					<Stack gap={48}>
						{data.map(item => (
							<Stack key={item.title}>
								<Title order={3} fz={"xl"}>
									{item.title}:
								</Title>
								<AccordionFaq data={item.desc} />
							</Stack>
						))}
					</Stack>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
