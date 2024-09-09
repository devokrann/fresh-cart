"use client";

import React, { useState } from "react";
import IMask from "imask";
import { TextInput } from "@mantine/core";

export default function IMaskInput({ required, label, placeholder, mask, value, onChange, error }: any) {
	// Create a ref for the input
	const [maskedValue, setMaskedValue] = useState(value);

	// Apply iMask logic on the input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const masked = IMask.createMask({
			mask: mask,
		});

		masked.resolve(e.target.value);

		setMaskedValue(masked.value);
		onChange(masked.value);
	};

	return (
		<TextInput
			required={required}
			placeholder={placeholder}
			label={label}
			value={maskedValue}
			onChange={handleInputChange}
			error={error}
		/>
	);
}
