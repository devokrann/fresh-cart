import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";

import { Center, Divider, Grid, GridCol, Stack, Text, Title } from "@mantine/core";

import FurmUserNotifications from "@/partials/forms/user/Notifications";
import FormUserAccountPassword from "@/partials/forms/user/settings/Password";
import ModalDeleteAccount from "@/components/modal/delete/Account";

export const metadata: Metadata = { title: "Notifications" };

export default async function Notifications() {
	return (
		<LayoutPage stacked>
			<LayoutSection>
				<Grid gutter={"xl"}>
					<GridCol span={{ base: 12 }}>
						<Stack gap={"xl"}>
							<Title order={2} fw={"bold"}>
								Notification Settings
							</Title>
							<FurmUserNotifications />
						</Stack>
					</GridCol>
				</Grid>
			</LayoutSection>
		</LayoutPage>
	);
}
