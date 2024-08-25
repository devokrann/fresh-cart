"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Burger, Drawer, NavLink } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import classes from "./Shop.module.scss";

import { typeCategories } from "@/types/categories";

export default function Shop({ data, ...restProps }: { data: typeCategories[] } & React.ComponentProps<typeof Burger>) {
	const [opened, { toggle, close }] = useDisclosure(false);
	const pathname = usePathname();
	const mobile = useMediaQuery("(max-width: 36em)");

	return data.map(link => {
		const subCategories =
			link.subCategories &&
			link.subCategories.map(subLink => (
				<NavLink
					key={subLink}
					label={subLink}
					classNames={{
						root: classes.root,
						label: classes.label,
						chevron: classes.chevron,
					}}
					// active={pathname == subLink}
					// onClick={() => close()}
				/>
			));

		return !subCategories ? (
			<NavLink
				key={link.title}
				label={link.title}
				classNames={{
					root: classes.root,
					label: classes.label,
					chevron: classes.chevron,
				}}
				// active={pathname == link}
				// onClick={() => close()}
			/>
		) : (
			<NavLink
				key={link.title}
				label={link.title}
				classNames={{
					root: classes.root,
					label: classes.label,
					chevron: classes.chevron,
				}}
				// active={pathname == link.link}
				// onClick={() => close()}
				// opened={link.subLinks?.find(sl => sl.link == pathname)?.link == pathname ? true : undefined}
			>
				{subCategories}
			</NavLink>
		);
	});
}
