"use client";

import React, { useContext } from "react";

import CardProductShopGrid from "../card/product/shop/Grid";

import { Carousel, CarouselSlide } from "@mantine/carousel";

import classes from "./Shop.module.scss";
import { Skeleton } from "@mantine/core";
import { typeProduct } from "@/types/product";

export default function Shop({ data }: { data: typeProduct[] }) {
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
			{data.map(product => (
				<CarouselSlide key={product.title} pb={64} px={"xs"}>
					<CardProductShopGrid data={product} />
				</CarouselSlide>
			))}
		</Carousel>
	);
}
