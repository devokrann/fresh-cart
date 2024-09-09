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
	Select,
	Stack,
	TextInput,
	Textarea,
	Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import text from "@/libraries/validators/special/text";
import email from "@/libraries/validators/special/email";
import phone from "@/libraries/validators/special/phone";
import { capitalizeWord, capitalizeWords } from "@/handlers/parsers/string";

import ContextUserAddresses from "@/contexts/Addresses";

import { typeAddress } from "@/types/address";

export default function Addresses({
	data,
	modal,
	mode,
	type,
}: {
	data?: typeAddress;
	modal?: boolean;
	mode: "add" | "edit";
	type: "billing" | "shipping" | string;
}) {
	const addressesContext = useContext(ContextUserAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const [submitted, setSubmitted] = useState(false);
	const [previousValues, setPreviousValues] = useState(data);

	const form = useForm({
		initialValues: {
			title: previousValues ? previousValues.title : "",
			fname: previousValues ? previousValues.fname : "",
			lname: previousValues ? previousValues.lname : "",
			street: previousValues ? previousValues.street : "",
			city: previousValues ? previousValues.city : "",
			zip: previousValues ? previousValues.zip : "",
			state: previousValues ? previousValues.state : "",
			country: previousValues ? previousValues.country : "",
			email: previousValues ? previousValues.email : "",
			phone: previousValues ? previousValues.phone : "",
			type: previousValues ? previousValues.type : type,
			default: false,
		},

		validate: {
			title: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			fname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			lname: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			street: hasLength({ min: 2, max: 48 }, "Between 2 and 48 characters"),
			city: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			zip: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			state: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			country: hasLength({ min: 2, max: 24 }, "Between 2 and 24 characters"),
			email: value => type == "billing" && value && email(value),
			phone: value => (value && value.trim().length > 0 ? phone(value) : null),
		},
	});

	const parse = (rawData: typeAddress) => {
		return {
			title: capitalizeWords(rawData.title.trim()),
			fname: capitalizeWord(rawData.fname.trim()),
			lname: capitalizeWord(rawData.lname.trim()),
			street: capitalizeWords(rawData.street.trim()),
			city: capitalizeWords(rawData.city.trim()),
			zip: rawData.zip,
			state: capitalizeWord(rawData.state.trim()),
			country: capitalizeWords(rawData.country.trim()),
			email: rawData.email?.trim().toLowerCase(),
			phone: rawData.phone?.trim() ? (rawData.phone.trim().length > 0 ? rawData.phone : null) : null,
			type,
			default: rawData.default,
		};
	};

	const handleSubmit = async (formValues: typeAddress) => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				if ((mode == "edit" && !form.isDirty()) || previousValues == form.values) {
					notifications.show({
						id: "addresses-failed-no-changes",
						icon: <IconX size={16} stroke={1.5} />,
						title: "No Changes",
						message: `None of the fields have been modified.`,
						variant: "failed",
					});
				} else {
					switch (mode) {
						case "add":
							const newDefault = parse(formValues).default;

							const removedDefault = addresses?.map(m => {
								if (!m.default) {
									return m;
								} else {
									return { ...m, default: false };
								}
							});

							if (!newDefault) {
								setAddresses([...addresses!, parse(formValues)]);
							} else {
								setAddresses([...removedDefault!, parse(formValues)]);
							}
							break;
						case "edit":
							setPreviousValues({
								...form.values,
								phone: form.values.phone?.length > 0 ? form.values.phone : "",
							});

							setAddresses(
								addresses?.map(a => {
									if (a.id == data?.id) {
										return { ...a, ...parse(formValues) };
									} else {
										if (parse(formValues).default) {
											return { ...a, default: false };
										} else {
											return a;
										}
									}
								})!
							);
							break;
					}

					notifications.show({
						id: "addresses-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						autoClose: 5000,
						title: "Form Submitted",
						message: "Someone will get back to you within 24 hours",
						variant: "success",
					});
				}
			} catch (error) {
				notifications.show({
					id: "addresses-failed",
					icon: <IconX size={16} stroke={1.5} />,
					autoClose: 5000,
					title: "Submisstion Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				form.reset();
				setSubmitted(false);
			}
		}
	};

	const getVariantProps = () => {
		let email: string;
		let title: string;

		switch (type) {
			case "billing":
				title = "Downtown Office, My Place, etc.";
				email = "You'll receive your invoice here.";

				return { email, title };
			case "shipping":
				title = "Brother's Farm, Sister's Apartment, etc.";
				email = "Not needed for shipping.";

				return { email, title };
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid gutter={"xs"}>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>{capitalizeWord(type)} Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. ${getVariantProps()?.title}`}
						{...form.getInputProps(`title`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required={type == "billing"}
						label={"Email"}
						placeholder="Your Email"
						description={getVariantProps()?.email}
						{...form.getInputProps(`email`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...form.getInputProps(`fname`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps(`lname`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...form.getInputProps(`street`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<Select
						required
						label="City"
						placeholder="Your City"
						data={["Kansas", "Tannersville"]}
						size={modal ? "xs" : undefined}
						{...form.getInputProps(`city`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...form.getInputProps(`zip`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<Select
						required
						label="State"
						placeholder="Your State"
						data={["Nebraska", "Pennsylvania"]}
						{...form.getInputProps(`state`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<Select
						required
						label="Country"
						placeholder="Your Country"
						data={["United States"]}
						{...form.getInputProps(`country`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						label={"Phone"}
						placeholder="Your Phone"
						{...form.getInputProps(`phone`)}
						size={modal ? "xs" : undefined}
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
