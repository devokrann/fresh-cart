import React from "react";

import NextImage from "next/image";

import {
	Card,
	CardSection,
	Stack,
	Image,
	Title,
	Text,
	Group,
	Flex,
	Grid,
	GridCol,
	Anchor,
	AspectRatio,
} from "@mantine/core";

import classes from "./Blog.module.scss";

import { typePost } from "@/types/post";
import link from "@/handlers/parsers/string/link";
import Link from "next/link";

export default function Blog({
	data,
	orientation = "vertical",
}: {
	data: typePost;
	orientation?: "vertical" | "horizontal";
}) {
	return (
		<Grid
			className={classes.card}
			gutter={orientation == "vertical" ? "sm" : "xl"}
			align={orientation == "vertical" ? undefined : "center"}
		>
			<GridCol span={orientation == "vertical" ? 12 : { base: 12, sm: 6, md: 8 }}>
				<Anchor underline="never" component={Link} href={`/blog/${link.linkify(data.title)}`}>
					<div className={classes.imageContainer}>
						<Image
							src={data.image}
							alt={data.title}
							h={orientation == "vertical" ? { base: 240, md: 200 } : { base: 240, md: 400 }}
							component={NextImage}
							width={1920}
							height={1080}
							loading="lazy"
							className={classes.image}
						/>
					</div>
				</Anchor>
			</GridCol>

			<GridCol span={orientation == "vertical" ? 12 : { base: 12, sm: 6, md: 4 }}>
				<Stack
					gap={"sm"}
					align="start"
					h={"100%"}
					px={orientation == "vertical" ? undefined : { base: 0, md: "lg" }}
				>
					<Anchor underline="never" component={Link} href={`/blog/categories/${link.linkify(data.category)}`}>
						<Text className={classes.category} fw={500}>
							{data.category}
						</Text>
					</Anchor>

					<Stack gap={"sm"} justify={orientation == "vertical" ? "space-between" : undefined} h={"100%"}>
						<Stack gap={4} align="start">
							<Anchor underline="never" component={Link} href={`/blog/${link.linkify(data.title)}`}>
								<Title
									order={3}
									className={classes.title}
									fz={orientation == "vertical" ? "lg" : { base: "lg", md: 28 }}
									w={orientation == "vertical" ? { sm: "80%", lg: "100%" } : undefined}
								>
									{data.title}
								</Title>
							</Anchor>
							<Text lineClamp={orientation == "vertical" ? 2 : undefined}>
								{data.description.preview}
							</Text>
						</Stack>

						<Group justify="space-between" fz={"xs"} c={"dimmed"}>
							<Text inherit>{data.date}</Text>
							<Text inherit>
								Read time:{" "}
								<Text component="span" inherit fw={"bold"}>
									{data.length} min
								</Text>
							</Text>
						</Group>
					</Stack>
				</Stack>
			</GridCol>
		</Grid>
	);
}
