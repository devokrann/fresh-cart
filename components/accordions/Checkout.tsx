"use client";

import React, { useContext, useState } from "react";

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
import { IconClockHour4, IconCreditCardPay, IconMapPin, IconPackageExport } from "@tabler/icons-react";

import { getPaymentCardImage } from "@/utilities/image";

import PaymentMethods from "@/contexts/Payment";
import ContextAddresses from "@/contexts/Addresses";

export default function Checkout() {
	const paymentMethodsContext = useContext(PaymentMethods);

	if (!paymentMethodsContext) {
		throw new Error("ChildComponent must be used within a ContextPaymentMethods.Provider");
	}

	const { paymentMethods, setPaymentMethods } = paymentMethodsContext;

	const addressesContext = useContext(ContextAddresses);

	if (!addressesContext) {
		throw new Error("ChildComponent must be used within a ContextAddresses.Provider");
	}

	const { addresses, setAddresses } = addressesContext;

	const [checked, setChecked] = useState(false);

	const paymentOptions = [
		{
			title: "Payment with Paypal",
			desc: <Text inherit>You will be redirected to PayPal website to complete your purchase securely.</Text>,
		},
		{
			title: "Credit / Debit Card",
			desc: (
				<Stack>
					<Text inherit>
						Safe money transfer using your bank account. We support Mastercard tercard, Visa, Discover and
						Stripe.
					</Text>
				</Stack>
			),
		},
		{
			title: "Pay with Payoneer",
			desc: <Text inherit>You will be redirected to Payoneer website to complete your purchase securely.</Text>,
		},
		{
			title: "Cash on Delivery",
			desc: <Text inherit>Pay with cash when your order is delivered.</Text>,
		},
	];

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
						{/* <ModalAddressEdit> */}
						<Button size="xs" variant="outline" color="gray">
							Add a New Address
						</Button>
						{/* </ModalAddressEdit> */}
					</Group>

					<RadioGroup>
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
							{/* <ModalAddressEdit> */}
							<Button size="xs" variant="outline" color="gray">
								Add a New Address
							</Button>
							{/* </ModalAddressEdit> */}
						</Box>
					</Group>

					<RadioGroup>
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
				/>
			),
		},
		{
			icon: IconCreditCardPay,
			title: "Payment Method",
			panel: (
				<Stack>
					<Group justify="end">
						<Button size="xs" variant="outline" color="gray">
							Add a New Payment Method
						</Button>
					</Group>

					<RadioGroup>
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
							<Button size="xs">Place Order</Button>
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
