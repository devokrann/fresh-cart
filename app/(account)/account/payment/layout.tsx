import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import contact from "@/data/contact";

import ProviderUserPaymentMethods from "@/providers/Payment";

export const metadata: Metadata = { title: "Payment" };

export default function LayoutPayment({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody>
			<ProviderUserPaymentMethods>{children}</ProviderUserPaymentMethods>
		</LayoutBody>
	);
}
