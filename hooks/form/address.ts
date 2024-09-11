import email from "@/libraries/validators/special/email";
import { typeAddress } from "@/types/address";
import { hasLength, useForm } from "@mantine/form";

export const useFormAddressBilling = (data?: typeAddress) => {
	const formBilling = useForm({
		initialValues: {
			title: data ? data.title : "",
			fname: data ? data.fname : "",
			lname: data ? data.lname : "",
			email: data ? data.email : "",
			street: data ? data.street : "",
			city: data ? data.city : "",
			zip: data ? data.zip : "",
			country: data ? data.country : "",
			phone: data ? data.phone : "",
			type: data ? data.type : "billing",
			default: data ? data.default : false,
		},

		validate: {
			title: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			fname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			lname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			email: value => email(value ? value : ""),
			street: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			city: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			zip: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			country: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			phone: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
		},
	});

	return formBilling;
};

export const useFormAddressShipping = (data?: typeAddress) => {
	const formShipping = useForm({
		initialValues: {
			title: data ? data.title : "",
			fname: data ? data.fname : "",
			lname: data ? data.lname : "",
			email: data ? data.email : "",
			street: data ? data.street : "",
			city: data ? data.city : "",
			zip: data ? data.zip : "",
			country: data ? data.country : "",
			phone: data ? data.phone : "",
			type: data ? data.type : "shipping",
			default: data ? data.default : false,
		},

		validate: {
			title: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			fname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			lname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			email: value => email(value ? value : ""),
			street: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			city: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			zip: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			country: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			phone: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
		},
	});

	return formShipping;
};
