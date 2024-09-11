"use client";

import React, { useContext, useEffect } from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";
import { Center, Divider, Grid, GridCol, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import CardPaymentMain from "@/components/card/payment/Main";
import { typePaymentMethod, typePaymentType } from "@/types/payment";
import FormUserPayment from "@/partials/forms/user/Payment";

import { redirect } from "next/navigation";
import NotificationEmpty from "@/components/notification/Empty";
import { useSession } from "next-auth/react";

import PaymentMethods from "@/contexts/Payment";

export default function Payment() {
	const { data: session } = useSession();

	!session && redirect(process.env.NEXT_PUBLIC_SIGN_IN_URL!);

	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

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
									My Payment Methods
								</Title>
								<Text fz={"lg"}>You have {"5"} payment methods.</Text>
							</Stack>
						</Group>
					</GridCol>

					<GridCol span={12}>
						<Grid>
							{!paymentMethods ? (
								skeletons.map(i => (
									<GridCol key={i.key} span={{ md: 4 }}>
										{i.element}
									</GridCol>
								))
							) : paymentMethods.length! > 0 ? (
								paymentMethods?.map(method => (
									<GridCol key={method.id} span={{ base: 12, md: 6, lg: 4 }}>
										<CardPaymentMain data={method} />
									</GridCol>
								))
							) : (
								<GridCol span={12}>
									<Center>
										<NotificationEmpty label="No payment methods" />
									</Center>
								</GridCol>
							)}
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
