import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import link from "@/handlers/parsers/string/link";
import products from "@/data/products";

export interface typeParams {
	product: string;
}

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	return { title: products.find(p => link.linkify(p.title) == params.product)?.title };
};

export default function ProductDetails({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
