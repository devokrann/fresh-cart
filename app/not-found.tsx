import React from "react";

import Link from "next/link";
import NextImage from "next/image";

import { Anchor, Center, Grid, GridCol, Group, Stack, Text, Title, Image, Button, Flex } from "@mantine/core";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import LayoyutSection from "@/layouts/Section";

import PartialBrandLandscape from "@/partials/brand/Landscape";
import images from "@/assets/images";

export default function NotFound() {
	return (
		<LayoyutSection containerized="md">
			<Center mih={"100vh"} w={"100%"} py={96}>
				<Grid w={"100%"} align="center">
					<GridCol span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
						<Flex direction={"column"} align={{ base: "center", md: "start" }} gap={"xl"}>
							<PartialBrandLandscape />

							<Stack gap={"xs"}>
								<Title
									fz={{ base: "xl", sm: 32, md: 36 }}
									order={1}
									ta={{ base: "center", md: "start" }}
								>
									Something&apos;s wrong here...
								</Title>
								<Stack gap={0}>
									<Text ta={{ base: "center", md: "start" }} fz={"sm"}>
										We can&apos;t find the page you&apos;re looking for.
									</Text>
									<Text ta={{ base: "center", md: "start" }} fz={"sm"}>
										Check out our help center or head back to home.
									</Text>
								</Stack>
							</Stack>

							<Group>
								<Button component={Link} href={"/"} color="pri">
									Back to Home
								</Button>
								<Button
									component={Link}
									href={"#/help-center"}
									variant="outline"
									rightSection={<IconArrowRight size={16} stroke={1.5} />}
								>
									Help Center
								</Button>
							</Group>
						</Flex>
					</GridCol>
					<GridCol span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
						<Stack h={{ base: 160, sm: 240 }}>
							<Image
								src={images.error.err404}
								alt={"Not Found"}
								component={NextImage}
								priority
								width={1920}
								height={1080}
							/>
						</Stack>
					</GridCol>
				</Grid>
			</Center>
		</LayoyutSection>
	);
}
