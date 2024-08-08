"use client";

import React from "react";

import { ActionIcon, Center, Drawer, Indicator, Skeleton, Stack, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

import classes from "./Wishlist.module.scss";

export default function Wishlist({ items }: { items?: any }) {
	const [opened, { open, close }] = useDisclosure(false);
	const mobile = useMediaQuery("(max-width: 36em)");
	const tablet = useMediaQuery("(max-width: 48em)");

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				size={mobile ? 240 : tablet ? 320 : 320}
				title={
					<Text component="span" inherit fw={500}>
						Wishlist
					</Text>
				}
				position="right"
				classNames={{
					content: classes.content,
					header: classes.header,
					inner: classes.inner,
					overlay: classes.overlay,
					root: classes.root,
					title: classes.title,
					close: classes.close,
				}}
			>
				{!items ? (
					<Stack align="center">
						<Text ta={"center"} mt={"xl"} className="textResponsive">
							Your wishlist is empty.
						</Text>
					</Stack>
				) : (
					`items`
				)}
			</Drawer>

			<Indicator
				disabled={!items}
				processing={true}
				size={tablet ? 8 : 10}
				color="sl.4"
				offset={4}
				onClick={open}
				label={
					items ? (
						<Text component="span" inherit fw={500} fz={10}>
							{items.length}
						</Text>
					) : undefined
				}
				className={classes.indicator}
			>
				<Stack align="center" gap={0} onClick={open} title="Wishlist" className={classes.link}>
					<ActionIcon
						variant="subtle"
						size={mobile ? 24 : tablet ? 28 : 32}
						classNames={{ root: classes.iconRoot }}
					>
						<Center>
							<IconHeart size={mobile ? 20 : tablet ? 24 : 24} />
						</Center>
					</ActionIcon>
					{/* <Text fz={"xs"} fw={"bold"}>
						Wishlist
					</Text> */}
				</Stack>
			</Indicator>
		</>
	);
}
