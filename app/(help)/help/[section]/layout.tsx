import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import contact from "@/data/contact";
import help from "@/data/help";
import link from "@/handlers/parsers/string/link";

export interface typeParams {
	section: string;
	article: string;
}

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	const section = help.links.find(l => link.linkify(l.title) == params.section)?.title;

	return {
		title: {
			default: `${section}`,
			template: `%s - ${section} - Help - ${contact.name.app}`,
		},
	};
};

export default function LayoutSection({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
