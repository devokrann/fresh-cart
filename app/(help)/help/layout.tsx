import React from "react";

import LayoutBody from "@/layouts/Body";
import NavbarMain from "@/partials/navbars/Main";
import FooterMain from "@/partials/footers/Main";
import HeaderMain from "@/partials/headers/Main";
import HeroHelp from "@/partials/heros/Help";

import AffixTop from "@/components/affixi/Top";
import { Metadata } from "next";
import contact from "@/data/contact";

export const metadata: Metadata = {
	title: { default: "Help", template: `%s - Help - ${contact.name.app}` },
};

export default function LayoutHelp({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody header={<HeaderMain />} nav={<NavbarMain />} hero={<HeroHelp />} footer={<FooterMain />}>
			<main>{children}</main>

			<AffixTop />
		</LayoutBody>
	);
}
