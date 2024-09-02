"use client";

import React, { useRef, useState } from "react";

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

import classes from "./Variant.module.scss";

import { typeProduct } from "@/types/product";
import { notifications } from "@mantine/notifications";

import OperatorCart from "@/components/operators/Cart";
import OperatorWishlist from "@/components/operators/Wishlist";

import handlerVariant from "@/handlers/variant";

export default function Variant({ data }: { data: typeProduct }) {
	const variant = data.variants[0];

	const [valueChip, setValueChip] = useState(variant.unitValue);

	const handlersRef = useRef<NumberInputHandlers>(null);
	const [valueNumber, setValueNumber] = useState<string | number>(1);

	const variantControlled = data.variants.find(v => v.unitValue == valueChip);

	return (
		<Stack>
			<ChipGroup multiple={false} value={valueChip} onChange={setValueChip}>
				<Group mt={"sm"}>
					{data.variants.map(variant => (
						<Chip radius={"md"} size="lg" key={variant.id} value={variant.unitValue}>
							{variant.unitValue} {handlerVariant.getUnit(variant)}
						</Chip>
					))}
				</Group>
			</ChipGroup>

			<Group gap={0}>
				<ActionIcon
					variant="outline"
					color={"gray"}
					size={36}
					className={classes.actionIconLeft}
					onClick={() => handlersRef.current?.decrement()}
					style={{
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						position: "relative",
						right: -1,
						border: "1px solid var(--mantine-color-default-border)",
					}}
				>
					<IconMinus size={16} stroke={1.5} />
				</ActionIcon>
				<NumberInput
					required
					min={1}
					max={99}
					defaultValue={valueNumber}
					onChange={setValueNumber}
					clampBehavior="strict"
					aria-label="quantity"
					allowNegative={false}
					allowDecimal={false}
					handlersRef={handlersRef}
					hideControls
					classNames={{ input: classes.input }}
					styles={{
						input: { borderRadius: 0, height: 32, width: 42, textAlign: "center" },
					}}
				/>
				<ActionIcon
					variant="outline"
					color={"gray"}
					size={36}
					className={classes.actionIconRight}
					onClick={() => handlersRef.current?.increment()}
					style={{
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						position: "relative",
						left: -1,
						border: "1px solid var(--mantine-color-default-border)",
					}}
				>
					<IconPlus size={16} stroke={1.5} />
				</ActionIcon>
			</Group>

			<Group>
				<OperatorCart
					operation={{
						type: "add",
						items: [variantControlled ? variantControlled : variant],
						quantity: valueNumber as number,
					}}
				>
					<Button size={"md"} leftSection={<IconShoppingCart size={20} stroke={1.5} />}>
						Add to Cart
					</Button>
				</OperatorCart>

				<OperatorWishlist
					operation={{
						type: "add",
						items: [variantControlled ? variantControlled : variant],
					}}
				>
					<Tooltip label={"Add to Wishlist"} withArrow fz={"sm"}>
						<ActionIcon size={40} color="gray" variant="light">
							<IconHeart size={20} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</OperatorWishlist>
			</Group>
		</Stack>
	);
}
