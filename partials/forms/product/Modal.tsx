"use client";

import React, { useRef } from "react";

import {
	ActionIcon,
	Button,
	Chip,
	ChipGroup,
	Group,
	NumberInput,
	NumberInputHandlers,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { IconHeart, IconMinus, IconPlus, IconShoppingCart, IconShoppingCartPlus } from "@tabler/icons-react";

import classes from "./Modal.module.scss";

import { typeProduct } from "@/types/product";
import { notifications } from "@mantine/notifications";

export default function Modal({ data }: { data: typeProduct }) {
	const handlersRef = useRef<NumberInputHandlers>(null);

	const form = useForm({
		initialValues: {
			capacity: data.variants.capacity ? data.variants.capacity[0] : undefined,
			weight: data.variants.weight ? data.variants.weight[0] : undefined,
			quantity: 1,
		},
	});

	const parse = (values: any) => {
		return {
			weight: values.weight ? Number(values.weight) : values.weight,
			capacity: values.capacity ? Number(values.capacity) : values.capacity,
			quantity: values.quantity,
		};
	};

	const handleSubmit = async (values: any) => {
		if (form.isValid()) {
			const parsedValues = parse(values);

			console.log("Weight:", parsedValues.weight);
			console.log("Capacity:", parsedValues.capacity);

			console.log(parsedValues.quantity);

			notifications.show({
				id: `${form.values.quantity}-${form.values.weight ? form.values.weight : form.values.capacity}`,
				icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
				title: `Product${form.values.quantity > 1 ? "s" : ""} Added`,
				autoClose: 4000,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						has been sent to your cart
					</Text>
				),
				variant: "success",
			});
		}
	};

	return (
		<form onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Stack gap={"lg"}>
				{data.variants.capacity && (
					<ChipGroup {...form.getInputProps(`capacity`)}>
						<Group mt={"sm"}>
							{data.variants.capacity.map(variant => (
								<Chip
									radius={"md"}
									key={variant}
									value={`${variant}`}
									checked={
										data.variants.capacity &&
										data.variants.capacity[data.variants.capacity.indexOf(variant)] ==
											form.values.capacity
									}
								>
									{variant}ml
								</Chip>
							))}
						</Group>
					</ChipGroup>
				)}

				{data.variants.weight && (
					<ChipGroup {...form.getInputProps(`weight`)}>
						<Group mt={"sm"}>
							{data.variants.weight.map(variant => (
								<Chip
									radius={"md"}
									key={variant}
									value={`${variant}`}
									checked={
										data.variants.weight &&
										data.variants.weight[data.variants.weight.indexOf(variant)] ==
											form.values.weight
									}
								>
									{variant}g
								</Chip>
							))}
						</Group>
					</ChipGroup>
				)}

				<Group gap={0}>
					<ActionIcon
						variant="outline"
						color="gray.4"
						mr={-1}
						c={"gray.6"}
						size={36}
						className={classes.actionIconLeft}
						onClick={() => handlersRef.current?.decrement()}
					>
						<IconMinus size={16} stroke={1.5} />
					</ActionIcon>
					<NumberInput
						required
						min={1}
						max={10}
						defaultValue={1}
						w={40}
						hideControls
						allowNegative={false}
						allowDecimal={false}
						handlersRef={handlersRef}
						classNames={{ input: classes.input }}
						{...form.getInputProps("quantity")}
					/>
					<ActionIcon
						variant="outline"
						color="gray.4"
						ml={-0.5}
						c={"gray.6"}
						size={36}
						className={classes.actionIconRight}
						onClick={() => handlersRef.current?.increment()}
					>
						<IconPlus size={16} stroke={1.5} />
					</ActionIcon>
				</Group>

				<Group>
					<Button
						color="sl.4"
						c={"bg.0"}
						size={"md"}
						leftSection={<IconShoppingCart size={20} stroke={1.5} />}
						type="submit"
					>
						Add to Cart
					</Button>
					<Tooltip label={"Add to Wishlist"} withArrow fz={"sm"}>
						<ActionIcon size={40} color="gray.6" variant="light" c={"gray.6"}>
							<IconHeart size={20} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Stack>
		</form>
	);
}
