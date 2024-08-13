"use client";

import stores from "@/data/stores";
import { Checkbox } from "@mantine/core";
import React, { useState } from "react";

export default function Stores({ title }: { title: string | React.ReactNode }) {
	const [checked, setChecked] = useState(false);

	return (
		<Checkbox
			size="sm"
			label={title}
			checked={checked}
			onChange={event => setChecked(event.currentTarget.checked)}
		/>
	);
}
