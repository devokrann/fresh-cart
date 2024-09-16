"use client";

import React, { useContext, useEffect, useState } from "react";

import NextImage from "next/image";

import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Grid,
	GridCol,
	Group,
	Image,
	NumberInput,
	Overlay,
	Radio,
	RadioGroup,
	Skeleton,
	Stack,
	Text,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";

import { MonthPickerInput } from "@mantine/dates";

import CardPaymentMain from "../card/payment/Main";

import classes from "./Checkout.module.scss";
import {
	IconCheck,
	IconClockHour4,
	IconCreditCardPay,
	IconMapPin,
	IconPackageExport,
	IconX,
} from "@tabler/icons-react";

import { getPaymentCardImage } from "@/utilities/image";

import PaymentMethods from "@/contexts/Payment";
import ContextAddresses from "@/contexts/Addresses";
import { addOrder } from "@/handlers/requests/database/orders";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContextUserCart from "@/contexts/Cart";

export default function Checkout() {
	const paymentMethodsContext = useContext(PaymentMethods);

	const router = useRouter();

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const addressesContext = useContext(ContextAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const cartContext = useContext(ContextUserCart);

	if (!cartContext) {
		throw new Error("ChildComponent must be used within a ContextCart.Provider");
	}

	const { cart, setCart } = cartContext;

	const [checked, setChecked] = useState(false);

	const [billingAddress, setBillingAddress] = useState("");
	const [shippingAddress, setShippingAddress] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [deliveryInstructions, setDeliveryInstructions] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async () => {
		try {
			setSubmitting(true);

			// send post request
			await addOrder({
				orderDetails: {
					deliveryInstructions,
				},
				billingAddressTitle: billingAddress,
				shippingAddressTitle: shippingAddress,
				paymentMethodTitle: paymentMethod,
			});

			// clear cart
			setCart([]);

			// redirect to success page
			router.replace("/shop/checkout/order-placed");
		} catch (e) {
			notifications.show({
				id: "checkout-failed",
				icon: <IconX size={16} stroke={1.5} />,
				title: "Failed",
				message: `Could not place order.`,
				variant: "failed",
			});
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		checked && setShippingAddress("");
	}, [checked]);

	const skeletons = [
		{ key: 1, element: <Skeleton h={200} /> },
		{ key: 2, element: <Skeleton h={200} /> },
	];

	const sections = [
		{
			icon: IconMapPin,
			title: "Billing Address",
			panel: (
				<Stack>
					<Group justify="end">
						<Button size="xs" variant="outline" color="gray" component={Link} href={"/account/addresses"}>
							View Addresses
						</Button>
					</Group>

					<RadioGroup value={billingAddress} onChange={setBillingAddress}>
						<Grid>
							{!addresses
								? skeletons.map(i => (
										<GridCol key={i.key} span={{ md: 6, lg: 4 }}>
											{i.element}
										</GridCol>
								  ))
								: addresses
										?.filter(a => a.type == "billing")
										.map(address => (
											<GridCol key={address.title} span={{ base: 12, md: 6, lg: 4 }}>
												<Radio.Card
													value={address.title}
													key={address.title}
													p={"md"}
													h={"100%"}
												>
													<Group wrap="nowrap" align="flex-start" h={"100%"}>
														<Radio.Indicator />
														<Stack gap={"xs"}>
															<Title order={3} fz={"sm"}>
																{address.title}
															</Title>

															<Stack fz={"sm"} gap={2}>
																<Text
																	inherit
																>{`${address.fname} ${address.fname}`}</Text>
																{address.email && <Text inherit>{address.email}</Text>}
																{address.phone && <Text inherit>{address.phone}</Text>}
																<Text inherit>{address.street}</Text>
																<Text inherit>{address.city}</Text>
																<Text inherit>{address.zip}</Text>
																<Text inherit>{address.country}</Text>
															</Stack>

															{address.default && (
																<Badge size="sm" color={"blue"}>
																	Default Address
																</Badge>
															)}
														</Stack>
													</Group>
												</Radio.Card>
											</GridCol>
										))}
						</Grid>
					</RadioGroup>
				</Stack>
			),
		},
		{
			icon: IconMapPin,
			title: "Delivery Address",
			panel: (
				<Stack>
					<Group justify="space-between">
						<Checkbox
							label="Same as billing address"
							checked={checked}
							onChange={event => setChecked(event.currentTarget.checked)}
						/>

						<Box opacity={checked ? 0 : 1}>
							<Button
								size="xs"
								variant="outline"
								color="gray"
								component={Link}
								href={"/account/addresses"}
							>
								View Addresses
							</Button>
						</Box>
					</Group>

					<RadioGroup value={shippingAddress} onChange={setShippingAddress}>
						<Grid>
							{!checked &&
								(!addresses
									? skeletons.map(i => (
											<GridCol key={i.key} span={{ md: 6, lg: 4 }}>
												{i.element}
											</GridCol>
									  ))
									: addresses
											?.filter(a => a.type == "shipping")
											.map(address => (
												<GridCol key={address.title} span={{ base: 12, md: 6, lg: 4 }}>
													<Radio.Card
														value={address.title}
														key={address.title}
														p={"md"}
														h={"100%"}
													>
														<Group wrap="nowrap" align="flex-start" h={"100%"}>
															<Radio.Indicator />
															<Stack gap={"xs"}>
																<Title order={3} fz={"sm"}>
																	{address.title}
																</Title>

																<Stack fz={"sm"} gap={2}>
																	<Text inherit>
																		{address.fname} {address.lname}
																	</Text>
																	{address.email && (
																		<Text inherit>{address.email}</Text>
																	)}
																	{address.phone && (
																		<Text inherit>{address.phone}</Text>
																	)}
																	<Text inherit>{address.street}</Text>
																	<Text inherit>{address.city}</Text>
																	<Text inherit>{address.zip}</Text>
																	<Text inherit>{address.country}</Text>
																</Stack>

																{address.default && (
																	<Badge size="sm" color={"blue"}>
																		Default Address
																	</Badge>
																)}
															</Stack>
														</Group>
													</Radio.Card>
												</GridCol>
											)))}
						</Grid>
					</RadioGroup>
				</Stack>
			),
		},
		{
			icon: IconPackageExport,
			title: "Delivery Instructions",
			panel: (
				<Textarea
					label="Delivery Instructions"
					description="Add instructions for how you want your order shipped and/or delivered"
					placeholder="Give instructions here"
					minRows={5}
					maxRows={10}
					autosize
					resize="vertical"
					value={deliveryInstructions}
					onChange={event => setDeliveryInstructions(event.currentTarget.value)}
				/>
			),
		},
		{
			icon: IconCreditCardPay,
			title: "Payment Method",
			panel: (
				<Stack>
					<Group justify="end">
						<Button size="xs" variant="outline" color="gray" component={Link} href={"/account/payment"}>
							View Payment Methods
						</Button>
					</Group>

					<RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
						<Grid>
							{!paymentMethods
								? skeletons.map(i => (
										<GridCol key={i.key} span={{ md: 6, lg: 4 }}>
											{i.element}
										</GridCol>
								  ))
								: paymentMethods?.map(method => (
										<GridCol key={method.title} span={{ base: 12, md: 6, lg: 4 }}>
											<Radio.Card value={method.title} key={method.title} p={"md"} h={"100%"}>
												<Group wrap="nowrap" align="flex-start" h={"100%"}>
													<Radio.Indicator />
													<Stack gap={"xs"} w={"100%"}>
														<Title order={3} fz={"sm"}>
															{method.title}
														</Title>

														<Stack fz={"sm"} gap={2}>
															<Text inherit>{`${method.name}`}</Text>
															{method.email && <Text inherit>{method.email}</Text>}
															<Text inherit>{method.number}</Text>
															{method.expiry && (
																<Text inherit>Expires: {method.expiry}</Text>
															)}
														</Stack>

														<Group justify="start">
															<Stack h={64} justify="center">
																<Image
																	src={getPaymentCardImage(method.type)}
																	alt={method.title}
																	radius={"md"}
																	component={NextImage}
																	width={1920}
																	height={1080}
																	priority
																	w={40}
																/>
															</Stack>
														</Group>

														{method.default && (
															<Badge size="sm" color={"blue"}>
																Default Address
															</Badge>
														)}
													</Stack>
												</Group>
											</Radio.Card>
										</GridCol>
								  ))}
						</Grid>
					</RadioGroup>
				</Stack>
			),
		},
	];

	const [value, setValue] = useState<string | null>(sections[0].title);

	const items = sections.map(item => (
		<AccordionItem key={item.title} value={item.title}>
			<AccordionControl
				icon={
					<item.icon
						size={24}
						stroke={2}
						color="light-dark(var(--mantine-color-gray-6),var(--mantine-color-text))"
					/>
				}
			>
				{item.title}
			</AccordionControl>
			<AccordionPanel>
				<Stack>
					{item.panel}

					<Group justify="end" gap={"xs"}>
						<Button
							size="xs"
							variant="outline"
							color="green.6"
							onClick={() => setValue(sections[sections.indexOf(item) - 1].title)}
							disabled={sections.indexOf(item) < 1}
						>
							Prev
						</Button>

						{sections.indexOf(item) < sections.length - 1 ? (
							<Button size="xs" onClick={() => setValue(sections[sections.indexOf(item) + 1].title)}>
								Next
							</Button>
						) : (
							<Button size="xs" onClick={handleSubmit} loading={submitting}>
								Place Order
							</Button>
						)}
					</Group>
				</Stack>
			</AccordionPanel>
		</AccordionItem>
	));

	return (
		<Accordion classNames={classes} value={value} onChange={setValue}>
			<Stack gap={4}>{items}</Stack>
		</Accordion>
	);
}
