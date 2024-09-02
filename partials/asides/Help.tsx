"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Anchor, Divider, NavLink, Stack, Title } from "@mantine/core";
import {
	IconBellRinging,
	IconChevronRight,
	IconCoins,
	IconHeart,
	IconHelpCircle,
	IconInfoCircle,
	IconLogout,
	IconMapPin,
	IconPackage,
	IconSettings,
	IconStar,
	IconUser,
} from "@tabler/icons-react";

import LayoutSection from "@/layouts/Section";

import { signOut } from "next-auth/react";
import { typeParams } from "@/app/(help)/help/[section]/layout";
import help from "@/data/help";
import link from "@/handlers/parsers/string/link";

export default function Help({ params }: { params: typeParams }) {
	const links = help.links.find(l => link.linkify(l.title) == params.section)?.desc;

	return (
		<LayoutSection pos={"sticky"} top={32}>
			<Stack gap={"lg"}>
				<Title order={2} fz={"xl"}>
					Articles in this Section
				</Title>

				<Stack gap={"xs"} align="start" fz={{ base: "xs", lg: "sm" }}>
					{links?.map(sublink => (
						<Anchor
							key={sublink}
							inherit
							c={"var(--mantine-color-text)"}
							component={Link}
							href={link.linkify(sublink)}
						>
							{sublink}
						</Anchor>
					))}
				</Stack>
			</Stack>
		</LayoutSection>
	);
}
