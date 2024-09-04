"use client";

import { Modal, Button, Stack, Text, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import FormUserAccountDelete from "@/partials/forms/user/settings/Delete";

export default function Account() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} centered title="Account Erasure" size={"lg"}>
				<Stack>
					<Text>
						Deleting your account will permanently remove all data associated with it.
						<br />
						<Text component="span" inherit c="red.6">
							Proceed with caution. This action is irreversible.
						</Text>
					</Text>

					<Divider />

					<FormUserAccountDelete />
				</Stack>
			</Modal>

			<Button color="red.6" variant="light" onClick={open}>
				Delete Account
			</Button>
		</>
	);
}
