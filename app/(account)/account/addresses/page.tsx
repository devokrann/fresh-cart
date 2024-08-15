import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Addresses" };

export default async function Addresses() {
	return (
		<LayoutPage>
			<LayoutSection>Shipping addresses page</LayoutSection>
		</LayoutPage>
	);
}
