import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import contact from "@/data/contact";

import ProviderAddresses from "@/providers/Addresses";
import ProviderPayment from "@/providers/Payment";

// export const metadata: Metadata = {
// 	title: { default: "Product", template: `%s - Products - Shop - ${contact.name.app}` },
// };

export default function Checkout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody>
			<ProviderPayment>
				<ProviderAddresses>{children}</ProviderAddresses>
			</ProviderPayment>
		</LayoutBody>
	);
}
