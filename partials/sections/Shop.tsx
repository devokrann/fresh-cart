import { IconCoin, IconDiscount, IconHeadset, IconTruckDelivery } from "@tabler/icons-react";
import React from "react";

import LayoutSection from "@/layouts/Section";
import { Grid, GridCol, Group, Stack, Text } from "@mantine/core";

export default function Shop() {
	const data = [
		{
			icon: IconTruckDelivery,
			title: "Free shipping & return",
			desc: "Free Shipping over $300",
		},
		{
			icon: IconCoin,
			title: "Money back guarantee",
			desc: "30 Days Money Back Guarantee",
		},
		{
			icon: IconDiscount,
			title: "Best prices",
			desc: "Always the best prices",
		},
		{
			icon: IconHeadset,
			title: "020-800-456-747",
			desc: "24/7 Available Support",
		},
	];

	return (
		<LayoutSection
			containerized="responsive"
			padded
			bg={"light-dark(var(--mantine-color-gray-0),var(--mantine-color-gray-light))"}
		>
			<Grid>
				{data.map(item => (
					<GridCol
						key={item.title}
						span={{ md: 4, lg: 3 }}
						display={data.indexOf(item) == data.length - 1 ? { md: "none", lg: "inherit" } : undefined}
					>
						<Group justify="center">
							<item.icon size={32} stroke={1} />

							<Stack fz={"sm"} gap={0}>
								<Text inherit fw={"bold"} tt="uppercase">
									{item.title}
								</Text>
								<Text inherit>{item.desc}</Text>
							</Stack>
						</Group>
					</GridCol>
				))}
			</Grid>
		</LayoutSection>
	);
}
