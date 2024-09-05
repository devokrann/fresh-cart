import React from "react";

import { Card, CardSection, Stack, Text, Title } from "@mantine/core";

import classes from "./Order.module.scss";

import { typeAddress } from "@/types/address";
import {capitalizeWord} from "@/handlers/parsers/string";

export default function Order({ data }: { data: typeAddress }) {
	return (
		<Card className={classes.card} withBorder>
			<Stack>
				<CardSection className={classes.header}>
					<Title order={3} fz={"md"}>
						{capitalizeWord(data.type)} Address
					</Title>
				</CardSection>

				<Stack fz={"sm"} gap={4}>
					<Text inherit>
						{data.fname} {data.lname}
					</Text>
					{data.email && <Text inherit>{data.email}</Text>}
					{data.phone && <Text inherit>{data.phone}</Text>}
					<Text inherit>{data.street}</Text>
					<Text inherit>{data.city}</Text>
					<Text inherit>{data.zip}</Text>
					<Text inherit>{data.state}</Text>
					<Text inherit>{data.country}</Text>
				</Stack>
			</Stack>
		</Card>
	);
}
