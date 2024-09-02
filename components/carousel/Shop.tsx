"use client";

import React, { useContext } from "react";

import CardProductShopGrid from "../card/product/shop/Grid";

import { Carousel, CarouselSlide } from "@mantine/carousel";

import classes from "./Shop.module.scss";
import ContextProducts from "@/contexts/Products";
import { Skeleton } from "@mantine/core";

export default function Shop() {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a ContextProducts.Provider");
	}

	const { products, setProducts } = productsContext;

	const skeletons = [
		{
			id: "1",
			element: <Skeleton height={480} />,
		},
		{
			id: "2",
			element: <Skeleton height={480} />,
		},
		{
			id: "3",
			element: <Skeleton height={480} />,
		},
		{
			id: "4",
			element: <Skeleton height={480} />,
		},
		{
			id: "5",
			element: <Skeleton height={480} />,
		},
		{
			id: "6",
			element: <Skeleton height={480} />,
		},
	];

	return (
		<Carousel
			withIndicators
			withControls={false}
			slideSize={{ md: "25%", lg: "16.66666%" }}
			align={"start"}
			classNames={classes}
			loop
		>
			{!products
				? skeletons.map(s => (
						<CarouselSlide key={s.id} pb={64} px={"xs"}>
							{s.element}
						</CarouselSlide>
				  ))
				: products.map(product => (
						<CarouselSlide key={product.title} pb={64} px={"xs"}>
							<CardProductShopGrid data={product} />
						</CarouselSlide>
				  ))}
		</Carousel>
	);
}
