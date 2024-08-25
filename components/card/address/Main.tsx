import React from "react";

import { Badge, Button, Card, CardSection, Group, Stack, Text, Title } from "@mantine/core";

import classes from "./Main.module.scss";

import { typeAddress } from "@/types/address";
import capitalize from "@/handlers/parsers/string/capitalize";

import ModalAddress from "@/components/modal/Address";

export default function Main({ data }: { data: typeAddress }) {
	return (
		<Card className={classes.card} withBorder>
			<Stack justify="space-between" h={"100%"}>
				<Stack>
					<CardSection className={classes.header}>
						<Group justify="space-between">
							<Title order={3} fz={"md"}>
								{data.title}
							</Title>
						</Group>
					</CardSection>

					<Stack fz={"sm"} gap={4}>
						<Text inherit>{`${data.fname} ${data.lname}`}</Text>
						{data.email && <Text inherit>{data.email}</Text>}
						{data.phone && <Text inherit>{data.phone}</Text>}
						<Text inherit>{data.street}</Text>
						<Text inherit>{data.city}</Text>
						<Text inherit>{data.zip}</Text>
						<Text inherit>{data.state}</Text>
						<Text inherit>{data.country}</Text>
					</Stack>
				</Stack>

				<Group justify="space-between" gap={"xs"} mt={"md"}>
					{!data.default ? (
						<Button variant="subtle" color="green.6" size="xs">
							Set as Default
						</Button>
					) : (
						<Badge color="blue" c={"white"} size="sm">
							default
						</Badge>
					)}

					<Group gap={"xs"}>
						<ModalAddress data={data}>
							<Button variant="subtle" color="gray" size="xs">
								Edit
							</Button>
						</ModalAddress>

						<Button variant="subtle" color="red.6" size="xs">
							Delete
						</Button>
					</Group>
				</Group>
			</Stack>
		</Card>
	);
}
