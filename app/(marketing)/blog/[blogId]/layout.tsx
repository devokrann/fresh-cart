import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import link from "@/handlers/parsers/string/link";

import { typeParams } from "../layout";

import getPosts from "@/handlers/database/getPosts";

export const generateMetadata = async ({ params }: { params: typeParams }): Promise<Metadata> => {
	const posts = await getPosts();

	return { title: posts.find(p => link.linkify(p.id) == params.blogId)?.title };
};

export default function LayoutPost({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
