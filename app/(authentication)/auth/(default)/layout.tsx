import React from "react";

import NextImage from "next/image";
import Link from "next/link";

import { Anchor, Center, Grid, GridCol, Group, Image, Stack, Text, Title } from "@mantine/core";

import LayoutBody from "@/layouts/Body";
import HeaderAuth from "@/partials/headers/Auth";
import FooterMain from "@/partials/footers/Main";

import images from "@/assets/images";
import contact from "@/data/contact";

export interface typeParams {
	userId: string;
	token: string;
}

export default function LayoutDefault({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutBody header={<HeaderAuth />} footer={<FooterMain />}>
			<Center>{children}</Center>
		</LayoutBody>
	);
}
