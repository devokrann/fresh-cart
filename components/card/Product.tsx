import React from "react";

import NextImage from "next/image";
import Link from "next/link";

import {
	Title,
	Image,
	Card,
	CardSection,
	Stack,
	Text,
	Anchor,
	Group,
	Rating,
	Button,
	Badge,
	ActionIcon,
	Tooltip,
} from "@mantine/core";

import { IconEye, IconHeart, IconPlus, IconShoppingCart } from "@tabler/icons-react";

import ModalProduct from "../modal/Product";

import link from "@/handlers/parsers/string/link";
import getFraction from "@/handlers/fraction";

import classes from "./Product.module.scss";

import { typeProduct } from "@/types/product";

export default function Product({ data }: { data: typeProduct }) {
	const icons = [
		{ title: "Add to Wishlist", icon: IconHeart },
		{ title: "Add to Cart", icon: IconShoppingCart },
	];

	return (
		<Card className={classes.card}>
			<Stack>
				<CardSection pos={"relative"}>
					<Stack p={"xl"}>
						<Image
							src={data.image}
							alt={data.title}
							w={"100%"}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>

					<Stack className={classes.overlay}>
						{data.badge && (
							<Badge color={`${data.badge.color}.9`} radius={"md"} c={"bg.0"}>
								{data.badge.label}
							</Badge>
						)}

						<Group justify="center" className={classes.buttonGroup}>
							<ModalProduct data={data} />

							{icons.map(icon => (
								<Tooltip key={icon.title} label={icon.title} withArrow fz={"sm"}>
									<ActionIcon size={32} c={"bg.0"}>
										<icon.icon size={20} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
							))}
						</Group>
					</Stack>
				</CardSection>

				<Stack gap={"xs"}>
					<Stack gap={4}>
						<Text fz={"sm"} c={"dimmed"}>
							{data.category}
						</Text>
						<Anchor
							underline="never"
							component={Link}
							href={`/blog/${link.linkify(data.title)}`}
							className={classes.link}
						>
							<Title order={3} fz={"md"} fw={"bold"}>
								{data.title}
							</Title>
						</Anchor>
					</Stack>

					<Group gap={4} fz={"xs"} c={"dimmed"}>
						<Rating value={data.rating.value} fractions={getFraction(data.rating.value)} readOnly />
						<Text inherit lh={0.5}>
							{data.rating.value}
						</Text>
						<Text inherit lh={0.5}>
							({data.rating.raters})
						</Text>
					</Group>
				</Stack>

				<Group justify="space-between" mt={"xs"}>
					<Group gap={4}>
						<Text inherit lh={0.5}>
							${data.price.present}
						</Text>
						{data.price.former && (
							<Text inherit lh={0.5} c={"dimmed"} td={"line-through"}>
								${data.price.former}
							</Text>
						)}
					</Group>

					<Button size="xs" color="sl.4" c={"bg.0"} leftSection={<IconPlus size={16} stroke={1.5} />}>
						Add
					</Button>
				</Group>
			</Stack>
		</Card>
	);
}
