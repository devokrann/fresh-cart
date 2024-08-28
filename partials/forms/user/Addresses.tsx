"use client";

import React, { useState } from "react";

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
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import text from "@/handlers/validators/form/special/text";
import email from "@/handlers/validators/form/special/email";
import phone from "@/handlers/validators/form/special/phone";
import capitalize from "@/handlers/parsers/string/capitalize";

import { typeAddress } from "@/types/address";

import { typeFormAddress } from "@/types/form";

export default function Addresses({ data, modal }: { data?: typeAddress; modal?: boolean }) {
	const [submitted, setSubmitted] = useState(false);

	const [checked, setChecked] = useState(false);

	const form = useForm({
		initialValues: {
			billing:
				data && data.type == "billing"
					? data
					: {
							title: "",
							fname: "",
							lname: "",
							email: "",
							street: "",
							city: "",
							zip: "",
							state: "",
							country: "",
							phone: "",
							type: "billing",
							default: false,
					  },

			different: false,

			shipping:
				data && data.type == "shipping"
					? data
					: {
							title: "",
							fname: "",
							lname: "",
							email: "",
							street: "",
							city: "",
							zip: "",
							state: "",
							country: "",
							phone: "",
							type: "shipping",
							default: false,
					  },
		},

		validate: {
			billing:
				!data || data.type == "billing"
					? {
							title: value => text(value, 2, 48),
							fname: value => text(value, 2, 24),
							lname: value => text(value, 2, 24),
							email: value => email(value ? value : ""),
							street: value => text(value, 2, 48),
							city: value => text(value, 2, 24),
							zip: value => text(value, 2, 24),
							state: value => text(value, 2, 24),
							country: value => text(value, 2, 48),
							phone: value => value && value.trim().length > 0 && phone(value),
					  }
					: undefined,

			shipping:
				(!data && checked) || data?.type == "shipping"
					? {
							title: value => text(value, 2, 48),
							fname: value => text(value, 2, 24),
							lname: value => text(value, 2, 24),
							email: value => value && value.trim().length > 0 && email(value),
							street: value => text(value, 2, 48),
							city: value => text(value, 2, 24),
							zip: value => text(value, 2, 24),
							state: value => text(value, 2, 24),
							country: value => text(value, 2, 48),
							phone: value => value && value.trim().length > 0 && phone(value),
					  }
					: undefined,
		},
	});

	const parse = (rawData: typeFormAddress) => {
		return {
			billing:
				data && data.type == "billing"
					? {
							title: capitalize.word(rawData.billing.title.trim()),
							fname: capitalize.word(rawData.billing.fname.trim()),
							lname: capitalize.word(rawData.billing.lname.trim()),
							email: rawData.billing.email?.trim().toLowerCase(),
							street: capitalize.word(rawData.billing.street.trim()),
							city: capitalize.word(rawData.billing.city.trim()),
							zip: rawData.billing.zip,
							state: capitalize.word(rawData.billing.state.trim()),
							country: capitalize.word(rawData.billing.country.trim()),
							type: rawData.billing.type,
							default: rawData.billing.default,
					  }
					: undefined,

			different: !data ? checked : undefined,

			shipping:
				data && data.type == "shipping"
					? {
							title: capitalize.word(rawData.shipping.title.trim()),
							fname: capitalize.word(rawData.shipping.fname.trim()),
							lname: capitalize.word(rawData.shipping.lname.trim()),
							street: capitalize.word(rawData.shipping.street.trim()),
							city: capitalize.word(rawData.shipping.city.trim()),
							zip: rawData.shipping.zip,
							state: capitalize.word(rawData.shipping.state.trim()),
							country: capitalize.word(rawData.shipping.country.trim()),
							phone: rawData.shipping.phone?.trim()
								? rawData.shipping.phone.trim().length > 0
									? rawData.shipping.phone
									: null
								: null,
							type: rawData.shipping.type,
							default: rawData.shipping.default,
					  }
					: undefined,
		};
	};

	const handleSubmit = async (formValues: typeFormAddress) => {
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

	const getFormElements = ({ variant }: { variant: "shipping" | "billing" }) => {
		let descriptions = {
			title: "",
			email: "",
		};

		switch (variant) {
			case "billing":
				descriptions.title = "Downtown Office, My Place, etc.";
				descriptions.email = "You'll receive your invoice here.";
				break;
			case "shipping":
				descriptions.title = "Brother's Farm, Sister's Apartment, etc.";
				descriptions.email = "Not needed for shipping.";
				break;
		}

		return (
			<Grid gutter={modal ? "xs" : undefined}>
				<GridCol span={{ base: 12 }}>
					<Title order={3}>{capitalize.word(variant)} Address</Title>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Title"}
						placeholder="Your Address Title"
						description={`Ex. ${descriptions.title}`}
						{...form.getInputProps(`${variant}.title`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required={variant == "billing"}
						label={"Email"}
						placeholder="Your Email"
						description={descriptions.email}
						{...form.getInputProps(`${variant}.email`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"First Name"}
						placeholder="Your First Name"
						{...form.getInputProps(`${variant}.fname`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps(`${variant}.lname`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Street"}
						placeholder="Your Street"
						{...form.getInputProps(`${variant}.street`)}
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
						{...form.getInputProps(`${variant}.city`)}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						required
						label={"Zip"}
						placeholder="Your Zip Code"
						{...form.getInputProps(`${variant}.zip`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<Select
						required
						label="State"
						placeholder="Your State"
						data={["Nebraska", "Pennsylvania"]}
						{...form.getInputProps(`${variant}.state`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<Select
						required
						label="Country"
						placeholder="Your Country"
						data={["United States"]}
						{...form.getInputProps(`${variant}.country`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6 }}>
					<TextInput
						label={"Phone"}
						placeholder="Your Phone"
						{...form.getInputProps(`${variant}.phone`)}
						size={modal ? "xs" : undefined}
					/>
				</GridCol>
			</Grid>
		);
	};

	const shippingAddressColumn = ((data && data.type == "shipping") || checked) && (
		<GridCol span={{ base: 12, md: modal ? (!data ? 6 : 12) : 12 }}>
			{getFormElements({ variant: "shipping" })}
		</GridCol>
	);

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid gutter={"xl"}>
				{((data && data.type == "billing") || !data) && (
					<GridCol span={{ base: 12, md: modal ? (checked ? 6 : 12) : 12 }}>
						{getFormElements({ variant: "billing" })}
					</GridCol>
				)}

				{modal && shippingAddressColumn}

				{!data && (
					<GridCol span={{ base: 12 }}>
						<Checkbox
							label="Use different shipping address"
							checked={checked}
							onChange={event => setChecked(event.currentTarget.checked)}
						/>
					</GridCol>
				)}

				{!modal && shippingAddressColumn}

				<GridCol span={{ base: 12 }}>
					<Group>
						<Button type="submit" loading={submitted}>
							{submitted ? "Saving" : `Save Address${checked ? "es" : ""}`}
						</Button>
					</Group>
				</GridCol>
			</Grid>
		</Box>
	);
}
