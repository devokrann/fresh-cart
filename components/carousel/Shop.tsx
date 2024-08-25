import products from "@/data/products";
import React from "react";

import CardProductShopGrid from "../card/product/shop/Grid";

import { Carousel, CarouselSlide } from "@mantine/carousel";

import classes from "./Shop.module.scss";

export default function Shop() {
	return (
		<Carousel
			withIndicators
			withControls={false}
			slideSize={{ md: "25%", lg: "16.66666%" }}
			align={"start"}
			classNames={classes}
			loop
		>
			{products.map(product => (
				<CarouselSlide key={product.title} pb={64} px={"xs"}>
					<CardProductShopGrid data={product} />
				</CarouselSlide>
			))}
		</Carousel>
	);
}
