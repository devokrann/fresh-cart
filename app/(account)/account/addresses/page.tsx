"use client";

import React, { useContext } from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Divider, Grid, GridCol, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import FormUserAddresses from "@/partials/forms/user/Addresses";
import CardAddressMain from "@/components/card/address/Main";
import { redirect } from "next/navigation";

import ContextUserAddresses from "@/contexts/Addresses";
import { useSession } from "next-auth/react";

export default function Addresses() {
	const { data: session } = useSession();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const skeletons = [
		{ key: 1, element: <Skeleton h={360} /> },
		{ key: 2, element: <Skeleton h={360} /> },
		{ key: 3, element: <Skeleton h={360} /> },
	];

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
								{!addresses ? (
									<Skeleton h={16} w={{ md: 240 }} mt={"xs"} />
								) : (
									<Text fz={"lg"}>You have {addresses.length} addresses.</Text>
								)}
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<Grid>
							{!addresses
								? skeletons.map(i => (
										<GridCol key={i.key} span={{ md: 4 }}>
											{i.element}
										</GridCol>
								  ))
								: addresses.map(address => (
										<GridCol key={address.id} span={{ base: 12, md: 6, lg: 4 }}>
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
						<FormUserAddresses mode="add" type="billing" />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
