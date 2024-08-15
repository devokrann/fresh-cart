import React from "react";

import {
	ActionIcon,
	Box,
	Card,
	Divider,
	Grid,
	GridCol,
	Group,
	Pagination,
	Select,
	Stack,
	Text,
	Title,
} from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import CardProductShopGrid from "@/components/card/product/shop/Grid";
import CardProductShopList from "@/components/card/product/shop/List";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";

import blog from "@/data/blog";
import products from "@/data/products";
import { IconGridDots, IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import stores from "@/data/stores";

export default function Shop() {
	return (
		<LayoutPage>
			<LayoutSection>Product</LayoutSection>
		</LayoutPage>
	);
}
