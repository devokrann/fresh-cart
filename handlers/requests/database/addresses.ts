import { typeAddress } from "@/types/address";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getAddresses = async (): Promise<typeAddress[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching addresses", error);
		return [];
	}
};

export const addAddress = async (address: typeAddress): Promise<typeAddress[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.POST,
			body: JSON.stringify(address),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error adding address", error);
		throw error;
	}
};

export const updateAddress = async (data: {
	address: typeAddress;
	formerValues?: { title: string; email: string };
	context?: "default";
}): Promise<typeAddress[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.PUT,
			body: JSON.stringify(data),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error updating address", error);
		throw error;
	}
};

export const deleteAddress = async (address: typeAddress): Promise<typeAddress[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.DELETE,
			body: JSON.stringify(address),
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error deleting address", error);
		throw error;
	}
};
