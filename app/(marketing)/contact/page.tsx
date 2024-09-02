import React from "react";

import LoaderMain from "@/partials/loaders/Main";

import { Metadata } from "next";

import NextImage from "next/image";

import {
	Anchor,
	Button,
	Card,
	CardSection,
	Divider,
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

import { IconClock, IconMail, IconPhone, IconPhoneCall } from "@tabler/icons-react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormContact from "@/partials/forms/Contact";
import AccordionFaq from "@/components/accordions/Faq";

import TemplateEmailContact from "@/templates/email/Contact";

import contact from "@/data/contact";

import classes from "./Contact.module.scss";
import images from "@/assets/images";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact() {
	const data = [
		{
			icon: IconPhoneCall,
			title: "Call us directly",
			desc: contact.phones.map(p => {
				return { link: `tel:${p.value}`, value: p.value };
			}),
		},
		{
			icon: IconMail,
			title: "Send a message",
			desc: contact.emails.map(p => {
				return { link: `mailto:${p.value}`, value: p.value };
			}),
		},
		{
			icon: IconMail,
			title: "Store Location",
			desc: contact.locations.map(p => {
				return { link: `${p.value}`, value: p.value };
			}),
		},
		{
			icon: IconClock,
			title: "Working Hours",
			desc: contact.hours.map(p => {
				return { link: `${p.value}`, value: p.value };
			}),
		},
	];

	return (
		<LayoutPage>
			<LayoutSection margined containerized={"responsive"}>
				<Stack gap={40}>
					<Grid>
						{data.map(item => (
							<GridCol key={item.title} span={{ base: 12, md: 3 }}>
								<Card h={"100%"} bg={"transparent"}>
									<Stack align="center">
										<ThemeIcon size={40} variant="light">
											<item.icon size={24} stroke={1.5} />
										</ThemeIcon>

										<Title order={3} ta={"center"} fz={"lg"}>
											{item.title}
										</Title>

										<Stack gap={0} maw={{ lg: "70%" }}>
											{item.desc.map(subItem => (
												<Anchor key={subItem.link} href={subItem.link} inherit ta={"center"}>
													{subItem.value}
												</Anchor>
											))}
										</Stack>
									</Stack>
								</Card>
							</GridCol>
						))}
					</Grid>

					<Divider />

					<Stack gap={"lg"} align="center" py={"md"}>
						<Stack>
							<Title order={2} ta={"center"} fz={36} lh={1}>
								Looking for support?
							</Title>

							<Text ta={"center"}>
								We might already have what you&apos;re looking for. See our FAQs or head to our
								dedicated Help Center.
							</Text>
						</Stack>

						<Button size="lg">Help Center</Button>
					</Stack>
				</Stack>
			</LayoutSection>

			<LayoutSection margined containerized={"responsive"}>
				<Card
					withBorder
					padding={0}
					bg={"transparent"}
					shadow="xs"
					style={{ borderColor: "var(--mantine-color-default-border)" }}
				>
					<Grid align="stretch">
						<GridCol span={{ base: 12, md: 6 }}>
							<Stack gap={"xl"} p={"xl"}>
								<Stack>
									<Title order={2} fw={"bold"} ta={"center"}>
										Contact our Specialists
									</Title>
									<Text fz={"lg"} ta={"center"}>
										Fill out the form below and we will reply within 24 hours. You may also directly
										reach out to us at info@cartzilla.com
									</Text>
								</Stack>

								<FormContact />
							</Stack>
						</GridCol>

						<GridCol span={{ base: 12, md: 6 }}>
							<Group h={"100%"}>
								<Image
									src={images.about}
									alt="About Image"
									component={NextImage}
									width={1920}
									height={1080}
									priority
									h={"100%"}
								/>
							</Group>
						</GridCol>
					</Grid>
				</Card>
			</LayoutSection>
		</LayoutPage>
	);
}
