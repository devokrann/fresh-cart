"use client";

import { Modal, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import FormUserAccountDelete from "@/partials/forms/user/settings/Delete";
import FormUserAddresses from "@/partials/forms/user/Addresses";
import React from "react";
import { typeAddress } from "@/types/address";

export default function Address({ data, children }: { data?: typeAddress; children: React.ReactNode }) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} size={960} centered title="Add New Address">
				<FormUserAddresses data={data} modal />
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
