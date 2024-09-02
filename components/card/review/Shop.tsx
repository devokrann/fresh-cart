import React from "react";

import NextImage from "next/image";

import { Button, Card, Grid, GridCol, Group, Image, Rating, Stack, Text, Title } from "@mantine/core";

import classes from "./Shop.module.scss";

import { typeReview } from "@/types/review";
import { IconFlag, IconThumbUp } from "@tabler/icons-react";

export default function Shop({ data }: { data: typeReview }) {
	return (
		<Card className={classes.card}>
			<Grid>
				<GridCol span={1}>
					<Stack>
						<Image
							src={data.user.image}
							alt={data.user.name}
							w={"100%"}
							radius={"md"}
							loading="lazy"
							component={NextImage}
							width={1920}
							height={1080}
						/>
					</Stack>
				</GridCol>
				<GridCol span={11}>
					<Stack gap={"sm"}>
						<Stack gap={2}>
							<Title order={3} fz={"md"}>
								{data.user.name}
							</Title>

							<Group fz={"xs"}>
								<Text inherit c={"dimmed"}>
									{data.date.toDateString()}
								</Text>
								{data.purchase.verified ? (
									<Text inherit c={"green"} fw={"bold"}>
										Verified Purchase
									</Text>
								) : (
									<Text inherit c={"red"} fw={"bold"}>
										Unverified Purchase
									</Text>
								)}
							</Group>
						</Stack>

						<Group>
							<Rating value={data.rating} />
							<Text inherit fw={"bold"}>
								{data.title}
							</Text>
						</Group>

						<Text inherit>{data.desc}</Text>

						<Group justify="end" gap={"xs"}>
							<Button
								leftSection={<IconThumbUp size={16} stroke={2} />}
								variant="subtle"
								color="gray"
								size="xs"
							>
								Helpful
							</Button>
							<Button
								leftSection={<IconFlag size={16} stroke={2} />}
								variant="subtle"
								color="gray"
								size="xs"
							>
								Report Abuse
							</Button>
						</Group>
					</Stack>
				</GridCol>
			</Grid>
		</Card>
	);
}
