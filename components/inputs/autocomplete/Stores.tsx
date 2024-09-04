"use client";

import { Autocomplete } from "@mantine/core";
import React, { useState } from "react";

export default function Stores({ data, ...restProps }: { data: string[] } & React.ComponentProps<typeof Autocomplete>) {
	const [value, setValue] = useState("");

	return <Autocomplete placeholder="Search by store" data={data} value={value} onChange={setValue} {...restProps} />;
}
