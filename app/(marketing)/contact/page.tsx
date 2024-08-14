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

export const metadata: Metadata = { title: "Contact" };

export default async function Contact() {
	return (
		<LayoutPage>
			{/* <TemplateEmailContact /> */}

			<LayoutSection padded containerized={"md"}>
				<Stack gap={"xl"}>
					<Stack>
						<Title order={2} fw={"bold"}>
							Retailer Inquiries
						</Title>
						<Text fz={"lg"}>
							This form is for retailer inquiries only. For all other customer or shopper support
							requests, please visit the links below this form.
						</Text>
					</Stack>

					<FormContact />
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
