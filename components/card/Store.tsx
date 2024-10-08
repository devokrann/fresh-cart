import React from "react";

import NextImage from "next/image";
import Link from "next/link";

import { Anchor, Badge, Card, Grid, GridCol, Group, Image, Stack, Text, Title } from "@mantine/core";

import { linkify } from "@/handlers/parsers/string";

import classes from "./Store.module.scss";

import { typeStore } from "@/types/store";
import { IconPointFilled } from "@tabler/icons-react";

export default function Store({ data }: { data: typeStore }) {
	return (
		<Card className={classes.card}>
			<Grid>
				<GridCol span={{ base: 12, xs: 2, sm: 2.5 }}>
					<Stack>
						<Image
							src={data.image}
							alt={data.title}
							w={48}
							radius={"md"}
							component={NextImage}
							width={1920}
							height={1080}
							priority
						/>
					</Stack>
				</GridCol>
				<GridCol span={{ base: 12, xs: 10, sm: 9.5 }}>
					<Stack>
						<Stack gap={0} align="start">
							<Anchor
								underline="never"
								component={Link}
								href={`#/stores/${linkify(data.title)}`}
								className={classes.link}
							>
								<Title order={3} fz={"xl"}>
									{data.title}
								</Title>
							</Anchor>
							<Group gap={4} c={"dimmed"}>
								{data.goods}
							</Group>
						</Stack>

						<Stack gap={0} c={"dimmed"} fz={"sm"} fw={500}>
							<Text inherit c={data.deliveryTime ? "pri" : undefined}>
								Delivery{data.deliveryTime && ` by ${data.deliveryTime}`}
							</Text>
							<Text inherit>Pickup Available</Text>
						</Stack>

						<Badge radius={"md"} tt={"lowercase"}>
							{data.distance} mi away
						</Badge>
					</Stack>
				</GridCol>
			</Grid>
		</Card>
	);
}
