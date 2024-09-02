import React from "react";

import NextImage from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Anchor, Box, Center, Flex, Grid, GridCol, Group, Image, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormAuthSignIn from "@/partials/forms/auth/SignIn";

import AuthHeader from "@/partials/auth/Header";

import images from "@/assets/images";
import contact from "@/data/contact";

import { auth } from "@/auth";

export const metadata: Metadata = { title: "Sign In" };

export default async function SignIn() {
	const session = await auth();

	session && redirect("/");

	return (
		<LayoutPage>
			<LayoutSection padded containerized={"responsive"}>
				<Grid align="center">
					<GridCol span={{ base: 12, md: 6 }}>
						<LayoutSection containerized="xs">
							<Stack>
								<Image
									src={images.auth.signin}
									alt={"Sign In"}
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
										title: "Welcome Back!",
										desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate ut laoreet velit ma.",
									}}
								/>

								<FormAuthSignIn />
							</Stack>
						</LayoutSection>
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
