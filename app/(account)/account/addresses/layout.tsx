import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import ProviderUserAddresses from "@/providers/Addresses";

export const metadata: Metadata = { title: "Address" };

export default function LayoutAddress({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody>
			<ProviderUserAddresses>{children}</ProviderUserAddresses>
		</LayoutBody>
	);
}
