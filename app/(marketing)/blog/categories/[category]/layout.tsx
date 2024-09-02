import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import link from "@/handlers/parsers/string/link";

import { typeParams } from "../layout";

import getPostCategories from "@/handlers/database/getPostCategories";

export const generateMetadata = async ({ params }: { params: typeParams }): Promise<Metadata> => {
	const postCategories = await getPostCategories();

	return { title: postCategories.find(c => link.linkify(c.id) == params.id)?.title };
};

export default function LayoutPost({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
