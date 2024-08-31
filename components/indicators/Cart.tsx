"use client";

import React, { useContext } from "react";

import { ActionIcon, Box, Center, Indicator, Skeleton, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import ContextCart from "@/contexts/user/Cart";

export default function Cart({ children }: { children: React.ReactNode }) {
	const cartContext = useContext(ContextCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within the ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	return !cart ? (
		<Box pos={"relative"}>
			<Skeleton width={16} height={16} pos={"absolute"} top={-4} right={-4} />

			{children}
		</Box>
	) : (
		<Indicator
			offset={4}
			size={"xl"}
			label={
				<Text component="span" inherit fz={10}>
					{cart.length}
				</Text>
			}
		>
			{children}
		</Indicator>
	);
}
