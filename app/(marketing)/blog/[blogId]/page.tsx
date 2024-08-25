import React from "react";

import Link from "next/link";
import NextImage from "next/image";

import { Anchor, Divider, Group, Stack, Text, Title, Image } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";

import link from "@/handlers/parsers/string/link";

import classes from "./Blog.module.scss";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

import { typeParams } from "../layout";

import blog from "@/data/blog";

export default function Post({ params }: { params: typeParams }) {
	const data = blog.find(p => link.linkify(p.title) == params.blogId);

	const elementQuote = (
		<Stack gap={"xl"} my={"xl"} ta={"center"}>
			<Divider />

			<Stack align="center">
				<Text inherit c={"sl.4"} fz={36} fw={500} lh={1.2} w={{ md: "80%" }}>
					&quot;{data?.description.quote.text}&quot;
				</Text>
				<Text inherit c={"dimmed"}>
					- {data?.description.quote.person}
				</Text>
			</Stack>

			<Divider />
		</Stack>
	);

	const iconsShare = [
		{
			icon: IconBrandFacebook,
			label: "Facebook",
			link: "facebook",
		},
		{
			icon: IconBrandTwitter,
			label: "Twitter",
			link: "twitter",
		},
		{
			icon: IconBrandLinkedin,
			label: "LinkedIn",
			link: "linkedin",
		},
	];

	return (
		<LayoutPage padded stacked="xl">
			<LayoutSection containerized={"md"}>
				<Stack gap={"xl"}>
					<Stack align="center">
						<Anchor
							underline="never"
							component={Link}
							href={data?.category ? `#/blog/category/${link.linkify(data.category)}` : "#"}
						>
							<Text className={classes.category} fw={500}>
								{data?.category}
							</Text>
						</Anchor>

						<Title order={2} className={classes.title}>
							{data?.title}
						</Title>

						<Group justify="center" fz={"xs"} c={"dimmed"}>
							<Text inherit>{data?.date}</Text>
							<Divider orientation="vertical" />
							<Text inherit>
								Read time:{" "}
								<Text component="span" inherit fw={"bold"}>
									{data?.length} min
								</Text>
							</Text>
						</Group>
					</Stack>

					<Image
						src={data?.image}
						alt={data?.title ? data.title : "Blog Image"}
						h={{ base: 240, md: 360 }}
						radius={"md"}
						component={NextImage}
						width={1920}
						height={1080}
						priority
						className={classes.image}
					/>

					<Stack gap={"xs"}>
						{data?.description.prose.map(item =>
							data.description.prose.length > 3 ? (
								data.description.prose.indexOf(item) == 3 ? (
									elementQuote
								) : (
									<Text key={item}>{item}</Text>
								)
							) : (
								<Text key={item}>{item}</Text>
							)
						)}
					</Stack>

					<Stack gap={"lg"}>
						<Divider />

						<Group justify="space-between">
							<Group gap={"xs"}>
								<Image
									src={data?.author.image}
									alt={data?.title ? data.title : "Blog Author Image"}
									h={{ base: 44, md: 44 }}
									radius={99}
									component={NextImage}
									width={1920}
									height={1080}
									loading="lazy"
									className={classes.image}
								/>

								<Stack gap={0} mt={4}>
									<Text fz={"lg"} my={0} fw={500} lh={0.8}>
										{data?.author.name}
									</Text>
									<Text fz={"xs"} my={0} fw={500} c={"pl.4"}>
										{data?.author.position}
									</Text>
								</Stack>
							</Group>
							<Group>
								<Text fz={"sm"} c={"dimmed"}>
									Share
								</Text>

								<Group gap={"xs"}>
									{iconsShare.map(icon => (
										<Anchor key={icon.label} href={`#${icon.link}`} title={icon.label} c={"dimmed"}>
											<Group>
												<icon.icon size={20} stroke={1.5} />
											</Group>
										</Anchor>
									))}
								</Group>
							</Group>
						</Group>
					</Stack>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
