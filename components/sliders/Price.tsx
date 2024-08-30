"use client";

import React, { useEffect, useState } from "react";

import { NumberFormatter, RangeSlider, Skeleton, Stack, Text } from "@mantine/core";
import { typeProduct } from "@/types/product";
import getProducts from "@/handlers/database/getProducts";

export default function Price() {
	const [data, setData] = useState<typeProduct[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setData(await getProducts());
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	let variant;

	const getMinPrice = () => {
		let min = 0;

		data?.map(p => {
			variant = p.variants[0];

			if (min == 0 || variant.pricePresent < min) {
				min = variant.pricePresent;
			}
		});

		return min;
	};

	const getMaxPrice = () => {
		let max = 0;

		data?.map(p => {
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
			{loading ? (
				<Skeleton height={24} />
			) : (
				data && (
					<RangeSlider
						label={null}
						minRange={(getMaxPrice() - getMinPrice()) / 5}
						min={getMinPrice()}
						max={getMaxPrice()}
						step={1}
						defaultValue={[defaults.min, defaults.max]}
						onChange={setRange}
					/>
				)
			)}

			{loading ? (
				<Skeleton height={16} width={120} />
			) : (
				data && (
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
				)
			)}
		</Stack>
	);
}
