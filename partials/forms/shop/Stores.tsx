import { Group, Skeleton, Stack } from "@mantine/core";
import React from "react";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";
import InputCheckboxStores from "@/components/inputs/checkbox/Stores";
import getStores from "@/handlers/requests/getStores";

export default async function Stores() {
	const stores = await getStores();

	const skeletons = [
		{
			id: "1",
			element: (
				<Group gap={"xs"}>
					<Skeleton width={16} height={16} />
					<Skeleton h={16} w={80} />
				</Group>
			),
		},
		{
			id: "2",
			element: (
				<Group gap={"xs"}>
					<Skeleton width={16} height={16} />
					<Skeleton h={16} w={80} />
				</Group>
			),
		},
	];

	return (
		<Stack>
			<InputAutocompleteStores data={stores.map(s => s.title)} />

			<Stack gap={"xs"}>
				{stores.map(store => (
					<InputCheckboxStores key={store.id} title={store.title} />
				))}
			</Stack>
		</Stack>
	);
}
