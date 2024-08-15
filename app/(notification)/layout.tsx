import React from "react";

import LayoutBody from "@/layouts/Body";
import { Center } from "@mantine/core";
import { Metadata } from "next";
import contact from "@/data/contact";

export const metadata: Metadata = {
	title: { default: "Notification", template: `%s - Notification - ${contact.name.app}` },
};

export default function LayoutNotification({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody>
			<Center component="main" mih={"100vh"}>
				{children}
			</Center>
		</LayoutBody>
	);
}
