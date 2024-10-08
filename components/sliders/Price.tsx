"use client";

import React, { useContext, useEffect, useState } from "react";

import { NumberFormatter, RangeSlider, Skeleton, Stack, Text } from "@mantine/core";
import { typeProduct } from "@/types/product";

export default function Price({ data }: { data: typeProduct[] }) {
	let variant;

	const getMinPrice = () => {
		let min = 0;

		data.map(p => {
			variant = p.variants[0];

			if (min == 0 || variant.pricePresent < min) {
				min = variant.pricePresent;
			}
		});

		return min;
	};

	const getMaxPrice = () => {
		let max = 0;

		data.map(p => {
			variant = p.variants[0];

			if (max == 0 || variant.pricePresent > max) {
				max = variant.pricePresent;
			}
		});

		return max;
	};

	const defaults = { min: getMinPrice() * 3, max: getMaxPrice() * 0.8 };

	const [range, setRange] = useState<[number, number]>([defaults.min, defaults.max]);

	return (
		<Stack gap={"xs"} fz={"xs"}>
			<RangeSlider
				label={null}
				minRange={(getMaxPrice() - getMinPrice()) / 5}
				min={getMinPrice()}
				max={getMaxPrice()}
				step={1}
				defaultValue={[defaults.min, defaults.max]}
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
