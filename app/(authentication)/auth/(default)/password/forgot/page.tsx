import React from "react";

import NextImage from "next/image";
import { Metadata } from "next";
import Link from "next/link";

import { Anchor, Center, Flex, Grid, GridCol, Group, Image, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormAuthPasswordForgot from "@/partials/forms/auth/password/Forgot";
import AuthHeader from "@/partials/auth/Header";

import images from "@/assets/images";
import contact from "@/data/contact";

export const metadata: Metadata = { title: "Forgot Password" };

export default async function Forgot() {
	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid align="center">
					<GridCol span={{ base: 12, md: 6 }}>
						<LayoutSection containerized="xs">
							<Stack>
								<Image
									src={images.auth.forgotPassword}
									alt={"Forgot Password"}
									radius={"md"}
									component={NextImage}
									width={1920}
									height={1080}
									priority
								/>
							</Stack>
						</LayoutSection>
					</GridCol>
					<GridCol span={{ base: 12, md: 6 }}>
						<LayoutSection containerized="xs">
							<Stack gap={"xl"}>
								<AuthHeader
									data={{
										title: "Enter Your Email",
										desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate ut laoreet velit ma.",
									}}
								/>

								<FormAuthPasswordForgot />
							</Stack>
						</LayoutSection>
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
