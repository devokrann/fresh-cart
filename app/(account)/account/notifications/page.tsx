import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Notifications" };

export default async function Notifications() {
	return (
		<LayoutPage>
			<LayoutSection>
				Notifications page
			</LayoutSection>
		</LayoutPage>
	);
}
