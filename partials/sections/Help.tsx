import React from "react";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import { Button, Card, Divider, Group, List, ListItem, Stack, Text, Title } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

export default function Help() {
	return (
		<LayoutSection>
			<Divider my={"xl"} />

			<Stack gap={40}>
				<Stack>
					<Title order={2}>Was this information helpful?</Title>

					<Group>
						<Button color="gray" variant="outline" leftSection={<IconThumbUp size={16} stroke={1.5} />}>
							Yes
						</Button>
						<Button color="gray" variant="outline" leftSection={<IconThumbDown size={16} stroke={1.5} />}>
							No
						</Button>
					</Group>
				</Stack>

				<Card
					withBorder
					padding={"xl"}
					bg={"transparent"}
					style={{ borderColor: "var(--mantine-color-default-border)" }}
				>
					<Group justify="space-between">
						<Stack gap={0}>
							<Title order={3}>Can&apos;t find the answer to a question?</Title>
							<Text>Get in touch with our support team.</Text>
						</Stack>

						<Button size="md">Contact Us</Button>
					</Group>
				</Card>
			</Stack>
		</LayoutSection>
	);
}
