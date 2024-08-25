import React from "react";

import { Button, Card, Stack, Text, Title } from "@mantine/core";

import classes from "./Offer.module.scss";
import { IconArrowRight } from "@tabler/icons-react";

export default function Offer({ discount }: { discount: number }) {
	return (
		<Card className={classes.card} shadow="xs" py={"xl"}>
			<div className={classes.underlay}></div>

			<Stack align="start">
				<Stack gap={4}>
					<Title order={2} fz={28} lh={1} c={"dark.6"}>
						Fresh Fruits
					</Title>
					<Text fz={"sm"} c={"dark.4"}>
						Get Upto {discount}% Off
					</Text>
				</Stack>

				<Button color="black" rightSection={<IconArrowRight size={16} stroke={2} />}>
					Shop Now
				</Button>
			</Stack>
		</Card>
	);
}
