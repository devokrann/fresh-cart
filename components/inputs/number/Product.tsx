"use client";

import { typeProduct } from "@/types/product";
import { ActionIcon, Group, NumberInput, NumberInputHandlers } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React, { useContext, useRef, useState } from "react";
import ContextProducts from "@/contexts/Products";

export default function Product({ data }: { data: typeProduct }) {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { cart, setCart } = productsContext;

	const handlersRef = useRef<NumberInputHandlers>(null);

	const [value, setValue] = useState<string | number>(data.quantity ? data.quantity : 1);

	const updateQuantity = (operation: "add" | "subtract") => {
		setCart(
			cart.map(p => {
				if (p.title != data.title) {
					return p;
				} else {
					switch (operation) {
						case "add":
							return { ...p, quantity: typeof value == "number" ? value + 1 : p.quantity };
						case "subtract":
							return { ...p, quantity: typeof value == "number" ? value - 1 : p.quantity };
					}
				}
			})
		);
	};

	const handleDecrement = () => {
		handlersRef.current?.decrement();
		typeof value == "number" && value > 1 && updateQuantity("subtract");
	};
	const handleIncrement = () => {
		handlersRef.current?.increment();
		typeof value == "number" && value < 99 && updateQuantity("add");
	};

	return (
		<Group justify="center" gap={0}>
			<ActionIcon
				onClick={handleDecrement}
				variant="default"
				disabled={value == 1}
				style={{
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
					height: 32,
					position: "relative",
					right: -1,
				}}
			>
				<IconMinus size={12} stroke={2} />
			</ActionIcon>

			<NumberInput
				size="xs"
				min={1}
				max={99}
				clampBehavior="strict"
				defaultValue={value}
				onChange={setValue}
				aria-label="quantity"
				handlersRef={handlersRef}
				hideControls
				styles={{
					input: { borderRadius: 0, height: 32, width: 40, textAlign: "center" },
				}}
			/>

			<ActionIcon
				onClick={handleIncrement}
				variant="default"
				disabled={value == 99}
				style={{
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					height: 32,
					position: "relative",
					left: -1,
				}}
			>
				<IconPlus size={12} stroke={2} />
			</ActionIcon>
		</Group>
	);
}
