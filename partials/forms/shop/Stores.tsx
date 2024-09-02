"use client";

import { Group, Skeleton, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import InputAutocompleteStores from "@/components/inputs/autocomplete/Stores";
import InputCheckboxStores from "@/components/inputs/checkbox/Stores";
import { typeStore } from "@/types/store";
import getStores from "@/handlers/database/create/stores";

export default function Stores() {
	const [data, setData] = useState<typeStore[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setData(await getStores());
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
			{loading ? (
				<Skeleton h={32} w={"100%"} />
			) : (
				data && <InputAutocompleteStores data={data.map(s => s.title)} />
			)}

			<Stack gap={"xs"}>
				{loading
					? skeletons.map(s => s.element)
					: data && data.map(store => <InputCheckboxStores key={store.id} title={store.title} />)}
			</Stack>
		</Stack>
	);
}
