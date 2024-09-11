"use client";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useContext } from "react";
import { typeAddress } from "@/types/address";
import ContextUserAddresses from "@/contexts/Addresses";
import { deleteAddress } from "@/handlers/requests/database/addresses";

export default function Delete({ children, data }: { children: React.ReactNode; data: typeAddress }) {
	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			title: `Delete ${data.title}`,
			children: <Text size="sm">This action is irreversible. Are you sure?</Text>,
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () =>
				notifications.show({
					id: "address-deletion-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `The action has been aborted.`,
					variant: "failed",
				}),
			onConfirm: async () => {
				// remove address from context
				setAddresses(addresses?.filter(m => m.id != data.id)!);

				// delete address from database
				await deleteAddress(data);

				notifications.show({
					id: "address-deletion-confirm",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Deleted",
					message: `The address has been deleted.`,
					variant: "success",
				});
			},
		});

	return <div onClick={openModal}>{children}</div>;
}
