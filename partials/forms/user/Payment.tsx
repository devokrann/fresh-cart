"use client";

import React, { useState } from "react";

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

import InputMask from "react-input-mask";

import { MonthPickerInput } from "@mantine/dates";

import { IconCheck, IconX } from "@tabler/icons-react";

import text from "@/handlers/validators/form/special/text";
import email from "@/handlers/validators/form/special/email";
import phone from "@/handlers/validators/form/special/phone";
import capitalize from "@/handlers/parsers/string/capitalize";

import { typePaymentMethods } from "@/types/payment";
import image from "@/handlers/getters/image";

export default function Payment({ modal }: { modal?: boolean }) {
	const [submitted, setSubmitted] = useState(false);

	const [value, setValue] = useState("mastercard");

	const form = useForm({
		initialValues: {
			title: "",
			name: "",
			number: "",
			cvc: "",
			email: "",
			expiry: "",
			type: "",
			default: false,
		},

		validate: {
			title: value => text(value, 2, 24),
			name: value => text(value, 2, 24),
			number: value => text(value, 2, 48),
			cvc: value => text(value, 2, 48),
			email: value => value.trim().length > 0 && email(value),
			expiry: value => text(value, 2, 48),
			type: value => text(value, 2, 24),
		},
	});

	const parse = (rawData: typePaymentMethods) => {
		return {
			title: capitalize.word(rawData.title.trim()),
			name: capitalize.word(rawData.name.trim()),
			number: rawData.type == "paypal express" ? "" : rawData.number,
			email: rawData.type == "paypal express" ? rawData.email?.trim().toLowerCase() : "",
			expiry: rawData.type == "paypal express" ? "" : rawData.expiry?.trim(),
			type: rawData.type,
			default: rawData.default,
		};
	};

	const handleSubmit = async (formValues: typePaymentMethods) => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/contact", {
					method: "POST",
					body: JSON.stringify(parse(formValues)),
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				});

				const result = await response.json();

				if (!result) {
					notifications.show({
						id: "form-contact-failed-no-response",
						icon: <IconX size={16} stroke={1.5} />,
						autoClose: 5000,
						title: "Server Unavailable",
						message: `There was no response from the server.`,
						variant: "failed",
					});
				} else {
					notifications.show({
						id: "form-contact-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						autoClose: 5000,
						title: "Form Submitted",
						message: "Someone will get back to you within 24 hours",
						variant: "success",
					});
				}
			} catch (error) {
				notifications.show({
					id: "form-contact-failed",
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

	const cardTypes = ["mastercard", "visa", "discover", "american express", "paypal express"];

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid pb={"md"}>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Title"
						placeholder="Card Title"
						description="Ex. Company Mastercard, Joe's Credit Card, etc."
						{...form.getInputProps("title")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label="Name on Card"
						description="Card Holder Name"
						placeholder="Name on Card"
						{...form.getInputProps("lname")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<InputWrapper required label="Card Number">
						<Input
							placeholder="XXXX XXXX XXXX XXXX"
							component={InputMask}
							mask="9999 9999 9999 9999"
							maskChar=" "
							value={value}
							{...form.getInputProps("number")}
						/>
					</InputWrapper>
				</GridCol>
				<GridCol span={{ base: 12, xs: 3 }}>
					<InputWrapper required label="CVC">
						<Input
							placeholder="XXX"
							component={InputMask}
							mask="999"
							maskChar=" "
							value={value}
							{...form.getInputProps("cvc")}
						/>
					</InputWrapper>
				</GridCol>
				<GridCol span={{ base: 12, xs: 3 }}>
					<MonthPickerInput
						required
						label="Expiry Date"
						placeholder="Card Expiry Date"
						{...form.getInputProps("expiry")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 12 }}>
					<RadioGroup
						ml={{ md: "lg" }}
						name="paymentType"
						label="Payment Type"
						value={value}
						onChange={setValue}
					>
						<Group mt="md" gap={"xl"}>
							{cardTypes.map(type => (
								<Radio
									key={type}
									value={type}
									label={
										<Stack justify="center">
											<Image
												src={image.getPaymentCardImage(type)}
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
