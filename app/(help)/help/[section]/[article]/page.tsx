import React from "react";

import { Metadata } from "next";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Button, Card, Divider, Group, List, ListItem, Stack, Text, Title } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

export default async function Article() {
	const data = {
		title: "What is your returns Policy?",
		date: "June 26, 2024",
		desc: "At Cartzilla, we strive to ensure your complete satisfaction with every purchase. If, for any reason, you are not entirely pleased with your order, we've got you covered with our Returns Policy. You may return eligible items within 30 days of the delivery date.",
		list: [
			{
				title: "1. Pack the goods",
				list: [
					"Check if your product is eligible for return.",
					"Put the new product in its original packaging without any signs of use. If the product consists of several parts, you must return the entire set. Make sure that nothing is lost and that you return the product in the complete set in which you received it.",
					"If you purchased a product with a gift, you must return the entire set (product and gift). Otherwise, the nominal value of the gift will be deducted from the refund amount.",
					"It is not necessary to send a cheque.",
				],
			},
			{
				title: "2. Where to bring the goods",
				desc: "You can return the goods to the service department or Cartzilla return point.",
				list: [
					"Service departments at Cartzilla points of delivery. Here, we will immediately check the goods and, if everything is in order, agree on a return policy on the spot. You can bring any goods here. Simple goods, such as clothes and shoes. Complex goods: smartphones, washing machines, microwaves, power tools. The examination is carried out by a technical specialist. If long-term diagnostics are required, the goods will be sent to a service centre",
					"Returns acceptance points at Cartzilla pick-up points. Here, our employee will conduct a visual inspection of your goods. The decision regarding the goods is made after the goods are delivered to the service department. The details will be agreed with you. The examination is carried out within 14 days.",
				],
			},
			{
				title: "3. How will I get a refund for the goods?",
				desc: "You can provide your bank card details for a refund when making a refund in your personal account on the website or in a paper return form. Please indicate the card number and full name of the bank card holder in English on the return form.",
			},
		],
	};

	return (
		<LayoutPage>
			<LayoutSection>
				<Stack gap={"xl"}>
					<Stack gap={0}>
						<Title order={2}>{data.title}</Title>
						<Text fz={"sm"}>
							Last Updated:{" "}
							<Text component="span" inherit fw={"bold"}>
								{data.date}
							</Text>
						</Text>
					</Stack>

					<Text>{data.desc}</Text>

					<Stack gap={"xl"}>
						{data.list.map(item => (
							<Stack key={item.title}>
								<Title order={3}>{item.title}</Title>

								{item.desc && <Text>{item.desc}</Text>}

								<List size="sm" withPadding spacing={"xs"}>
									{item.list?.map(subItem => (
										<ListItem key={subItem}>{subItem}</ListItem>
									))}
								</List>
							</Stack>
						))}
					</Stack>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
