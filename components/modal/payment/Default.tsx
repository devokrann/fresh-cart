"use client";

import React, { useContext } from "react";
import PaymentMethods from "@/contexts/Payment";
import { typePaymentMethod } from "@/types/payment";
import { updatePaymentMethod } from "@/handlers/requests/database/paymentMethods";

export default function Default({ children, data }: { children: React.ReactNode; data: typePaymentMethod }) {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const handleDefaultChange = async () => {
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
	};

	return <div onClick={handleDefaultChange}>{children}</div>;
}
