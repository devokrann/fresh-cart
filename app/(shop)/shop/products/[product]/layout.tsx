import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import { linkify } from "@/handlers/parsers/string";
import getProducts from "@/handlers/database/getProducts";

export interface typeParams {
	product: string;
}

export const generateMetadata = async ({ params }: { params: typeParams }): Promise<Metadata> => {
	const products = await getProducts();

	return { title: products.find(p => linkify(p.title) == params.product)?.title };
};

export default function ProductDetails({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
