"use client";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

export default function Delete({ children }: { children: React.ReactNode }) {
	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			title: "Confirm Deletion",
			children: <Text size="sm">This action is irreversible. Are you sure?</Text>,
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () =>
				notifications.show({
					id: "payment-method-deletion-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `The action has been aborted.`,
					variant: "failed",
				}),
			onConfirm: () =>
				notifications.show({
					id: "payment-method-deletion-confirm",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Deleted",
					message: `The payment method has been deleted.`,
					variant: "success",
				}),
		});
	return <div onClick={openModal}>{children}</div>;
}
