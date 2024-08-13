import React from "react";

import { Group, Container } from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import DrawerNavMain from "@/components/drawers/nav/Main";
import NavigationMain from "@/components/navigation/Main";

import links from "@/data/links";

import classes from "./Main.module.scss";

export default async function Main() {
	return (
		<LayoutSection className={classes.navbar} visibleFrom="sm">
			<Container size={"responsive"}>
				<NavigationMain />
			</Container>
		</LayoutSection>
	);
}
