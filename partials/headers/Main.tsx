import React from "react";

import {
	ActionIcon,
	Avatar,
	Box,
	Center,
	Divider,
	Grid,
	GridCol,
	Group,
	Indicator,
	Skeleton,
	Text,
} from "@mantine/core";

import LayoutSection from "@/layouts/Section";
import DrawerCart from "@/components/drawers/Cart";
import FormSearchMain from "../forms/search/Main";
import DrawerNavMain from "@/components/drawers/nav/Main";
import BrandLandscape from "../brand/Landscape";

import links from "@/data/links";

import SwitchTheme from "@/components/switches/Theme";

import classes from "./Main.module.scss";
import { auth } from "@/auth";
import ProviderAuthSignIn from "@/components/auth/signIn";
import MenuAvatar from "@/components/menus/Avatar";
import { IconHeart, IconUser } from "@tabler/icons-react";
import IndicatorWishlist from "@/components/indicators/Wishlist";

import Link from "next/link";

export default async function Main() {
	const session = await auth();

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
							<SwitchTheme />

							<Divider orientation="vertical" />

							<Group gap={"xs"}>
								<IndicatorWishlist>
									<Center>
										<ActionIcon
											variant="transparent"
											component={Link}
											href={!session ? "/shop/wishlist" : "/account/wishlist"}
											color="gray"
										>
											<Center>
												<IconHeart size={24} stroke={1} />
											</Center>
										</ActionIcon>
									</Center>
								</IndicatorWishlist>

								<DrawerCart />

								{!session?.user ? (
									<ProviderAuthSignIn>
										<ActionIcon variant="transparent" color="gray">
											<Center>
												<IconUser size={24} stroke={1} />
											</Center>
										</ActionIcon>
									</ProviderAuthSignIn>
								) : (
									<MenuAvatar />
								)}
							</Group>
						</Group>
					</Group>
				</GridCol>
			</Grid>
		</LayoutSection>
	);
}
