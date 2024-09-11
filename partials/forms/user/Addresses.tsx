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
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import ContextAddresses from "@/contexts/Addresses";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addAddress } from "@/handlers/requests/database/addresses";
import { parseFormValuesBilling, parseFormValuesShipping } from "@/handlers/parsers/form";
import { useFormAddressBilling, useFormAddressShipping } from "@/hooks/form/address";

export default function Addresses() {
	const addressContext = useContext(ContextAddresses);

	if (!addressContext) {
		throw new Error("ChildComponent must be used within a ContextAddress.Provider");
	}

	const { addresses, setAddresses } = addressContext;

	const [submitted, setSubmitted] = useState(false);
	const [differentShipping, setDifferentShipping] = useState(false);

	const formBilling = useFormAddressBilling();
	const formShipping = useFormAddressShipping();

	const handleSubmitBilling = async () => {
		if (formBilling.isValid()) {
			try {
				setSubmitted(true);

				if (!formBilling.values.default) {
					// add to context
					setAddresses([...addresses!, parseFormValuesBilling(formBilling.values)]);
				} else {
					// remove existing defaults and add to context
					setAddresses([
						...addresses?.map(a => {
							return { ...a, default: false };
						})!,
						parseFormValuesBilling(formBilling.values),
					]);
				}

				// add to database
				await addAddress(parseFormValuesBilling(formBilling.values));

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
		if (formShipping.isValid()) {
			try {
				setSubmitted(true);

				if (!formBilling.values.default) {
					// add to context
					setAddresses([...addresses!, parseFormValuesShipping(formShipping.values)]);
				} else {
					// remove existing defaults and add to context
					setAddresses([
						...addresses?.map(a => {
							return { ...a, default: false };
						})!,
						parseFormValuesShipping(formShipping.values),
					]);
				}

				// add to database
				await addAddress(parseFormValuesShipping(formShipping.values));

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
				formShipping.reset();

				setSubmitted(false);
			}
		} else {
			formShipping.validate();
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
				differentShipping && handleSubmitShipping();
			}}
			noValidate
		>
			<Grid gutter={"xl"}>
				<GridCol span={12}>{inputSets.billing}</GridCol>

				{!differentShipping && (
					<GridCol span={{ base: 12 }}>
						<Checkbox
							label="Make default address"
							key={formBilling.key("default")}
							{...formBilling.getInputProps("default", { type: "checkbox" })}
						/>
					</GridCol>
				)}

				<GridCol span={{ base: 12 }}>
					<Checkbox
						label="Use different shipping address"
						checked={differentShipping}
						onChange={event => setDifferentShipping(event.currentTarget.checked)}
					/>
				</GridCol>

				{differentShipping && <GridCol span={12}>{inputSets.shipping}</GridCol>}

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
