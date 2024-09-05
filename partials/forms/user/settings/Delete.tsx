"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, Grid, GridCol, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconX } from "@tabler/icons-react";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import email from "@/libraries/validators/special/email";

interface typeAccountDelete {
	password: string;
}

enum typeDelete {
	ACCOUNT = "DELETE ACCOUNT",
}

export default function Delete() {
	const { data: session } = useSession();

	const [submitted, setSubmitted] = useState(false);

	const router = useRouter();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			delete: "",
		},

		validate: {
			email: value => value.trim() != session?.user.email && "Incorrect email",
			delete: value => value.trim() != typeDelete.ACCOUNT && `Enter '${typeDelete.ACCOUNT}' to proceed`,
		},
	});

	const parse = (rawData: typeAccountDelete) => {
		return {
			password: rawData.password,
		};
	};

	const handleSignOut = async () =>
		await signOut({ redirect: false })
			.then(() => window.localStorage.clear())
			.then(() => window.location.replace("/"));

	const handleSubmit = async (formValues: typeAccountDelete) => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/settings/delete`, {
					method: "POST",
					body: JSON.stringify({ ...parse(formValues), userId: session?.user.id }),
					headers: { "Content-Type": "application/json", Accept: "application/json" },
				});

				const result = await response.json();

				if (!result) {
					notifications.show({
						id: "account-deletion-failed-no-response",
						icon: <IconX size={16} stroke={1.5} />,
						title: "Server Unavailable",
						message: `There was no response from the server.`,
						variant: "failed",
					});
				} else {
					if (!result.user.exists) {
						notifications.show({
							id: "password-reset-failed-not-found",
							icon: <IconX size={16} stroke={1.5} />,
							title: `Not Found`,
							message: `The account is not valid.`,
							variant: "failed",
						});

						form.reset();
						await handleSignOut();
					} else {
						if (!result.user.password.match) {
							notifications.show({
								id: "password-reset-failed-not-found",
								icon: <IconX size={16} stroke={1.5} />,
								title: `Authentication Error`,
								message: `Incorrect password provided.`,
								variant: "failed",
							});

							form.reset();
						} else {
							notifications.show({
								id: "account-deletion-success",
								icon: <IconCheck size={16} stroke={1.5} />,
								title: "Account Deleted",
								message: "Your account has been successfully deleted",
								variant: "success",
							});

							form.reset();
							await handleSignOut();
						}
					}
				}
			} catch (error) {
				notifications.show({
					id: "account-deletion-failed",
					icon: <IconX size={16} stroke={1.5} />,
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
			<Grid gutter={"xs"}>
				<GridCol span={{ base: 12 }}>
					<TextInput
						required
						label={"Email"}
						placeholder="Your Email"
						description={`Enter ${session?.user.email} to proceed`}
						{...form.getInputProps("email")}
					/>
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<PasswordInput
						required
						label={"Password"}
						placeholder="Your Password"
						description="Leave empty if you signed in without password (i.e. Google Signin)"
						{...form.getInputProps("password")}
					/>
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<TextInput
						required
						label={"Prompt"}
						placeholder={typeDelete.ACCOUNT}
						description={`Enter '${typeDelete.ACCOUNT}' to proceed`}
						{...form.getInputProps("delete")}
					/>
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<Group justify="end">
						<Button type="submit" color="red.6" variant="light" loading={submitted}>
							{submitted ? "Deleting" : "Delete Account"}
						</Button>
					</Group>
				</GridCol>
			</Grid>
		</Box>
	);
}
