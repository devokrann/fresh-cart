import { typeCountryPhoneCode } from "@/types/country";

const getCountryCodes = async (): Promise<typeCountryPhoneCode[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_REST_COUNTRIES}?fields=name,idd,cca2,flag`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching country codes", error);

		return [];
	}
};

export default getCountryCodes;
