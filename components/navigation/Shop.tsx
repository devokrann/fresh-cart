"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { Burger, Drawer, NavLink, Skeleton, Stack } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import classes from "./Shop.module.scss";

import { typeProductCategory } from "@/types/categories";
import getCategories from "@/handlers/database/getCategories";

export default function Shop({ ...restProps }: {} & React.ComponentProps<typeof Burger>) {
	const [data, setData] = useState<typeProductCategory[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setData(await getCategories());
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const [opened, { toggle, close }] = useDisclosure(false);
	const pathname = usePathname();
	const mobile = useMediaQuery("(max-width: 36em)");

	const skeletons = [
		{
			id: "1",
			element: <Skeleton h={32} w={"100%"} />,
		},
		{
			id: "2",
			element: <Skeleton h={32} w={"100%"} />,
		},
		{
			id: "3",
			element: <Skeleton h={32} w={"100%"} />,
		},
		{
			id: "4",
			element: <Skeleton h={32} w={"100%"} />,
		},
		{
			id: "5",
			element: <Skeleton h={32} w={"100%"} />,
		},
	];

	return loading ? (
		<Stack gap={4}>{skeletons.map(s => s.element)}</Stack>
	) : (
		data?.map(link => {
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
		})
	);
}
