import React from "react";

import LayoutBody from "@/layouts/Body";

import AsideShop from "@/partials/asides/Shop";

export interface typeParams {
	productId: string;
}

export default function LayoutCatalogue({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <LayoutBody aside={{ left: { component: <AsideShop /> }, gap: 64 }}>{children}</LayoutBody>;
}
