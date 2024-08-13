"use client";

import React, { useContext } from "react";

import { ActionIcon, Center, Indicator, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import ContextProducts from "@/contexts/Products";

export default function Products({ children, variant }: { children: React.ReactNode; variant: "wishlist" | "cart" }) {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { wishlist, cart } = productsContext;

	const selector = () => {
		switch (variant) {
			case "wishlist":
				return wishlist;
			case "cart":
				return cart;
		}
	};

	return (
		<Indicator
			disabled={selector().length < 1}
			offset={4}
			size={"xl"}
			label={
				selector().length > 0 ? (
					<Text component="span" inherit fz={10}>
						{selector().length}
					</Text>
				) : undefined
			}
		>
			{children}
		</Indicator>
	);
}
