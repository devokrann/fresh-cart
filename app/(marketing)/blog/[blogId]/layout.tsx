import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import { linkify } from "@/handlers/parsers/string";

import { typeParams } from "../layout";

import getPosts from "@/handlers/database/getPosts";

export const generateMetadata = async ({ params }: { params: typeParams }): Promise<Metadata> => {
	const posts = await getPosts();

	return { title: posts.find(p => linkify(p.id) == params.blogId)?.title };
};

export default function LayoutPost({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
