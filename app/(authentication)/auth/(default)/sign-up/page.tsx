import React from "react";

import { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Anchor, Box, Center, Flex, Grid, GridCol, Group, Image, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormAuthSignUp from "@/partials/forms/auth/SignUp";

import images from "@/assets/images";
import contact from "@/data/contact";

import { auth } from "@/auth";

// import TemplateEmailCodeSignUp from "@/templates/email/code/SignUp";

export const metadata: Metadata = {
	title: "Sign Up",
};

export default async function SignUp() {
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
									src={images.auth.signup}
									alt={"Sign Up"}
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
							<FormAuthSignUp />
						</LayoutSection>
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
