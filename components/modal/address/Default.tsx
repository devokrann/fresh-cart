"use client";

import React, { useContext } from "react";
import { typeAddress } from "@/types/address";
import ContextUserAddresses from "@/contexts/Addresses";
import { updateAddress } from "@/handlers/requests/database/addresses";

export default function Default({ children, data }: { children: React.ReactNode; data: typeAddress }) {
	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const handleDefaultChange = async () => {
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
	};

	return <div onClick={handleDefaultChange}>{children}</div>;
}
