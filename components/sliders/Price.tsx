"use client";

import React, { useState } from "react";

import { NumberFormatter, RangeSlider, Stack, Text } from "@mantine/core";
import products from "@/data/products";

export default function Price() {
	const getMinPrice = () => {
		let min = 0;

		products.map(p => {
			if (min == 0 || p.price.present < min) {
				min = p.price.present;
			}
		});

		return min;
	};

	const getMaxPrice = () => {
		let max = 0;

		products.map(p => {
			if (max == 0 || p.price.present > max) {
				max = p.price.present;
			}
		});

		return max;
	};

	const [range, setRange] = useState<[number, number]>([getMinPrice(), getMaxPrice()]);

	return (
		<Stack gap={"xs"} fz={"xs"}>
			<RangeSlider
				label={null}
				minRange={(getMaxPrice() - getMinPrice()) / 5}
				min={getMinPrice()}
				max={getMaxPrice()}
				step={1}
				defaultValue={[getMinPrice() * 3, getMaxPrice() * 0.8]}
				onChange={setRange}
			/>

			<Text inherit>
				Price:{" "}
				<Text component="span" inherit fz={"sm"} fw={500}>
					<NumberFormatter prefix="$" value={Math.floor(range[0])} />
				</Text>{" "}
				-{" "}
				<Text component="span" inherit fz={"sm"} fw={500}>
					<NumberFormatter prefix="$" value={Math.ceil(range[1])} />
				</Text>
			</Text>
		</Stack>
	);
}
