"use client";

import React, { useContext } from "react";
import PaymentMethods from "@/contexts/Payment";
import { typePaymentMethod } from "@/types/payment";
import { updatePaymentMethod } from "@/handlers/requests/database/paymentMethods";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function Default({ children, data }: { children: React.ReactNode; data: typePaymentMethod }) {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const openModal = () =>
		modals.openConfirmModal({
			centered: true,
			title: `Set Default`,
			children: <Text size="sm">Make {data.title} the default payment method?</Text>,
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onCancel: () =>
				notifications.show({
					id: "method-default-cancel",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Canceled",
					message: `The action has been aborted.`,
					variant: "failed",
				}),
			onConfirm: async () => {
				// update default in context
				setPaymentMethods(
					paymentMethods?.map(m => {
						if (data.id == m.id) {
							return { ...m, default: true };
						} else {
							return { ...m, default: false };
						}
					})!
				);

				// update default in database
				await updatePaymentMethod(data, "default");

				notifications.show({
					id: "method-default-confirm",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Confirmed",
					message: `${data.title} is now the default payment method.`,
					variant: "success",
				});
			},
		});

	return <div onClick={openModal}>{children}</div>;
}
