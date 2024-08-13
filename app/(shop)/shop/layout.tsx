import React from "react";

import { Metadata } from "next";

import LayoutBody from "@/layouts/Body";

import link from "@/handlers/parsers/string/link";
import AsideShop from "@/partials/asides/Shop";

import posts from "@/data/blog";

export interface typeParams {
	productId: string;
}

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	return { title: posts.find(p => link.linkify(p.title) == params.productId)?.title };
};

export default function LayoutShop({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody aside={{ left: { component: <AsideShop /> }, gap: 64 }}>{children}</LayoutBody>;
}
