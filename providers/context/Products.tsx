"use client";

import React, { useEffect, useState } from "react";

import ContextProducts from "@/contexts/Products";

import { typeProduct } from "@/types/product";
import getProducts from "@/handlers/database/getProducts";

export default function Products({ children }: { children: React.ReactNode }) {
	const [products, setProducts] = useState<typeProduct[] | null>(null);
	const [productsLoading, setProductsLoading] = useState(true);

	useEffect(() => {
		const setInitialProducts = async () => {
			// fetch wishlist data asynchronously then set wishlist
			setProducts(await getProducts());
			setProductsLoading(false);
		};

		setInitialProducts();
	}, []);

	return <ContextProducts.Provider value={{ products, setProducts }}>{children}</ContextProducts.Provider>;
}
