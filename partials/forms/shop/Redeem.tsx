"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, Center, Grid, GridCol, Stack, Text, TextInput, Transition } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconX } from "@tabler/icons-react";

import email from "@/libraries/validators/special/email";

interface typeRedeem {
	code: string;
}

export default function Redeem() {
	const router = useRouter();

	const [sending, setSending] = useState(false);

	const form = useForm({
		initialValues: { code: "" },
		validate: { code: value => value.length != 12 && "Invalid code" },
	});

	const parse = (rawData: typeRedeem) => {
		return { email: rawData.code };
	};

	const handleSubmit = async (formValues: typeRedeem) => {
		try {
			if (form.isValid()) {
				setSending(true);

				// // test request body
				// console.log(parse(formValues));

				// const res = await request.post(process.env.NEXT_PUBLIC_API_URL + `/api/auth/password/forgot`, {
				// 	method: "POST",
				// 	body: JSON.stringify(parse(formValues)),
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 		Accept: "application/json",
				// 	},
				// });

				// if (!res) {
				// 	notifications.show({
				// 		id: "password-forgot-failed-no-response",
				// 		icon: <IconX size={16} stroke={1.5} />,
				// 		title: "Server Unavailable",
				// 		message: `There was no response from the server.`,
				// 		variant: "failed",
				// 	});
				// } else {
				// 	if (!res.user.exists) {
				// 		notifications.show({
				// 			id: "password-forgot-failed-not-found",
				// 			icon: <IconX size={16} stroke={1.5} />,
				// 			title: `Not Found`,
				// 			message: `No account with the provided email exists.`,
				// 			variant: "failed",
				// 		});

				// 		form.reset();

				// 		// redirect to sign up page
				// 		router.replace("/auth/sign-up");
				// 	} else {
				// 		if (!res.user.otl.exists) {
				// 			form.reset();

				// 			// redirect to notification page
				// 			router.replace("/api/auth/verify-request");
				// 		} else {
				// 			if (!res.user.otl.expired) {
				// 				if (!res.user.otl.valid) {
				// 					// reset time
				// 					setTime(converter.millSec(res.user.otl.expiry));
				// 				} else {
				// 					setTime(undefined);
				// 					form.reset();

				// 					// redirect to notification page
				// 					router.replace("/api/auth/verify-request");
				// 				}
				// 			} else {
				// 				setTime(undefined);
				// 				form.reset();

				// 				// redirect to notification page
				// 				router.replace("/api/auth/verify-request");
				// 			}
				// 		}
				// 	}
				// }
			}
		} catch (error) {
			notifications.show({
				id: "password-forgot-failed",
				icon: <IconX size={16} stroke={1.5} />,
				title: `Send Failed`,
				message: (error as Error).message,
				variant: "failed",
			});

			form.reset();
		} finally {
			setSending(false);
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Grid gutter={"xs"}>
				<GridCol span={{ base: 12, sm: 12 }}>
					<TextInput required placeholder="Promo or Gift Card" {...form.getInputProps("code")} />
				</GridCol>
				<GridCol span={{ base: 12 }}>
					<Button fullWidth type="submit" variant="outline" color="gray" loading={sending}>
						{sending ? "Redeeming" : "Redeem"}
					</Button>
				</GridCol>
			</Grid>
		</Box>
	);
}
