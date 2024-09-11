"use client";

import React, { useContext } from "react";
import { typeAddress } from "@/types/address";
import ContextUserAddresses from "@/contexts/Addresses";
import { updateAddress } from "@/handlers/requests/database/addresses";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function Default({ children, data }: { children: React.ReactNode; data: typeAddress }) {
	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			title: `Set Default`,
			children: <Text size="sm">Make {data.title} the default address?</Text>,
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () =>
				notifications.show({
					id: "address-default-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `The action has been aborted.`,
					variant: "failed",
				}),
			onConfirm: async () => {
				// update default in context
				setAddresses(
					addresses?.map(a => {
						if (data.id == a.id) {
							return { ...a, default: true };
						} else {
							return { ...a, default: false };
						}
					})!
				);

				// update default in database
				await updateAddress(data, "default");

				notifications.show({
					id: "address-default-confirm",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Confirmed",
					message: `${data.title} is now the default address.`,
					variant: "success",
				});
			},
		});

	return <div onClick={openModal}>{children}</div>;
}
