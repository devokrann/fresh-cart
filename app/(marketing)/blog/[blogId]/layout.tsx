import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import link from "@/handlers/parsers/string/link";

import posts from "@/data/posts";

import { typeParams } from "../layout";

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	return { title: posts.find(p => link.linkify(p.id) == params.blogId)?.title };
};

export default function LayoutPost({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
