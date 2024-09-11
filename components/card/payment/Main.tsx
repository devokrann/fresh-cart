import React from "react";

import NextImage from "next/image";

import { Badge, Button, Image, Card, CardSection, Group, Stack, Text, Title, Paper } from "@mantine/core";

import classes from "./Main.module.scss";

import { typePaymentMethod, typePaymentType } from "@/types/payment";
import { getPaymentCardImage } from "@/utilities/image";

import ModalPaymentDelete from "@/components/modal/payment/Delete";
import ModalPaymentDefault from "@/components/modal/payment/Default";
import ModalPaymentEdit from "@/components/modal/payment/Edit";

import { hasDatePassed } from "@/handlers/parsers/string";

export default function Main({ data }: { data: typePaymentMethod }) {
	const expired = hasDatePassed(data.expiry!);
	return (
		<Card className={classes.card} withBorder>
			<Stack justify="space-between" h={"100%"}>
				<Stack>
					<CardSection className={classes.header}>
						<Stack gap={"xs"}>
							<Title order={3} fz={"md"}>
								{data.title}
							</Title>

							<Group align="start" justify={expired ? "space-between" : "end"}>
								{expired && (
									<Badge color="red" size="sm">
										expired
									</Badge>
								)}

								<Paper bg={"light-dark(transparent, var(--mantine-color-white))"} px={"md"}>
									<Stack h={64} justify="center">
										<Image
											src={getPaymentCardImage(data.type)}
											alt={data.title}
											radius={"md"}
											component={NextImage}
											width={1920}
											height={1080}
											priority
											w={64}
										/>
									</Stack>
								</Paper>
							</Group>
						</Stack>
					</CardSection>

					<Stack fz={"sm"} gap={"xs"}>
						<Stack gap={0}>
							<Title order={4} fz={"sm"}>
								Name
							</Title>
							<Text inherit>{data.name}</Text>
						</Stack>
						{data.number && (
							<Stack gap={0}>
								<Title order={4} fz={"sm"}>
									Card Number
								</Title>
								<Text inherit>{data.number}</Text>
							</Stack>
						)}
						{data.expiry && (
							<Stack gap={0}>
								<Title order={4} fz={"sm"}>
									Expiry Date
								</Title>
								<Text inherit>{data.expiry}</Text>
							</Stack>
						)}
						{data.email && (
							<Stack gap={0}>
								<Title order={4} fz={"sm"}>
									Email
								</Title>
								<Text inherit>{data.email}</Text>
							</Stack>
						)}
					</Stack>
				</Stack>

				<Group justify="space-between" gap={"xs"} mt={"md"}>
					{data.default ? (
						<Badge color="green" c={"white"} size="sm">
							default
						</Badge>
					) : (
						<ModalPaymentDefault data={data}>
							<Button variant="subtle" color="green.6" size="xs">
								Set as Default
							</Button>
						</ModalPaymentDefault>
					)}

					<Group gap={"xs"}>
						<ModalPaymentEdit data={data}>
							<Button variant="subtle" color="gray" size="xs">
								Edit
							</Button>
						</ModalPaymentEdit>

						<ModalPaymentDelete data={data}>
							<Button variant="subtle" color="red.6" size="xs">
								Delete
							</Button>
						</ModalPaymentDelete>
					</Group>
				</Group>
			</Stack>
		</Card>
	);
}
