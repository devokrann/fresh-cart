import React from "react";

import Link from "next/link";
import NextImage from "next/image";

import { Anchor, Group, Image, Text } from "@mantine/core";
import images from "@/assets/images";

export default function Landscape() {
	return (
		<Anchor underline="never" component={Link} c={"dark.4"} href={"/"}>
			<Group gap={"xs"}>
				<Image
					src={images.brand.icon}
					alt="FreshCart"
					h={{ sm: 32, md: 40 }}
					component={NextImage}
					width={1920}
					height={1080}
					priority
				/>
				<Text inherit component="span" fz={"xl"} fw={"bold"}>
					FreshCart
				</Text>
			</Group>
		</Anchor>
	);
}
