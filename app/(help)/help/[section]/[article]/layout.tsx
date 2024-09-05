import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";
import AsideHelp from "@/partials/asides/Help";
import SectionHelp from "@/partials/sections/Help";

import { linkify } from "@/handlers/parsers/string";

import help from "@/data/help";

import { typeParams } from "../layout";

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	const section = help.links.find(l => linkify(l.title) == params.section);
	const article = section?.desc.find(a => linkify(a) == params.article);

	return { title: article };
};

export default function LayoutArticle({
	children, // will be a page or nested layout
	params,
}: {
	children: React.ReactNode;
	params: typeParams;
}) {
	return (
		<LayoutBody
			margined
			aside={{ gap: 96, right: { component: <AsideHelp params={params} />, width: { md: 33 } } }}
		>
			{children}

			<SectionHelp />
		</LayoutBody>
	);
}
