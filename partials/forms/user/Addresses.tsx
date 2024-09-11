"use client";

import React, { useContext, useState } from "react";

import {
	Box,
	Button,
	Center,
	Checkbox,
	Grid,
	GridCol,
	Group,
	Input,
	InputWrapper,
	Select,
	Stack,
	TextInput,
	Textarea,
	Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { hasLength, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import text from "@/libraries/validators/special/text";
import email from "@/libraries/validators/special/email";
import phone from "@/libraries/validators/special/phone";
import { capitalizeWord, capitalizeWords } from "@/handlers/parsers/string";

import { typeAddress } from "@/types/address";

import { typeFormAddress } from "@/types/form";

import ContextAddresses from "@/contexts/Addresses";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addAddress, updateAddress } from "@/handlers/requests/database/addresses";

export default function Addresses({ data, modal }: { data?: typeAddress; modal?: boolean }) {
	const addressContext = useContext(ContextAddresses);

	if (!addressContext) {
		throw new Error("ChildComponent must be used within a ContextAddress.Provider");
	}

	const { addresses, setAddresses } = addressContext;

	const [submitted, setSubmitted] = useState(false);
	const [previousValues, setPreviousValues] = useState(data);

	const [checked, setChecked] = useState(false);

	const form = useForm({
		initialValues: {
			billing: {
				titleBilling: previousValues ? previousValues.title : "",
				fnameBilling: previousValues ? previousValues.fname : "",
				lnameBilling: previousValues ? previousValues.lname : "",
				emailBilling: previousValues ? previousValues.email : "",
				streetBilling: previousValues ? previousValues.street : "",
				cityBilling: previousValues ? previousValues.city : "",
				zipBilling: previousValues ? previousValues.zip : "",
				countryBilling: previousValues ? previousValues.country : "",
				phoneBilling: previousValues ? previousValues.phone : "",
				typeBilling: previousValues ? previousValues.type : "billing",
				defaultBilling: previousValues ? previousValues.default : false,
			},
			shipping: {
				titleShipping: previousValues ? previousValues.title : "",
				fnameShipping: previousValues ? previousValues.fname : "",
				lnameShipping: previousValues ? previousValues.lname : "",
				emailShipping: previousValues ? previousValues.email : "",
				streetShipping: previousValues ? previousValues.street : "",
				cityShipping: previousValues ? previousValues.city : "",
				zipShipping: previousValues ? previousValues.zip : "",
				countryShipping: previousValues ? previousValues.country : "",
				phoneShipping: previousValues ? previousValues.phone : "",
				typeShipping: previousValues ? previousValues.type : "shipping",
				defaultShipping: previousValues ? previousValues.default : false,
			},
		},

		validate: {
			billing: {
				titleBilling: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
				fnameBilling: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
				lnameBilling: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
				emailBilling: value => email(value ? value : ""),
				streetBilling: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
				cityBilling: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
				zipBilling: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
				countryBilling: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
				phoneBilling: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
			},
			shipping: checked
				? {
						titleShipping: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
						fnameShipping: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
						lnameShipping: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
						emailShipping: value => value && value.trim().length > 0 && email(value),
						streetShipping: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
						cityShipping: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
						zipShipping: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
						countryShipping: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
						phoneShipping: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
				  }
				: undefined,
		},
	});

	const parseBilling = () => {
		return {
			title: form.values.billing.titleBilling.trim(),
			fname: capitalizeWord(form.values.billing.fnameBilling.trim()),
			lname: capitalizeWord(form.values.billing.lnameBilling.trim()),
			email: form.values.billing.emailBilling?.trim().toLowerCase(),
			street: form.values.billing.streetBilling.trim(),
			city: capitalizeWords(form.values.billing.cityBilling.trim()),
			zip: form.values.billing.zipBilling,
			country: capitalizeWords(form.values.billing.countryBilling.trim()),
			type: form.values.billing.typeBilling,
			default: form.values.billing.defaultBilling,
		};
	};

	const parseShipping = () => {
		return {
			title: form.values.shipping.titleShipping.trim(),
			fname: capitalizeWord(form.values.shipping.fnameShipping.trim()),
			lname: capitalizeWord(form.values.shipping.lnameShipping.trim()),
			email: form.values.shipping.emailShipping?.trim().toLowerCase(),
			street: form.values.shipping.streetShipping.trim(),
			city: capitalizeWords(form.values.shipping.cityShipping.trim()),
			zip: form.values.shipping.zipShipping,
			country: capitalizeWords(form.values.shipping.countryShipping.trim()),
			type: form.values.shipping.typeShipping,
			default: form.values.shipping.defaultShipping,
		};
	};

	const handleSubmit = async () => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				if (!data) {
					// add to context
					setAddresses([...addresses!, parseBilling()]);
					checked && setAddresses([...addresses!, parseShipping()]);

					// add to database
					await addAddress(parseBilling());
					checked && (await addAddress(parseShipping()));
				} else {
					// update in context
					setAddresses(
						addresses?.map(a => {
							if (a.id == data.id) {
								return { ...parseBilling(), id: data.id };
							} else {
								return a;
							}
						})!
					);

					// update in database
					await updateAddress({ ...parseBilling(), id: data.id });
				}

				notifications.show({
					id: "address-form-success",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Form Submitted",
					message: "Someone will get back to you within 24 hours",
					variant: "success",
				});
			} catch (error) {
				notifications.show({
					id: "address-form-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Submisstion Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				// clear forms
				form.reset();

				setSubmitted(false);
			}
		}
	};

	const inputSets = {
		billing: (
			<Grid gutter={modal ? "xs" : undefined}>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>Billing Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. Downtown Office, My Place, etc.`}
						{...form.getInputProps(`billing.titleBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Email"}
						placeholder="Your Email"
						description={"You'll receive your invoice here."}
						{...form.getInputProps(`billing.emailBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...form.getInputProps(`billing.fnameBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps(`billing.lnameBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...form.getInputProps(`billing.streetBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="City"
						placeholder="Your City"
						size={modal ? "xs" : undefined}
						{...form.getInputProps(`billing.cityBilling`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...form.getInputProps(`billing.zipBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Country"
						placeholder="Your Country"
						{...form.getInputProps(`billing.countryBilling`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<InputWrapper label="Phone Number" {...form.getInputProps(`billing.phoneBilling`)}>
						<PhoneInput
							{...form.getInputProps(`billing.phoneBilling`)}
							country={"ke"}
							inputProps={{
								name: "phone",
								required: false,
								autoFocus: false,
							}}
							containerStyle={{
								marginBottom: 5,
							}}
							inputClass="phone-input-field"
							buttonClass="phone-input-button"
							containerClass="phone-input-container"
							dropdownClass="phone-input-dropdown"
						/>
					</InputWrapper>
				</GridCol>
			</Grid>
		),
		shipping: (
			<Grid gutter={modal ? "xs" : undefined}>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>Shipping Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. Brother's Farm, Sister's Apartment, etc.`}
						{...form.getInputProps(`shipping.titleShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						label={"Email"}
						placeholder="Your Email"
						description={"Not needed for shipping."}
						{...form.getInputProps(`shipping.emailShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...form.getInputProps(`shipping.fnameShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps(`shipping.lnameShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...form.getInputProps(`shipping.streetShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="City"
						placeholder="Your City"
						size={modal ? "xs" : undefined}
						{...form.getInputProps(`shipping.cityShipping`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...form.getInputProps(`shipping.zipShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Country"
						placeholder="Your Country"
						{...form.getInputProps(`shipping.countryShipping`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<InputWrapper label="Phone Number" {...form.getInputProps(`shipping.phoneShipping`)}>
						<PhoneInput
							{...form.getInputProps(`shipping.phoneShipping`)}
							country={"ke"}
							inputProps={{
								name: "phone",
								required: false,
								autoFocus: false,
							}}
							containerStyle={{
								marginBottom: 5,
							}}
							inputClass="phone-input-field"
							buttonClass="phone-input-button"
							containerClass="phone-input-container"
							dropdownClass="phone-input-dropdown"
						/>
					</InputWrapper>
				</GridCol>
			</Grid>
		),
	};

	const shippingAddressInputs = ((data && data.type == "shipping") || checked) && (
		<GridCol span={{ base: 12, md: modal ? (!data ? 6 : 12) : 12 }}>{inputSets.shipping}</GridCol>
	);

	return (
		<Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
			<Grid gutter={"xl"}>
				{((data && data.type == "billing") || !data) && (
					<GridCol span={{ base: 12, md: modal ? (checked ? 6 : 12) : 12 }}>{inputSets.billing}</GridCol>
				)}

				{modal && shippingAddressInputs}

				{!data && modal && (
					<GridCol span={{ base: 12 }}>
						<Checkbox
							label="Use different shipping address"
							checked={checked}
							onChange={event => setChecked(event.currentTarget.checked)}
						/>
					</GridCol>
				)}

				<GridCol span={{ base: 12 }}>
					<Checkbox
						label="Make default address"
						key={form.key("billing.defaultBilling")}
						{...form.getInputProps("billing.defaultBilling", { type: "checkbox" })}
					/>
				</GridCol>

				{!modal && shippingAddressInputs}

				<GridCol span={{ base: 12 }}>
					<Group mt={"xs"}>
						<Button type="submit" loading={submitted}>
							{submitted ? "Saving" : `Save Address`}
						</Button>
					</Group>
				</GridCol>
			</Grid>
		</Box>
	);
}
