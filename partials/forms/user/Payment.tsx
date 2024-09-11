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
import { cardTypes, useFormPaymentMethod } from "@/hooks/form/paymentMethods";
import { parseFormValuesPaymentMethods } from "@/handlers/parsers/form";
import { addPaymentMethod } from "@/handlers/requests/database/paymentMethods";

export default function Payment() {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const [submitted, setSubmitted] = useState(false);

	const form = useFormPaymentMethod();

	const handleSubmit = async () => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				if (!form.values.default) {
					// add to context
					setPaymentMethods([...paymentMethods!, parseFormValuesPaymentMethods(form.values)]);
				} else {
					// add to context
					setPaymentMethods([
						...paymentMethods?.map(m => {
							return { ...m, default: false };
						})!,
						parseFormValuesPaymentMethods(form.values),
					]);
				}

				// add to database
				addPaymentMethod(parseFormValuesPaymentMethods(form.values));

				notifications.show({
					id: "payment-methods-form-success",
					icon: <IconCheck size={16} stroke={1.5} />,
					title: "Payment Method Added",
					message: "Your method has been added",
					variant: "success",
				});
			} catch (error) {
				notifications.show({
					id: "payment-methods-form-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Failed",
					message: (error as Error).message,
					variant: "failed",
				});
			} finally {
				// clear forms
				form.reset();

				setSubmitted(false);
			}
		} else {
			form.validate();
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
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
