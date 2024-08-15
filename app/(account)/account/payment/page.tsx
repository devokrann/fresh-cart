import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Payment" };

export default async function Payment() {
	return (
		<LayoutPage>
			<LayoutSection>Payment details page</LayoutSection>
		</LayoutPage>
	);
}
