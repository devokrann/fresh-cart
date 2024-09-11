import email from "@/libraries/validators/special/email";
import { typePaymentMethod } from "@/types/payment";
import { hasLength, useForm } from "@mantine/form";

export const cardTypes = ["mastercard", "visa", "discover", "american express", "paypal express"];

export const useFormPaymentMethod = (data?: typePaymentMethod) => {
	const formBilling = useForm({
		initialValues: {
			title: data ? data.title : "",
			name: data ? data.name : "",
			number: data ? data.number : "",
			cvc: data ? data.cvc : "",
			email: data ? data.email : "",
			expiry: data ? data.expiry : "",
			type: data ? data.type : cardTypes[0],
			default: data?.default ? data.default : false,
		},

		validate: {
			title: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			name: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			number: (value, values) => values.type != "paypal express" && (value?.trim().length! < 19 ? true : null),
			cvc: (value, values) => values.type != "paypal express" && (value?.trim().length! < 3 ? true : null),
			email: (value, values) => values.type == "paypal express" && email(value!),
			expiry: (value, values) => values.type != "paypal express" && (value?.trim().length! < 5 ? true : null),
		},
	});

	return formBilling;
};
