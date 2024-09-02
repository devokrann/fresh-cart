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
import link from "@/handlers/parsers/string/link";

export const metadata: Metadata = { title: "Help" };

export default async function Help() {
	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Grid>
					{help.links.map(item => (
						<GridCol key={item.title} span={{ base: 12, md: 6, lg: 4 }}>
							<Card
								padding={"xl"}
								h={"100%"}
								bg={"light-dark(var(--mantine-color-gray-0),transparent)"}
								style={{
									border: "1px solid light-dark(transparent,var(--mantine-color-default-border))",
								}}
								shadow="xs"
							>
								<Stack align="start" justify="space-between" h={"100%"}>
									<Stack>
										<Group gap={"xs"}>
											<item.icon size={24} stroke={1.5} />
											<Title order={3}>{item.title}</Title>
										</Group>

										<List listStyleType="none" size="sm" spacing={"xs"}>
											{item.desc.map(subitem => (
												<ListItem key={subitem}>
													<Anchor
														component={Link}
														href={`/help/${link.linkify(item.title)}/${link.linkify(
															subitem
														)}`}
														inherit
														c={"var(--mantine-color-text)"}
													>
														{subitem}
													</Anchor>
												</ListItem>
											))}
										</List>
									</Stack>

									<Button
										size="xs"
										variant="transparent"
										rightSection={<IconChevronRight size={16} stroke={1.5} />}
										component={Link}
										href={`/help/${link.linkify(item.title)}`}
										color="gray"
										px={0}
									>
										View all
									</Button>
								</Stack>
							</Card>
						</GridCol>
					))}
				</Grid>
			</LayoutSection>

			<LayoutSection margined containerized={"responsive"}>
				<Grid>
					<GridCol span={{ base: 12, md: 4 }}>
						<Stack gap={"xl"} align="start" pos={"sticky"} top={64}>
							<Stack gap={"xs"}>
								<Title order={2} fw={"bold"}>
									Popular FAQ&apos;s
								</Title>
								<Text maw={{ md: "90%", lg: "80%" }}>
									Still have unanswered questions and need to get in touch?
								</Text>
							</Stack>

							<Button size="md">Contact Us</Button>
						</Stack>
					</GridCol>
					<GridCol span={{ base: 12, md: 8 }}>
						<AccordionFaq data={faqs} />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
