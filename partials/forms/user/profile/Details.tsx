"use client";

import React, { useState } from "react";

import { Box, Button, Grid, GridCol, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import { useSession } from "next-auth/react";
import text from "@/handlers/validators/form/special/text";
import email from "@/handlers/validators/form/special/email";
import capitalize from "@/handlers/parsers/string/capitalize";
import phone from "@/handlers/validators/form/special/phone";

interface typeProfileDetails {
	name?: string | null;
	email?: string | null;
	phone?: string | null;
}

export default function Details() {
	const session = useSession();

	const [submitted, setSubmitted] = useState(false);

	const form = useForm({
		initialValues: {
			name: session.data?.user.name ? session.data?.user.name : "",
			email: session.data?.user.email,
			phone: "",
		},

		validate: {
			name: value => (value && value?.trim().length > 0 ? text(value, 2, 255) : "Please fill out this field."),
			email: value => value && email(value),
			phone: value => value.trim().length > 0 && phone(value),
		},
	});

	const parse = (rawData: typeProfileDetails) => {
		return {
			name: rawData.name && capitalize.words(rawData.name),
			email: rawData.email && rawData.email.trim().toLowerCase(),
			phone: rawData.phone?.trim() ? (rawData.phone.trim().length > 0 ? rawData.phone : null) : null,
		};
	};

	const handleSubmit = async (formValues: typeProfileDetails) => {
		if (form.isValid()) {
			try {
				if (!form.isDirty()) {
					notifications.show({
						id: "form-contact-failed-no-update",
						icon: <IconX size={16} stroke={1.5} />,
						autoClose: 5000,
						title: "Failed",
						message: "No form fields have been updated",
						variant: "failed",
					});
				} else {
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

					console.log(result);
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
				setSubmitted(false);
			}
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid>
				<GridCol span={{ base: 12 }}>
					<TextInput
						required
						label={"Name"}
						placeholder="Your Name"
						{...form.getInputProps("name")}
						disabled={!session}
					/>
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<TextInput
						required
						label={"Email"}
						placeholder="Your Email"
						{...form.getInputProps("email")}
						disabled
						description="You cannot change your email address"
					/>
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<TextInput label={"Phone"} placeholder="Your Phone" {...form.getInputProps("phone")} />
				</GridCol>
				<GridCol span={{ base: 6 }}>
					<Button type="submit" loading={submitted} mt={"md"}>
						{submitted ? "Submitting" : "Submit"}
					</Button>
				</GridCol>
			</Grid>
		</Box>
	);
}
