"use client";

import React, { SetStateAction, useCallback, useEffect, useState } from "react";

import ContextProducts from "@/contexts/Products";

import { typeOrder } from "@/types/order";
import { typeCart } from "@/types/cart";

import dataWishlist from "@/data/wishlist";
import dataCart from "@/data/cart";
import dataOrders from "@/data/orders";
import { typeWishlist } from "@/types/wishlist";

export default function Products({ children }: { children: React.ReactNode }) {
	const [wishlist, setWishlist] = useState<typeWishlist[]>(dataWishlist);
	const [cart, setCart] = useState<typeCart[]>(dataCart);
	const [orders, setOrders] = useState<typeOrder[]>(dataOrders);

	return (
		<ContextProducts.Provider value={{ wishlist, setWishlist, cart, setCart, orders, setOrders }}>
			{children}
		</ContextProducts.Provider>
	);
}
