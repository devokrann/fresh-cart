import React from "react";

import { Card, Stack, Text, Title } from "@mantine/core";

import classes from "./Stats.module.scss";

export default function Stats({ data }: { data: { number: string; title: string } }) {
	return (
		<Card className={classes.card}>
			<Stack gap={0}>
				<Title className={classes.title} order={2}>
					{data.number}
				</Title>
				<Text className={classes.description}>{data.title}</Text>
			</Stack>
		</Card>
	);
}
