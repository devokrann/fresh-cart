import React from "react";

import { Stack } from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import NavShop from "@/components/navigation/Shop";

import categories from "@/data/categories";

export default function Shop() {
	return (
		<LayoutSection padded>
			<Stack>
				<Stack gap={0}>
					<NavShop data={categories.products} />
				</Stack>

				<div>more</div>
			</Stack>
		</LayoutSection>
	);
}
