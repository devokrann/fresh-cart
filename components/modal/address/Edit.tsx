"use client";

import { Modal, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import FormUserAddresses from "@/partials/forms/user/Addresses";
import React from "react";
import { typeAddress } from "@/types/address";
import { capitalizeWord } from "@/handlers/parsers/string";

export default function Edit({
	data,
	mode,
	children,
}: {
	data?: typeAddress;
	mode: "edit" | "add";
	children: React.ReactNode;
}) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} size={960} centered title={`${capitalizeWord(mode)} Address`}>
				<FormUserAddresses data={data} />
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
