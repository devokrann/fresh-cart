import React from "react";

import { Anchor, Avatar, Divider, Flex, Grid, GridCol, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import FormUserProfileDetails from "@/partials/forms/user/profile/Details";
import FormUserAccountPassword from "@/partials/forms/user/settings/Password";
import ModalDeleteAccount from "@/components/modal/delete/Account";

import initialize from "@/handlers/parsers/string/initialize";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Profile" };

export default async function Profile() {
	const session = await auth();

	!session && redirect("/");

	return (
		<LayoutPage stacked>
			<LayoutSection>
				<Grid>
					<GridCol span={{ base: 12 }}>
						<Title order={2} fz={"xl"}>
							Personal Details
						</Title>
					</GridCol>

					<GridCol span={{ base: 12, md: 8, lg: 5.5 }}>
						<FormUserProfileDetails />
					</GridCol>
				</Grid>
			</LayoutSection>

			<Divider />

			<LayoutSection>
				<Grid gutter={"xl"}>
					<GridCol span={{ base: 12, md: 8, lg: 5.5 }}>
						<Stack gap={"lg"}>
							<Title order={2} fz={"xl"}>
								Update Password
							</Title>
							<FormUserAccountPassword />
						</Stack>
					</GridCol>
				</Grid>
			</LayoutSection>

			<Divider />

			<LayoutSection>
				<Stack gap={"lg"} align="start">
					<Title order={2} fz={"xl"}>
						Delete Account
					</Title>
					<Stack gap={"xs"}>
						<Text>This account contains {"12"} orders.</Text>

						<Text>
							Deleting your account will permanently remove all data associated with it. When you delete
							your account, your public profile will be deactivated immediately. If you change your mind
							before the 14 days are up, sign in with your email and password, and we&apos;ll send you a
							link to reactivate your account.
						</Text>
					</Stack>
					<ModalDeleteAccount />
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
