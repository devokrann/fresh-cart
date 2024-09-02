import help from "@/data/help";
import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export default function Help() {
	let items: { group: string; items: string[] }[] = [];

	help.links.map(l => {
		return items.push({ group: l.title, items: l.desc });
	});

	return (
		<Autocomplete
			placeholder="What do you need help with?"
			leftSection={<IconSearch size={16} stroke={1.5} />}
			data={items}
			limit={5}
		/>
	);
}
