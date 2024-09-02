import React from "react";

import { Burger, NavLink } from "@mantine/core";

import classes from "./Shop.module.scss";

import { typeProductParentCategory } from "@/types/categories";

export default function Shop({ data }: { data: typeProductParentCategory[] } & React.ComponentProps<typeof Burger>) {
	return data?.map(link => {
		const subCategories =
			link.subCategories &&
			link.subCategories.map(subLink => (
				<NavLink
					key={subLink.id}
					label={subLink.title}
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
