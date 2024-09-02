import { typeAddress } from "@/types/address";

const getAddresses = async (userId: string): Promise<typeAddress[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching addresses", error);

		return [];
	}
};

export default getAddresses;
