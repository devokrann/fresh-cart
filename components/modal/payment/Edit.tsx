"use client";

import { Modal, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import FormUserPayment from "@/partials/forms/user/Payment";
import React from "react";
import { typePaymentMethod } from "@/types/payment";
import { capitalizeWord } from "@/handlers/parsers/string";

export default function Edit({
	data,
	mode,
	children,
}: {
	data?: typePaymentMethod;
	mode: "edit" | "add";
	children: React.ReactNode;
}) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} size={960} centered title={`${capitalizeWord(mode)} Payment Method`}>
				<FormUserPayment data={data} mode={mode} />
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
