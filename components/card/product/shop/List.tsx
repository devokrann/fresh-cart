"use client";

import React, { useContext } from "react";

import NextImage from "next/image";
import Link from "next/link";

import {
	Title,
	Image,
	Card,
	CardSection,
	Stack,
	Text,
	Anchor,
	Group,
	Rating,
	Button,
	Badge,
	ActionIcon,
	Tooltip,
	Grid,
	GridCol,
} from "@mantine/core";

import {
	IconEye,
	IconHeart,
	IconPlus,
	IconShoppingCart,
	IconShoppingCartPlus,
	IconShoppingCartX,
} from "@tabler/icons-react";

import ModalProduct from "../../../modal/Product";

import link from "@/handlers/parsers/string/link";
import getFraction from "@/handlers/fraction";

import classes from "./List.module.scss";

import { typeProduct } from "@/types/product";

import ContextProducts from "@/contexts/Products";
import { notifications } from "@mantine/notifications";

export default function List({ data }: { data: typeProduct }) {
	const productsContext = useContext(ContextProducts);

	if (!productsContext) {
		throw new Error("ChildComponent must be used within a MyContext.Provider");
	}

	const { wishlist, setWishlist, cart, setCart } = productsContext;

	const addToWishlist = () => {
		if (!wishlist.find(p => p.title == data.title)?.title) {
			setWishlist([...wishlist, data]);

			notifications.show({
				id: `wishlist-${data.title}`,
				icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
				title: `Added to Wishlist`,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						included in your wishlist
					</Text>
				),
				variant: "success",
			});
		} else {
			notifications.show({
				id: `wishlist-${data.title}`,
				icon: <IconShoppingCartX size={16} stroke={1.5} />,
				title: `Already in Wishlist`,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						already in your wishlist
					</Text>
				),
				variant: "failed",
			});
		}
	};

	const addToCart = () => {
		if (!cart.find(p => p.title == data.title)?.title) {
			setCart([...cart, { ...data, quantity: 1 }]);

			notifications.show({
				id: `cart-${data.title}`,
				icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
				title: `Added to Cart`,
				message: (
					<Text inherit>
						<Text component="span" inherit fw={500} c={"sl.4"}>
							{data.title}
						</Text>{" "}
						included in your cart
					</Text>
				),
				variant: "success",
			});
		} else {
			const currentProduct = cart.find(p => p.title == data.title);

			if (currentProduct) {
				if (currentProduct.quantity) {
					currentProduct.quantity = currentProduct.quantity + 1;
				}

				setCart(
					cart.map(p => {
						if (p.title == data.title) {
							if (p.category) {
								return { ...p, category: p.category + 1 };
							} else {
								return p;
							}
						} else {
							return p;
						}
					})
				);

				notifications.show({
					id: `cart-${data.title}`,
					icon: <IconShoppingCartPlus size={16} stroke={1.5} />,
					title: `Added to Cart`,
					message: (
						<Text inherit>
							<Text component="span" inherit fw={500} c={"sl.4"}>
								{data.title}
							</Text>{" "}
							included in your cart
						</Text>
					),
					variant: "success",
				});
			}
		}
	};

	const icons = [
		{ title: "Add to Wishlist", icon: IconHeart, action: addToWishlist },
		{ title: "Add to Cart", icon: IconShoppingCart, action: addToCart },
	];

	return (
		<Card className={classes.card}>
			<Grid align="center">
				<GridCol span={{ md: 3 }}>
					<CardSection pos={"relative"}>
						<Stack p={"xl"}>
							<Image
								src={data.image}
								alt={data.title}
								w={"100%"}
								radius={"md"}
								component={NextImage}
								width={1920}
								height={1080}
								priority
							/>
						</Stack>

						<Stack className={classes.overlay}>
							{data.badge && (
								<Badge color={`${data.badge.color}.9`} radius={"md"} c={"bg.0"}>
									{data.badge.label}
								</Badge>
							)}
						</Stack>
					</CardSection>
				</GridCol>
				<GridCol span={{ md: 9 }}>
					<Stack>
						<Stack gap={"xs"}>
							<Stack gap={4}>
								<Text fz={"sm"} c={"dimmed"}>
									{data.category}
								</Text>
								<Anchor
									underline="never"
									component={Link}
									href={`/blog/${link.linkify(data.title)}`}
									className={classes.link}
								>
									<Title order={3} fz={"md"} fw={"bold"}>
										{data.title}
									</Title>
								</Anchor>
							</Stack>

							<Group gap={4} fz={"xs"} c={"dimmed"}>
								<Rating value={data.rating.value} fractions={getFraction(data.rating.value)} readOnly />
								<Text inherit lh={0.5}>
									{data.rating.value}
								</Text>
								<Text inherit lh={0.5}>
									({data.rating.raters})
								</Text>
							</Group>
						</Stack>

						<Stack gap={"xs"}>
							<Group justify="space-between" mt={"xs"}>
								<Group gap={4}>
									<Text inherit lh={0.5}>
										${data.price.present}
									</Text>
									{data.price.former && (
										<Text inherit lh={0.5} c={"dimmed"} td={"line-through"}>
											${data.price.former}
										</Text>
									)}
								</Group>

								<Button
									size="xs"
									color="sl.4"
									c={"bg.0"}
									leftSection={<IconPlus size={16} stroke={1.5} />}
								>
									Add
								</Button>
							</Group>

							<Group>
								<ModalProduct data={data} />

								{icons.map(icon => (
									<Tooltip key={icon.title} label={icon.title} withArrow fz={"sm"}>
										<ActionIcon size={32} onClick={icon.action}>
											<icon.icon size={20} stroke={1.5} />
										</ActionIcon>
									</Tooltip>
								))}
							</Group>
						</Stack>
					</Stack>
				</GridCol>
			</Grid>
		</Card>
	);
}
