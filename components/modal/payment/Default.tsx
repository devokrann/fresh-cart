"use client";

import React, { useContext } from "react";
import PaymentMethods from "@/contexts/Payment";
import { typePaymentMethod } from "@/types/payment";

export default function Default({ children, data }: { children: React.ReactNode; data: typePaymentMethod }) {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const handleDefaultChange = () => {
		setPaymentMethods(
			paymentMethods?.map(m => {
				if (data.id == m.id) {
					return { ...m, default: true };
				} else {
					return { ...m, default: false };
				}
			})!
		);
	};

	return <div onClick={handleDefaultChange}>{children}</div>;
}
