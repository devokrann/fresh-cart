import { typeAddress } from "@/types/address";

const postAddresses = async (addresses: typeAddress[]): Promise<typeAddress[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses`, {
			method: "PUT",
			body: JSON.stringify(addresses),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error posting addresses", error);

		return [];
	}
};

export default postAddresses;
