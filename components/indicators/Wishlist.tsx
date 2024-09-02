"use client";

import React, { useContext } from "react";

import { ActionIcon, Box, Center, Indicator, Skeleton, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import ContextWishlist from "@/contexts/user/Wishlist";

export default function Wishlist({ children }: { children: React.ReactNode }) {
	const wishlistContext = useContext(ContextWishlist);

	if (!wishlistContext) {
		throw new Error("ChildComponent must be used within the ContextWishlist.Provider");
	}

	const { wishlist, setWishlist } = wishlistContext;

	return !wishlist ? (
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
					{wishlist.length}
				</Text>
			}
		>
			{children}
		</Indicator>
	);
}
