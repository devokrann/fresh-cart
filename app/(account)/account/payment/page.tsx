import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";
import { Divider, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import FormUserAddresses from "@/partials/forms/user/Addresses";
import CardPaymentMain from "@/components/card/payment/Main";
import { typePaymentMethod, typePaymentType } from "@/types/payment";
import FormUserPayment from "@/partials/forms/user/Payment";
import getPaymentMethods from "@/handlers/database/getPaymentMethods";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Payment" };

export default async function Payment() {
	const session = await auth();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	const paymentMethods = session?.user.id ? await getPaymentMethods() : null;

	return (
		<LayoutPage>
			<LayoutSection>
				<Grid gutter={{ md: 48 }}>
					<GridCol span={12}>
						<Group>
							<Stack gap={0}>
								<Title order={2} fw={"bold"}>
									My Payment Methods
								</Title>
								<Text fz={"lg"}>You have {"5"} payment methods.</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<Grid>
							{paymentMethods?.map(method => (
								<GridCol key={method.id} span={{ base: 12, md: 6, lg: 4 }}>
									<CardPaymentMain data={method} />
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
									Add New Payment Method
								</Title>
								<Text fz={"lg"}>You have {"2"} payment methods.</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<FormUserPayment />
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
