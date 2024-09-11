import { typeAddress } from "@/types/address";
import { capitalizeWord, capitalizeWords } from "./string";
import { typePaymentMethod } from "@/types/payment";

export const parseFormValuesBilling = (formValues: typeAddress) => {
	return {
		title: formValues.title.trim(),
		fname: capitalizeWord(formValues.fname.trim()),
		lname: capitalizeWord(formValues.lname.trim()),
		email: formValues.email?.trim().toLowerCase(),
		street: formValues.street.trim(),
		city: capitalizeWords(formValues.city.trim()),
		zip: formValues.zip,
		country: capitalizeWords(formValues.country.trim()),
		type: formValues.type,
		default: formValues.default,
	};
};

export const parseFormValuesShipping = (formValues: typeAddress) => {
	return {
		title: formValues.title.trim(),
		fname: capitalizeWord(formValues.fname.trim()),
		lname: capitalizeWord(formValues.lname.trim()),
		email: formValues.email?.trim().toLowerCase(),
		street: formValues.street.trim(),
		city: capitalizeWords(formValues.city.trim()),
		zip: formValues.zip,
		country: capitalizeWords(formValues.country.trim()),
		type: formValues.type,
		default: formValues.default,
	};
};

export const parseFormValuesPaymentMethods = (rawData: typePaymentMethod) => {
	return {
		title: rawData.title.trim(),
		name: capitalizeWords(rawData.name.trim()),
		number: rawData.number && rawData.type !== "paypal express" ? rawData.number : null,
		cvc: rawData.cvc && rawData.type !== "paypal express" ? rawData.cvc : null,
		email: rawData.email && rawData.type === "paypal express" ? rawData.email.trim().toLowerCase() : null,
		expiry: rawData.expiry && rawData.type !== "paypal express" ? rawData.expiry : null,
		type: rawData.type,
		default: rawData.default,
	};
};
