import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";
import { Divider, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import FormUserAddresses from "@/partials/forms/user/Addresses";
import CardAddressMain from "@/components/card/address/Main";
import getAddresses from "@/handlers/database/getAddresses";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Addresses" };

export default async function Addresses() {
	const session = await auth();

	!session && redirect("/");

	const addresses = session?.user.id ? await getAddresses(session.user.id) : null;

	return (
		<LayoutPage>
			<LayoutSection>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group>
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									My Addresses
								</Title>
								<Text fz={"lg"}>You have {"2"} addresses.</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<Grid>
							{addresses?.map(address => (
								<GridCol key={address.lname} span={{ base: 12, md: 6, lg: 4 }}>
									<CardAddressMain data={address} />
								</GridCol>
							))}
						</Grid>
					</GridCol>

					<GridCol span={12}>
						<Divider />
					</GridCol>

					<GridCol span={12}>
						<Group>
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									Add New Address
								</Title>
								<Text fz={"lg"}>You have {"2"} addresses.</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<FormUserAddresses />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
