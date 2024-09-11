import React from "react";

import { Badge, Button, Card, CardSection, Group, Stack, Text, Title } from "@mantine/core";

import classes from "./Main.module.scss";

import { typeAddress } from "@/types/address";

import ModalAddressDefault from "@/components/modal/address/Default";
import ModalAddressDelete from "@/components/modal/address/Delete";

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
						<Text inherit>{data.country}</Text>
					</Stack>
				</Stack>

				<Group justify="space-between" gap={"xs"} mt={"md"}>
					{!data.default ? (
						<ModalAddressDefault data={data}>
							<Button variant="subtle" color="green.6" size="xs">
								Set as Default
							</Button>
						</ModalAddressDefault>
					) : (
						<Badge color="blue" c={"white"} size="sm">
							default
						</Badge>
					)}

					<Group gap={"xs"}>
						<Button variant="subtle" color="gray" size="xs">
							Edit
						</Button>

						<ModalAddressDelete data={data}>
							<Button variant="subtle" color="red.6" size="xs">
								Delete
							</Button>
						</ModalAddressDelete>
					</Group>
				</Group>
			</Stack>
		</Card>
	);
}
