import React from "react";

import { Avatar, Box, Grid, GridCol, Group, Skeleton } from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import DrawerCart from "@/components/drawers/Cart";
import DrawerWishlist from "@/components/drawers/Wishlist";
import FormSearchMain from "../forms/search/Main";
import DrawerNavMain from "@/components/drawers/nav/Main";
import BrandLandscape from "../brand/Landscape";

import links from "@/data/links";

import classes from "./Main.module.scss";
import { auth } from "@/auth";
import ProviderAuthSignIn from "@/providers/auth/signIn";
import MenuAvatar from "@/components/menus/Avatar";

export default async function Main() {
	const session = await auth();

	// if (!session?.user) return null;

	return (
		<LayoutSection containerized="responsive" padded="xs" className={classes.header}>
			<Grid align="center">
				<GridCol span={{ base: 3 }}>
					<Box visibleFrom="sm" w={"fit-content"}>
						<BrandLandscape />
					</Box>

					<DrawerNavMain data={links.navbar} hiddenFrom="sm" aria-label="Toggle Navigation" />
				</GridCol>

				<GridCol span={{ sm: 6, md: 6 }} visibleFrom="sm">
					<FormSearchMain />
				</GridCol>

				<GridCol span={{ base: 9, sm: 3 }}>
					<Group justify="end">
						<Group gap={"xs"}>
							<DrawerWishlist />
							<DrawerCart />
						</Group>

						{!session?.user ? (
							<ProviderAuthSignIn>
								<Avatar size={32} color="pl" title="Sign In" style={{ cursor: "pointer" }} />
							</ProviderAuthSignIn>
						) : (
							<MenuAvatar />
						)}
					</Group>
				</GridCol>
			</Grid>
		</LayoutSection>
	);
}
