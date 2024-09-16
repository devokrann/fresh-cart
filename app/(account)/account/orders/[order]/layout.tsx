import React from "react";

import LayoutBody from "@/layouts/Body";
import { Metadata } from "next";
import { getOrders } from "@/handlers/requests/database/orders";
import { prependZeros } from "@/handlers/parsers/number";

export interface typeParams {
	order: number;
}

export const generateMetadata = async ({ params }: { params: typeParams }): Promise<Metadata> => {
	const orders = await getOrders();

	const order = orders.find(order => order.id == params.order);

	return { title: `#${prependZeros(5, order?.id!)}` };
};

export default function ProductDetails({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody>{children}</LayoutBody>;
}
