"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Autocomplete, Box, Button, Grid, GridCol, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";

import request from "@/hooks/request";

import classes from "./Main.module.scss";

export default function Main() {
	const [sending, setSending] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			query: "",
		},
	});

	const parse = (rawData: { query: string }) => {
		return {
			query: rawData.query,
		};
	};

	const handleSubmit = async (formValues: any) => {
		try {
			if (form.isValid()) {
				setSending(true);

				// await request
				// 	.post(`http://localhost:3000/api/${params.userId}/settings/account/password`, {
				// 		method: "POST",
				// 		body: JSON.stringify(parse(formValues)),
				// 		headers: {
				// 			"Content-Type": "application/json",
				// 			Accept: "application/json",
				// 		},
				// 	})
				// 	.then((res: any) => {
				// 		if (!res) {
				// 			notifications.show({
				// 				id: "password-reset-failed-no-response",
				// 				icon: <IconX size={16} stroke={1.5} />,
				// 				autoClose: 5000,
				// 				title: "Server Unavailable",
				// 				message: `There was no response from the server.`,
				// 				variant: "failed",
				// 			});
				// 		} else {
				// 			if (!res.user) {
				// 				notifications.show({
				// 					id: "password-reset-failed-not-found",
				// 					icon: <IconX size={16} stroke={1.5} />,
				// 					autoClose: 5000,
				// 					title: `Not Found`,
				// 					message: `The account is not valid.`,
				// 					variant: "failed",
				// 				});
				// 			} else {
				// 				if (!res.user.match) {
				// 					notifications.show({
				// 						id: "password-reset-failed-unauthorized",
				// 						icon: <IconX size={16} stroke={1.5} />,
				// 						autoClose: 5000,
				// 						title: `Authentication Error`,
				// 						message: `You've entered the wrong password.`,
				// 						variant: "failed",
				// 					});
				// 				} else {
				// 					notifications.show({
				// 						id: "password-reset-success",
				// 						withCloseButton: false,
				// 						icon: <IconCheck size={16} stroke={1.5} />,
				// 						autoClose: 5000,
				// 						title: "Password Changed",
				// 						message: `You have successfully cahnged your password.`,
				// 						variant: "success",
				// 					});
				// 				}

				// 				form.reset();
				// 			}
				// 		}
				// 	});
			}
		} catch (error) {
			notifications.show({
				id: "password-reset-failed",
				icon: <IconX size={16} stroke={1.5} />,
				autoClose: 5000,
				title: `Send Failed`,
				message: (error as Error).message,
				variant: "failed",
			});
		} finally {
			setSending(false);
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Group grow gap={0} preventGrowOverflow={false} wrap="nowrap">
				<Autocomplete
					required
					placeholder="Search by title, author, category, etc."
					{...form.getInputProps("passwordCurrent")}
					classNames={{ input: classes.inputInput }}
					w={"100%"}
					data={["React", "Angular", "Vue", "Svelte"]}
				/>
				<Button type="submit" color="pri" loading={sending} classNames={{ root: classes.buttonRoot }}>
					<IconSearch size={16} />
				</Button>
			</Group>
		</Box>
	);
}
