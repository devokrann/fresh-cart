"use client";

import React from "react";

import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, Grid, GridCol, Image, Menu, MenuTarget, Stack, Text, Title } from "@mantine/core";

import { IconCategory } from "@tabler/icons-react";

import LayoutSection from "@/layouts/Section";

import links from "@/data/links";

import classes from "./Categories.module.scss";
import images from "@/assets/images";

export default function Categories() {
	const pathname = usePathname();

	return (
		<Menu
			shadow="xs"
			trigger="hover"
			position={"bottom-start"}
			openDelay={50}
			closeDelay={50}
			classNames={{
				dropdown: classes.dropdown,
				arrow: classes.arrow,
				divider: classes.divider,
				label: classes.label,
				item: classes.item,
				itemLabel: classes.itemLabel,
				itemSection: classes.itemSection,
			}}
		>
			<MenuTarget>
				<Button c="bg.0" leftSection={<IconCategory size={16} stroke={1.5} />}>
					All Departments
				</Button>
			</MenuTarget>

			<Menu.Dropdown>
				<LayoutSection containerized="responsive" px={0}>
					<Grid gutter={{ md: "md", lg: "xl" }} className={classes.dropdownGrid}>
						{links.menuMega.map(item => (
							<GridCol key={item.title} span={{ base: 12, sm: 6, md: 3 }}>
								<Stack gap={4}>
									<Title order={2} className={classes.columnTitle}>
										{item.title}
									</Title>

									<Stack gap={0}>
										{item.links.map(link => (
											<Menu.Item
												key={link.link}
												component={Link}
												href={link.link}
												className={`${classes.link} ${
													pathname == link.link ? classes.linkActive : ""
												}`}
											>
												{link.label}
											</Menu.Item>
										))}
									</Stack>
								</Stack>
							</GridCol>
						))}

						<GridCol span={{ base: 12, sm: 6, md: 3 }}>
							<Stack className={classes.imageContainer}>
								<Image
									src={images.menuBanner}
									alt="Menu Banner"
									radius={"md"}
									component={NextImage}
									width={1920}
									height={1080}
									loading="lazy"
								/>

								<Stack align="start" className={classes.overlay}>
									<Text
										fw={500}
										fz={{ sm: "xl", md: "md", lg: "xl" }}
										lh={1}
										w={{ sm: "66%", md: "75%", lg: "66%" }}
									>
										Don&apos;t miss this offer today.
									</Text>
									<Button color="black" size="xs">
										Shop Now
									</Button>
								</Stack>
							</Stack>
						</GridCol>
					</Grid>
				</LayoutSection>
			</Menu.Dropdown>
		</Menu>
	);
}
