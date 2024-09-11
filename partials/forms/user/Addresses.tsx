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
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import email from "@/libraries/validators/special/email";
import { capitalizeWord, capitalizeWords } from "@/handlers/parsers/string";

import ContextAddresses from "@/contexts/Addresses";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addAddress, updateAddress } from "@/handlers/requests/database/addresses";

export default function Addresses() {
	const addressContext = useContext(ContextAddresses);

	if (!addressContext) {
		throw new Error("ChildComponent must be used within a ContextAddress.Provider");
	}

	const { addresses, setAddresses } = addressContext;

	const [submitted, setSubmitted] = useState(false);

	const [checked, setChecked] = useState(false);

	const formBilling = useForm({
		initialValues: {
			title: "",
			fname: "",
			lname: "",
			email: "",
			street: "",
			city: "",
			zip: "",
			country: "",
			phone: "",
			type: "billing",
			default: false,
		},

		validate: {
			title: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			fname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			lname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			email: value => email(value ? value : ""),
			street: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			city: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			zip: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			country: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			phone: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
		},
	});

	const formShipping = useForm({
		initialValues: {
			title: "",
			fname: "",
			lname: "",
			email: "",
			street: "",
			city: "",
			zip: "",
			country: "",
			phone: "",
			type: "shipping",
			default: false,
		},

		validate: {
			title: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			fname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			lname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			email: value => value && value.trim().length > 0 && email(value),
			street: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			city: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			zip: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			country: hasLength({ min: 2, max: 48 }, "Between 2 and 24 characters"),
			phone: value => value?.length! > 0 && value?.length! < 11 && "Invalid phone number",
		},
	});

	const parseBilling = () => {
		return {
			title: formBilling.values.title.trim(),
			fname: capitalizeWord(formBilling.values.fname.trim()),
			lname: capitalizeWord(formBilling.values.lname.trim()),
			email: formBilling.values.email?.trim().toLowerCase(),
			street: formBilling.values.street.trim(),
			city: capitalizeWords(formBilling.values.city.trim()),
			zip: formBilling.values.zip,
			country: capitalizeWords(formBilling.values.country.trim()),
			type: formBilling.values.type,
			default: formBilling.values.default,
		};
	};

	const parseShipping = () => {
		return {
			title: formShipping.values.title.trim(),
			fname: capitalizeWord(formShipping.values.fname.trim()),
			lname: capitalizeWord(formShipping.values.lname.trim()),
			email: formShipping.values.email?.trim().toLowerCase(),
			street: formShipping.values.street.trim(),
			city: capitalizeWords(formShipping.values.city.trim()),
			zip: formShipping.values.zip,
			country: capitalizeWords(formShipping.values.country.trim()),
			type: formShipping.values.type,
			default: formShipping.values.default,
		};
	};

	const handleSubmitBilling = async () => {
		if (formBilling.isValid()) {
			try {
				setSubmitted(true);

				// add to context
				setAddresses([...addresses!, parseBilling()]);
				checked && setAddresses([...addresses!, parseShipping()]);

				// add to database
				await addAddress(parseBilling());
				checked && (await addAddress(parseShipping()));

				notifications.show({
					id: "address-billing-form-success",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Address Added",
					message: "Address has been added",
					variant: "success",
				});
			} catch (error) {
				notifications.show({
					id: "address-billing-form-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				// clear forms
				formBilling.reset();

				setSubmitted(false);
			}
		} else {
			formBilling.validate();
		}
	};

	const handleSubmitShipping = async () => {
		if (formBilling.isValid()) {
			try {
				setSubmitted(true);

				// add to context
				setAddresses([...addresses!, parseShipping()]);

				// add to database
				await addAddress(parseShipping());

				notifications.show({
					id: "address-shipping-form-success",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Address Added",
					message: "Address has been added",
					variant: "success",
				});
			} catch (error) {
				notifications.show({
					id: "address-shipping-form-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				// clear forms
				formBilling.reset();

				setSubmitted(false);
			}
		} else {
			formBilling.validate();
		}
	};

	const inputSets = {
		billing: (
			<Grid>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>Billing Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. Downtown Office, My Place, etc.`}
						{...formBilling.getInputProps(`title`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Email"}
						placeholder="Your Email"
						description={"You'll receive your invoice here."}
						{...formBilling.getInputProps(`email`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...formBilling.getInputProps(`fname`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...formBilling.getInputProps(`lname`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...formBilling.getInputProps(`street`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput required label="City" placeholder="Your City" {...formBilling.getInputProps(`city`)} />
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...formBilling.getInputProps(`zip`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Country"
						placeholder="Your Country"
						{...formBilling.getInputProps(`country`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<InputWrapper label="Phone Number" {...formBilling.getInputProps(`phone`)}>
						<PhoneInput
							{...formBilling.getInputProps(`phone`)}
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
			<Grid>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>Shipping Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. Brother's Farm, Sister's Apartment, etc.`}
						{...formShipping.getInputProps(`title`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						label={"Email"}
						placeholder="Your Email"
						description={"Not needed for shipping."}
						{...formShipping.getInputProps(`email`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...formShipping.getInputProps(`fname`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...formShipping.getInputProps(`lname`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...formShipping.getInputProps(`street`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput required label="City" placeholder="Your City" {...formShipping.getInputProps(`city`)} />
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...formShipping.getInputProps(`zip`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Country"
						placeholder="Your Country"
						{...formShipping.getInputProps(`country`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<InputWrapper label="Phone Number" {...formShipping.getInputProps(`phone`)}>
						<PhoneInput
							{...formShipping.getInputProps(`phone`)}
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

	return (
		<Box
			component="form"
			onSubmit={e => {
				e.preventDefault();
				handleSubmitBilling();
				// handleSubmitShipping();
			}}
			noValidate
		>
			<Grid gutter={"xl"}>
				<GridCol span={12}>{inputSets.billing}</GridCol>

				<GridCol span={{ base: 12 }}>
					<Checkbox
						label="Make default address"
						key={formBilling.key("default")}
						{...formBilling.getInputProps("default", { type: "checkbox" })}
					/>
				</GridCol>

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
