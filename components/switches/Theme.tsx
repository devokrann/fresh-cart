"use client";

import React from "react";

import { Switch, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function Theme() {
	const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
	const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });

	return (
		<Switch
			size="xs"
			radius={"md"}
			defaultChecked={colorScheme == "dark" ? true : false}
			offLabel={<IconMoonStars size={12} stroke={2} />}
			onLabel={<IconSun size={12} stroke={2} />}
			onChange={() => setColorScheme(computedColorScheme == "dark" ? "light" : "dark")}
		/>
	);
}
