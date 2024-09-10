"use client";

import React, { useContext } from "react";
import { typeAddress } from "@/types/address";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { updateAddress } from "@/handlers/requests/database/addresses";

import ContextUserAddresses from "@/contexts/Addresses";

export default function Edit({ data, children }: { data: typeAddress; children: React.ReactNode }) {
	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			size: 960,
			title: `Edit ${data.title}`,
			children: "form",
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () =>
				notifications.show({
					id: "address-update-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `The action has been aborted.`,
					variant: "failed",
				}),
			onConfirm: async () => {
				// update address in context

				// update address in database
				await updateAddress(data);

				notifications.show({
					id: "address-update-confirm",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Updated",
					message: `The address has been updated.`,
					variant: "success",
				});
			},
		});

	return <div onClick={openModal}>{children}</div>;
}
