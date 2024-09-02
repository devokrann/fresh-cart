import { Badge } from "@mantine/core";
import React from "react";

export default function Order({ status }: { status: string }) {
	let color: string = "";

	switch (status) {
		case "processing":
			color = "yellow";
			break;
		case "completed":
			color = "green";
			break;
		case "canceled":
			color = "red";
			break;
	}

	return (
		<Badge radius={"md"} color={color} c={"white"}>
			{status}
		</Badge>
	);
}
