import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import link from "@/handlers/parsers/string/link";
import orders from "@/data/orders";

export interface typeParams {
	order: string;
}

export const generateMetadata = ({ params }: { params: typeParams }): Metadata => {
	return { title: `#${orders.find(order => order.id == params.order)?.id}` };
};

export default function ProductDetails({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
