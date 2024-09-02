import React from "react";

import {
	ActionIcon,
	Anchor,
	Avatar,
	Box,
	Center,
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

import classes from "./Auth.module.scss";
import { auth } from "@/auth";
import ProviderAuthSignIn from "@/providers/auth/signIn";
import MenuAvatar from "@/components/menus/Avatar";
import { IconHeart, IconUser } from "@tabler/icons-react";
import Link from "next/link";

export default async function Auth() {
	const session = await auth();

	// if (!session?.user) return null;

	return (
		<LayoutSection containerized="responsive" padded="xs" className={classes.header}>
			<Group justify="space-between">
				<BrandLandscape />
			</Group>
		</LayoutSection>
	);
}
