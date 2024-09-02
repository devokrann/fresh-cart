"use client";

import { Modal, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import FormUserPayment from "@/partials/forms/user/Payment";
import React from "react";
import { typePaymentMethod } from "@/types/payment";

export default function Payment({ data, children }: { data?: typePaymentMethod; children: React.ReactNode }) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} size={960} centered title="Add New Payment Method">
				<FormUserPayment modal />
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
