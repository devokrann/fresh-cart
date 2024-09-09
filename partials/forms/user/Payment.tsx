"use client";

import React, { useContext, useEffect, useState } from "react";

import NextImage from "next/image";

import {
	Box,
	Button,
	Center,
	Checkbox,
	Grid,
	GridCol,
	Group,
	Image,
	Input,
	InputWrapper,
	NumberInput,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextInput,
	Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import IMaskInput from "@/components/inputs/Imask";

import text from "@/libraries/validators/special/text";
import email from "@/libraries/validators/special/email";
import { capitalizeWords } from "@/handlers/parsers/string";

import { typePaymentMethod } from "@/types/payment";
import { getPaymentCardImage } from "@/utilities/image";

import PaymentMethods from "@/contexts/Payment";

export default function Payment({ data, mode }: { data?: typePaymentMethod; mode: "add" | "edit" }) {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const [submitted, setSubmitted] = useState(false);
	const [previousValues, setPreviousValues] = useState(data);

	const cardTypes = ["mastercard", "visa", "discover", "american express", "paypal express"];

	const form = useForm({
		initialValues: {
			title: previousValues?.title ? previousValues.title : "",
			name: previousValues?.name ? previousValues.name : "",
			number: previousValues?.number ? previousValues.number : "",
			cvc: previousValues?.cvc ? previousValues.cvc : "",
			email: previousValues?.email ? previousValues.email : "",
			expiry: previousValues?.expiry ? previousValues.expiry : "",
			type: previousValues?.type ? previousValues.type : cardTypes[0],
			default: previousValues?.default ? previousValues.default : false,
		},

		validate: {
			title: value => text(value, 2, 24),
			name: value => text(value, 2, 24),
			number: (value, values) => values.type != "paypal express" && (value?.trim().length! < 19 ? true : null),
			cvc: (value, values) => values.type != "paypal express" && (value?.trim().length! < 3 ? true : null),
			email: (value, values) => values.type == "paypal express" && email(value!),
			expiry: (value, values) => values.type != "paypal express" && (value?.trim().length! < 5 ? true : null),
		},
	});

	const parse = (rawData: typePaymentMethod) => {
		return {
			title: rawData.title.trim(),
			name: capitalizeWords(rawData.name.trim()),
			number: rawData.number && rawData.type !== "paypal express" ? rawData.number : null,
			cvc: rawData.cvc && rawData.type !== "paypal express" ? rawData.cvc : null,
			email: rawData.email && rawData.type === "paypal express" ? rawData.email.trim().toLowerCase() : null,
			expiry: rawData.expiry && rawData.type !== "paypal express" ? rawData.expiry : null,
			type: rawData.type,
			default: rawData.default,
			mode,
			// formerValues: previousValues
			// 	? {
			// 			name: previousValues.name,
			// 			title: previousValues.title,
			// 	  }
			// 	: null,
		};
	};

	const handleSubmit = async (formValues: typePaymentMethod) => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				if ((mode == "edit" && !form.isDirty()) || previousValues == form.values) {
					notifications.show({
						id: "payment-method-failed-no-changes",
						icon: <IconX size={16} stroke={1.5} />,
						title: "No Changes",
						message: `None of the fields have been modified.`,
						variant: "failed",
					});
				} else {
					switch (mode) {
						case "add":
							const newDefault = parse(formValues).default;

							const removedDefault = paymentMethods?.map(m => {
								if (!m.default) {
									return m;
								} else {
									return { ...m, default: false };
								}
							});

							if (!newDefault) {
								setPaymentMethods([...paymentMethods!, parse(formValues)]);
							} else {
								setPaymentMethods([...removedDefault!, parse(formValues)]);
							}
							break;
						case "edit":
							setPreviousValues(form.values);

							setPaymentMethods(
								paymentMethods?.map(m => {
									if (m.id == data?.id) {
										return { ...m, ...parse(formValues) };
									} else {
										if (parse(formValues).default) {
											return { ...m, default: false };
										} else {
											return m;
										}
									}
								})!
							);
							break;
					}

					notifications.show({
						id: "payment-method-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						title: `Details ${mode == "add" ? "Added" : "Updated"}`,
						message: `Your payment details have been ${mode == "add" ? "added" : "updated"}.`,
						variant: "success",
					});
				}
			} catch (error) {
				notifications.show({
					id: "payment-method-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				form.reset();
				setSubmitted(false);
			}
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid>
				<GridCol span={{ base: 12, xs: 12 }}>
					<RadioGroup
						ml={{ md: "lg" }}
						name="paymentType"
						label="Payment Type"
						{...form.getInputProps("type")}
					>
						<Group mt="md" gap={"xl"}>
							{cardTypes.map(type => (
								<Radio
									key={type}
									value={type}
									label={
										<Stack justify="center">
											<Image
												src={getPaymentCardImage(type)}
												alt={type}
												radius={"md"}
												component={NextImage}
												width={1920}
												height={1080}
												priority
												h={32}
											/>
										</Stack>
									}
								/>
							))}
						</Group>
					</RadioGroup>
				</GridCol>

				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Title"
						placeholder={`${form.values.type == "paypal express" ? "Account" : "Card"} Title`}
						description="Ex. Company Mastercard, Joe's Credit Card, etc."
						{...form.getInputProps("title")}
					/>
				</GridCol>

				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={`Name on ${form.values.type == "paypal express" ? "Account" : "Card"}`}
						description={`${form.values.type == "paypal express" ? "Account" : "Card"} Holder Name`}
						placeholder={`Name on ${form.values.type == "paypal express" ? "Account" : "Card"}`}
						{...form.getInputProps("name")}
					/>
				</GridCol>

				<GridCol span={{ base: 12, xs: 6 }} display={form.values.type == "paypal express" ? undefined : "none"}>
					<TextInput
						required
						label={`Email`}
						description="Email linked to Account"
						placeholder={`Account Email`}
						{...form.getInputProps("email")}
					/>
				</GridCol>

				<GridCol span={{ base: 12, xs: 6 }} display={form.values.type == "paypal express" ? "none" : undefined}>
					<IMaskInput
						required
						label="Card Number"
						placeholder="XXXX XXXX XXXX XXXX"
						mask="0000-0000-0000-0000"
						value={form.values.number!}
						onChange={(value: string) => form.setFieldValue("number", value)}
						error={form.errors.number}
					/>
				</GridCol>

				<GridCol span={{ base: 12, xs: 3 }} display={form.values.type == "paypal express" ? "none" : undefined}>
					<IMaskInput
						required
						label="CVC"
						placeholder="XXX"
						mask="000"
						value={form.values.cvc!}
						onChange={(value: string) => form.setFieldValue("cvc", value)}
						error={form.errors.cvc}
					/>
				</GridCol>

				<GridCol span={{ base: 12, xs: 3 }} display={form.values.type == "paypal express" ? "none" : undefined}>
					<IMaskInput
						required
						label="Expiry Date"
						placeholder="MM/YY"
						mask="00/00"
						value={form.values.expiry!}
						onChange={(value: string) => form.setFieldValue("expiry", value)}
						error={form.errors.expiry}
					/>
				</GridCol>

				<GridCol span={{ base: 12 }} mt={{ md: "md" }}>
					<Checkbox
						label="Make default payment method"
						key={form.key("default")}
						{...form.getInputProps("default", { type: "checkbox" })}
					/>
				</GridCol>

				<GridCol span={12}>
					<Button type="submit" loading={submitted} mt={"md"}>
						{submitted ? "Saving" : "Save Payment Method"}
					</Button>
				</GridCol>
			</Grid>
		</Box>
	);
}
