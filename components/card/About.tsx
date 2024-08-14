import React from "react";

import NextImage from "next/image";

import { Button, Card, Stack, Text, Title, Image, Group } from "@mantine/core";

import classes from "./About.module.scss";

import { typeAbout } from "@/types/components/card";

export default function About({ data }: { data: typeAbout }) {
	return (
		<Card className={classes.card}>
			<Stack gap={"xl"} h={"100%"}>
				<Group>
					<Image
						src={data.image}
						alt="About Image"
						h={{ base: 80, sm: 120 }}
						component={NextImage}
						width={1920}
						height={1080}
						loading="lazy"
					/>
				</Group>

				<Stack gap={"md"} align="start" justify="space-between" h={"100%"}>
					<Stack>
						<Title className={classes.title} order={2}>
							{data.title}
						</Title>
						<Text className={classes.description}>{data.description}</Text>
					</Stack>

					<Button color="black">{data.cta}</Button>
				</Stack>
			</Stack>
		</Card>
	);
}
