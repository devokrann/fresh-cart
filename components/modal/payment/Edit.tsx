"use client";

import NextImage from "next/image";

import {
	Button,
	Checkbox,
	Grid,
	GridCol,
	Group,
	Image,
	InputWrapper,
	Modal,
	Radio,
	RadioGroup,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { typePaymentMethod } from "@/types/payment";
import ContextPayment from "@/contexts/Payment";
import { cardTypes, useFormPaymentMethod } from "@/hooks/form/paymentMethods";
import { parseFormValuesPaymentMethods } from "@/handlers/parsers/form";
import { updatePaymentMethod } from "@/handlers/requests/database/paymentMethods";
import IMaskInput from "@/components/inputs/Imask";
import { getPaymentCardImage } from "@/utilities/image";

export default function Edit({ children, data }: { children: React.ReactNode; data: typePaymentMethod }) {
	const [opened, { open, close }] = useDisclosure(false);

	const paymentMethodsContext = useContext(ContextPayment);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const [submitted, setSubmitted] = useState(false);

	const form = useFormPaymentMethod(data ? data : undefined);

	const handleSubmitBilling = async () => {
		if (form.isValid()) {
			if (!form.isDirty()) {
				form.isDirty();
			} else {
				try {
					setSubmitted(true);

					// update in context
					setPaymentMethods(
						paymentMethods
							?.map(p => {
								if (!form.values.default) {
									return p;
								} else {
									return { ...p, default: false };
								}
							})!
							?.map(a => {
								if (!data.id) {
									if (a.title == data.title && a.email == data.email) {
										return parseFormValuesPaymentMethods(form.values);
									} else {
										return a;
									}
								} else {
									if (a.id == data.id) {
										return parseFormValuesPaymentMethods(form.values);
									} else {
										return a;
									}
								}
							})!
					);

					// update in database
					await updatePaymentMethod({
						paymentMethod: parseFormValuesPaymentMethods(form.values),
						formerValues: {
							title: data.title,
							name: data.name,
						},
						context: form.values.default ? "default" : undefined,
					});

					notifications.show({
						id: "payment-method-form-success",
						icon: <IconCheck size={16} stroke={1.5} />,
						title: "Updated",
						message: "Your payment method has been updated",
						variant: "success",
					});

					// close modal
					close();
				} catch (error) {
					notifications.show({
						id: "payment-method-form-failed",
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
			form.validate();
		}
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					form.reset();
					close();
				}}
				title="Edit Payment Method"
				centered
				size={720}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
						handleSubmitBilling();
					}}
					noValidate
				>
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

						<GridCol
							span={{ base: 12, xs: 6 }}
							display={form.values.type == "paypal express" ? undefined : "none"}
						>
							<TextInput
								required
								label={`Email`}
								description="Email linked to Account"
								placeholder={`Account Email`}
								{...form.getInputProps("email")}
							/>
						</GridCol>

						<GridCol
							span={{ base: 12, xs: 6 }}
							display={form.values.type == "paypal express" ? "none" : undefined}
						>
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

						<GridCol
							span={{ base: 12, xs: 3 }}
							display={form.values.type == "paypal express" ? "none" : undefined}
						>
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

						<GridCol
							span={{ base: 12, xs: 3 }}
							display={form.values.type == "paypal express" ? "none" : undefined}
						>
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

						{!data.default && (
							<GridCol span={{ base: 12 }}>
								<Checkbox
									label="Make default payment method"
									key={form.key("default")}
									{...form.getInputProps("default", { type: "checkbox" })}
								/>
							</GridCol>
						)}

						<GridCol span={12}>
							<Button type="submit" loading={submitted} mt={"md"}>
								{submitted ? "Saving" : "Save Payment Method"}
							</Button>
						</GridCol>
					</Grid>
				</form>
			</Modal>

			<div onClick={open}>{children}</div>
		</>
	);
}
