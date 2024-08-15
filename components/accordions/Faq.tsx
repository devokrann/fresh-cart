import React from "react";

import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from "@mantine/core";

import classes from "./Faq.module.scss";

export default function Faq({
	data,
}: {
	data: {
		label: string;
		item: string;
	}[];
}) {
	const items = data.map(item => (
		<AccordionItem key={item.label} value={item.label}>
			<AccordionControl>{item.label}</AccordionControl>
			<AccordionPanel>{item.item}</AccordionPanel>
		</AccordionItem>
	));

	return (
		<Accordion
			defaultValue={data[0].label}
			classNames={{
				item: classes.item,
				label: classes.label,
				chevron: classes.chevron,
				control: classes.control,
			}}
		>
			{items}
		</Accordion>
	);
}
