"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Anchor, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import MenuNavbar from "../menus/Navbar";
import MenuCategories from "../menus/Categories";

import links from "@/data/links";

import { typeMenu } from "@/types/components/menu";

import classes from "./Main.module.scss";

export default function Main() {
	const pathname = usePathname();

	const dataLinks: typeMenu[] = links.navbar;

	return (
		<Group gap={"xs"} component={"nav"}>
			<MenuCategories />

			{dataLinks.map(link => (
				<MenuNavbar key={link.link} subLinks={link.subLinks}>
					{!link.subLinks ? (
						<Anchor
							underline="never"
							component={Link}
							href={link.link}
							className={`${classes.link} ${pathname == link.link ? classes.linkActive : ""}`}
						>
							{link.label}
						</Anchor>
					) : (
						<Anchor
							underline="never"
							component={Link}
							href={link.link}
							className={`${classes.link} ${
								pathname == link.link || link.subLinks.find(l => l.link == pathname)
									? classes.linkActive
									: ""
							}`}
							onClick={e => e.preventDefault()}
						>
							<Group gap={4}>
								<span>{link.label}</span>
								<IconChevronDown size={16} stroke={1.5} />
							</Group>
						</Anchor>
					)}
				</MenuNavbar>
			))}
		</Group>
	);
}
