import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import contact from "@/data/contact";

export interface typeParams {
	order: number;
}

export const metadata: Metadata = {
	title: { default: "Orders", template: `%s - Orders - Account - ${contact.name.app}` },
};

export default function LayoutOrders({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
