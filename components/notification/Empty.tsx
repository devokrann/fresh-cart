import { Center, Stack, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";
import React from "react";

export default function Empty({ label }: { label: string }) {
	return (
		<Center py={"xl"}>
			<Stack align="center" gap={"xl"}>
				<IconMoodEmpty size={40} stroke={1} />

				<Text fz={"sm"} ta={"center"}>
					{label}
				</Text>
			</Stack>
		</Center>
	);
}
