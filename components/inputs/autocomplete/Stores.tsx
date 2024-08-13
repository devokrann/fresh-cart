"use client";

import stores from "@/data/stores";
import { Autocomplete } from "@mantine/core";
import React, { useState } from "react";

export default function Stores() {
	const [value, setValue] = useState("");

	return (
		<Autocomplete placeholder="Search by store" data={stores.map(s => s.title)} value={value} onChange={setValue} />
	);
}
