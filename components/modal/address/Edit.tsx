"use client";

import { Button, Checkbox, Grid, GridCol, Group, InputWrapper, Modal, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { typeAddress } from "@/types/address";
import ContextUserAddresses from "@/contexts/Addresses";
import { updateAddress } from "@/handlers/requests/database/addresses";
import { parseFormValuesBilling, parseFormValuesShipping } from "@/handlers/parsers/form";
import PhoneInput from "react-phone-input-2";
import { useDisclosure } from "@mantine/hooks";
import { useFormAddressBilling, useFormAddressShipping } from "@/hooks/form/address";

export default function Edit({ children, data }: { children: React.ReactNode; data: typeAddress }) {
	const [opened, { open, close }] = useDisclosure(false);

	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const [submitted, setSubmitted] = useState(false);

	const formBilling = useFormAddressBilling(data.type == "billing" ? data : undefined);
	const formShipping = useFormAddressShipping(data.type == "shipping" ? data : undefined);

	const handleSubmitBilling = async () => {
		if (formBilling.isValid()) {
			if (!formBilling.isDirty()) {
				formBilling.isDirty();
			} else {
				try {
					setSubmitted(true);

					// update in context
					setAddresses(
						addresses
							?.map(a => {
								if (!formBilling.values.default) {
									return a;
								} else {
									return { ...a, default: false };
								}
							})!
							?.map(a => {
								if (!data.id) {
									if (a.title == data.title && a.email == data.email) {
										return parseFormValuesBilling(formBilling.values);
									} else {
										return a;
									}
								} else {
									if (a.id == data.id) {
										return parseFormValuesBilling(formBilling.values);
									} else {
										return a;
									}
								}
							})!
					);

					// update in database
					await updateAddress({
						address: parseFormValuesBilling(formBilling.values),
						formerValues: {
							title: data.title,
							email: data.email!,
						},
						context: formBilling.values.default ? "default" : undefined,
					});

					notifications.show({
						id: "address-billing-form-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						title: "Address Updated",
						message: "Your address has been updated",
						variant: "success",
					});

					// close modal
					close();
				} catch (error) {
					notifications.show({
						id: "address-billing-form-failed",
						icon: <IconX size={16} stroke={1.5} />,
						title: "Failed",
						message: (error as Error).message,
						variant: "failed",
					});
				} finally {
					setSubmitted(false);
				}
			}
		} else {
			formBilling.validate();
		}
	};

	const handleSubmitShipping = async () => {
		if (formShipping.isValid()) {
			if (!formShipping.isDirty()) {
				notifications.show({
					id: "address-shipping-form-failed-untouched",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Untouched",
					message: "No form field values have changed",
					variant: "failed",
				});
			} else {
				try {
					setSubmitted(true);

					// update in context
					setAddresses(
						addresses
							?.map(a => {
								if (!formShipping.values.default) {
									return a;
								} else {
									return { ...a, default: false };
								}
							})!
							?.map(a => {
								if (!data.id) {
									if (a.title == data.title && a.email == data.email) {
										return parseFormValuesShipping(formShipping.values);
									} else {
										return a;
									}
								} else {
									if (a.id == data.id) {
										return parseFormValuesShipping(formShipping.values);
									} else {
										return a;
									}
								}
							})!
					);

					// update in database
					await updateAddress({
						address: parseFormValuesShipping(formShipping.values),
						formerValues: {
							title: data.title,
							email: data.email!,
						},
						context: formShipping.values.default ? "default" : undefined,
					});

					notifications.show({
						id: "address-shipping-form-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						title: "Address Updated",
						message: "Your address has been updated",
						variant: "success",
					});

					// close modal
					close();
				} catch (error) {
					notifications.show({
						id: "address-shipping-form-failed",
						icon: <IconX size={16} stroke={1.5} />,
						title: "Failed",
						message: (error as Error).message,
						variant: "failed",
					});
				} finally {
					setSubmitted(false);
				}
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
		<>
			<Modal
				opened={opened}
				onClose={() => {
					formBilling.reset();
					formShipping.reset();
					close();
				}}
				title="Edit Address"
				centered
				size={720}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
						data.type == "billing" && handleSubmitBilling();
						data.type == "shipping" && handleSubmitShipping();
					}}
					noValidate
				>
					<Grid>
						{data.type == "billing" && <GridCol span={12}>{inputSets.billing}</GridCol>}
						{data.type == "shipping" && <GridCol span={12}>{inputSets.shipping}</GridCol>}

						{!data.default && data.type == "billing" && (
							<GridCol span={{ base: 12 }}>
								<Checkbox
									label="Make default address"
									key={formBilling.key("default")}
									{...formBilling.getInputProps("default", { type: "checkbox" })}
								/>
							</GridCol>
						)}

						{!data.default && data.type == "shipping" && (
							<GridCol span={{ base: 12 }}>
								<Checkbox
									label="Make default address"
									key={formShipping.key("default")}
									{...formShipping.getInputProps("default", { type: "checkbox" })}
								/>
							</GridCol>
						)}

						<GridCol span={{ base: 12 }}>
							<Group mt={"xs"}>
								<Button type="submit" loading={submitted}>
									{submitted ? "Saving" : `Save Address`}
								</Button>
							</Group>
						</GridCol>
					</Grid>
				</form>
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
