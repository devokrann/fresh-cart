"use client";

import React, { useState } from "react";

import { Box, Button, Center, Grid, GridCol, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import text from "@/handlers/validators/form/special/text";
import email from "@/handlers/validators/form/special/email";
import phone from "@/handlers/validators/form/special/phone";
import capitalize from "@/handlers/parsers/string/capitalize";

import { typeFormRating } from "@/types/form";

export default function Review() {
	const [submitted, setSubmitted] = useState(false);

	const form = useForm({
		initialValues: {
			fname: "",
			lname: "",
			rating: "",
			review: "",
		},

		validate: {
			fname: value => text(value, 2, 24),
			lname: value => text(value, 2, 24),
			rating: value => email(value),
			review: value => text(value, 3, 2048, true),
		},
	});

	const parse = (rawData: typeFormRating) => {
		return {
			fname: capitalize.word(rawData.fname.trim()),
			lname: capitalize.word(rawData.lname.trim()),
			rating: rawData.rating,
			review: rawData.review.trim(),
		};
	};

	const handleSubmit = async (formValues: typeFormRating) => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				// await request
				// 	.post(process.env.NEXT_PUBLIC_API_URL + "/api/contact", {
				// 		method: "POST",
				// 		body: JSON.stringify(parse(formValues)),
				// 		headers: {
				// 			"Content-Type": "application/json",
				// 			Accept: "application/json",
				// 		},
				// 	})
				// 	.then(res => {
				// 		if (!res) {
				// 			notifications.show({
				// 				id: "form-contact-failed-no-response",
				// 				icon: <IconX size={16} stroke={1.5} />,
				// 				autoClose: 5000,
				// 				title: "Server Unavailable",
				// 				message: `There was no response from the server.`,
				// 				variant: "failed",
				// 			});
				// 		} else {
				// 			notifications.show({
				// 				id: "form-contact-success",
				// 				icon: <IconCheck size={16} stroke={1.5} />,
				// 				autoClose: 5000,
				// 				title: "Form Submitted",
				// 				message: "Someone will get back to you within 24 hours",
				// 				variant: "success",
				// 			});
				// 		}
				// 	});
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

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid pb={"md"}>
				<GridCol span={{ base: 12, xs: 6, sm: 6, lg: 4 }}>
					<TextInput
						required
						label={"Frist Name"}
						placeholder="Your First Name"
						{...form.getInputProps("fname")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6, sm: 6, lg: 4 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps("lname")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6, sm: 6, lg: 4 }}>
					<TextInput required label={"Rating"} placeholder="Rating" {...form.getInputProps("rating")} />
				</GridCol>
				<GridCol span={12}>
					<Textarea
						required
						label={"Review"}
						placeholder="Write your review here..."
						autosize
						resize="vertical"
						minRows={3}
						maxRows={10}
						{...form.getInputProps("review")}
					/>
				</GridCol>
				<GridCol span={12}>
					<Button type="submit" loading={submitted} mt={"md"}>
						{submitted ? "Posting" : "Post"}
					</Button>
				</GridCol>
			</Grid>
		</Box>
	);
}
