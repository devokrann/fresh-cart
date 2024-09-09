import React from "react";

import { Metadata } from "next";

import { List, ListItem, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/layouts/Page";
import LayoutSection from "@/layouts/Section";
import SectionHelp from "@/partials/sections/Help";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default async function TermsConditions() {
	const data = [
		{
			title: "1. Overview",
			desc: [
				"Cartzilla provides an online platform that enables users to purchase groceries and other products from local stores and have them delivered to their designated location. By using the Platform, you acknowledge and agree that Cartzilla is not a store or retailer but merely acts as an intermediary to facilitate transactions between users and participating stores.",
				"Welcome to the family of websites and applications provided by Cartzilla. These Terms of Use govern your access to and use of all Cartzilla Sites, among other things. By using the Cartzilla Sites, you affirm that you are of legal age to enter into these Terms of Use, or, if you are not, that you have obtained parental or guardian consent to enter into these Terms of Use and your parent or guardian consents to these Terms of Use on your behalf. If you violate or do not agree to these Terms of Use, then your access to and use of the Cartzilla Sites is unauthorized. Additional terms and conditions apply to some services offered on the Cartzilla Sites (e.g., Cartzilla Pharmacy, Cartzilla +, and Gift Cards) or through other channels. Those terms and conditions can be found where the relevant service is offered on the Cartzilla Sites or otherwise and are incorporated into these Terms of Use by reference.",
			],
		},
		{
			title: "2. Your use of the Cartzilla Sites",
			desc: [
				"You certify that the Content you provide on or through the Cartzilla Sites is accurate and that the information you provide on or through the Cartzilla Sites is complete. You are solely responsible for maintaining the confidentiality and security of your account including username, password, and PIN. Cartzilla is not responsible for any losses arising out of the unauthorized use of your account. You agree that Cartzilla does not have any responsibility if you lose or share access to your device. Any agreement between you and the issuer of your credit card, debit card, or other form of payment will continue to govern your use of such payment method on the Cartzilla Sites.",
				"You agree that Cartzilla is not a party to any such agreement, nor is Cartzilla responsible for the content, accuracy, or unavailability of any method used for payment. Your account may be restricted or terminated for any reason, at our sole discretion. Except as otherwise provided by law, at any time without notice to you, we may (1) change, restrict access to, suspend, or discontinue the Cartzilla Sites or any portion of the Cartzilla Sites, and (2) charge, modify, or waive any fees required to use any services, functionality, or other content available through the Cartzilla Sites or any portion of the Cartzilla Sites.",
			],
			list: [
				"Make available any Content through or in connection with the Cartzilla Sites that is or may be in violation of the content guidelines set forth in Section 3.C (Prohibited Content) below.",
				"Make available through or in connection with the Cartzilla Sites any virus, worm, Trojan horse, Easter egg, time bomb, spyware, or other computer code, file, or program that is or is potentially harmful or invasive or intended to damage or hijack the operation of, or to monitor the use of, any hardware, software, or equipment.",
				"Use the Cartzilla Sites for any commercial purpose, or for any purpose that is fraudulent or otherwise tortious or unlawful.",
				"Harvest or collect information about users of the Cartzilla Sites.",
				"Interfere with or disrupt the operation of the Cartzilla Sites or the systems, servers, or networks used to make the Cartzilla Sites available, including by hacking or defacing any portion of the Cartzilla Sites; or violate any requirement, procedure, or policy of such servers or networks.",
				"Reproduce, modify, adapt, translate, create derivative works of, sell, rent, lease, loan, timeshare, distribute, or otherwise exploit any portion of (or any use of) the Cartzilla Sites except as expressly authorized in these Terms of Use, without Cartzilla's express prior written consent.",
				"Reverse engineer, decompile, or disassemble any portion of the Cartzilla Sites, except where such restriction is expressly prohibited by applicable law.",
				"Remove any copyright, trademark, or other proprietary rights notice from the Cartzilla Sites.",
				"You will not attempt to do anything, or permit, encourage, assist, or allow any third party to do anything, prohibited in this Section, or attempt, permit, encourage, assist, or allow any other violation of these Terms of Use.",
			],
		},
		{
			title: "3. Ordering and delivery",
			desc: [
				"When placing an order through Cartzilla, you are responsible for ensuring the accuracy of the items, quantities, and delivery details. Cartzilla does not guarantee the availability of any specific product and reserves the right to substitute products based on availability. Delivery times provided are estimates and may vary due to various factors.",
			],
			list: [
				"Reverse engineer, decompile, or disassemble any portion of the Cartzilla Sites, except where such restriction is expressly prohibited by applicable law.",
				"Reproduce, modify, adapt, translate, create derivative works of, sell, rent, lease, loan, timeshare, distribute, or otherwise exploit any portion of (or any use of) the Cartzilla Sites except as expressly authorized in these Terms of Use, without Cartzilla's express prior written consent.",
				"You will not attempt to do anything, or permit, encourage, assist, or allow any third party to do anything, prohibited in this Section, or attempt, permit, encourage, assist, or allow any other violation of these Terms of Use.",
				"Remove any copyright, trademark, or other proprietary rights notice from the Cartzilla Sites.",
			],
		},
		{
			title: "4. Payments",
			desc: [
				"Cartzilla facilitates payments for orders made through the Platform. By using Cartzilla's payment services, you agree to provide accurate payment information and authorize Cartzilla to charge the applicable amount for your order. Cartzilla may use third-party payment processors to process transactions and may store your payment information in accordance with its Privacy Policy.",
			],
		},
		{
			title: "5. User conduct",
			desc: [
				"You agree to use the Platform in compliance with all applicable laws and regulations. You shall not engage in any unlawful, harmful, or abusive behavior while using the Platform. Cartzilla reserves the right to suspend or terminate your account if you violate these Terms or engage in any prohibited activities.",
			],
			list: [
				"All content on the Cartzilla Platform, including but not limited to text, graphics, logos, and software, is the property of Cartzilla or its licensors and is protected by intellectual property laws. You may not use, reproduce, modify, or distribute any content from the Platform without prior written consent from Cartzilla.",
				"The Platform may contain links to third-party websites or resources. Cartzilla does not endorse, control, or assume responsibility for any third-party content or websites. You acknowledge and agree that Cartzilla is not liable for any loss or damage caused by your reliance on such content or websites.",
				'The Platform is provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied. Cartzilla does not guarantee the accuracy, reliability, or availability of the Platform and disclaims all warranties to the fullest extent permitted by law.',
				"To the maximum extent permitted by law, Cartzilla and its affiliates shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of the Platform, even if advised of the possibility of such damages.",
			],
		},
		{
			title: "6. Entire agreement and severability",
			desc: [
				"These Terms, subject to any amendments, modifications, or additional agreements you enter into with Cartzilla, shall constitute the entire agreement between you and Cartzilla with respect to the Services and any use of the Services. If any provision of these Terms is found to be invalid by a court of competent jurisdiction, that provision only will be limited to the minimum extent necessary, and the remaining provisions will remain in full force and effect.",
				"Cartzilla reserves the right to modify or update these Terms at any time without prior notice. Your continued use of the Platform after any changes to the Terms constitutes acceptance of those changes.",
			],
		},
	];

	return (
		<LayoutPage>
			<LayoutSection margined containerized="md">
				<Stack gap={"xl"}>
					<Stack gap={0}>
						<Title order={2}>Terms and Conditions</Title>
						<Text fz={"sm"}>
							Last Updated:{" "}
							<Text component="span" inherit fw={"bold"}>
								June 26, 2024
							</Text>
						</Text>
					</Stack>

					<Text>
						Welcome to Cartzilla! These Terms and Conditions (&quot;Terms&quot;) govern your access to and
						use of the Cartzilla website and mobile application (collectively referred to as the
						&quot;Platform&quot;). Please read these Terms carefully before using the Platform. By accessing
						or using the Platform, you agree to be bound by these Terms.
					</Text>

					{data.map(item => (
						<Stack key={item.title}>
							<Title order={2}>{item.title}</Title>

							<Stack gap={"xs"}>
								{item.desc.map(p => (
									<Text key={p}>{p}</Text>
								))}
							</Stack>

							{item.list && (
								<List spacing={"xs"} size="sm" withPadding>
									{item.list.map(p => (
										<ListItem key={p}>{p}</ListItem>
									))}
								</List>
							)}
						</Stack>
					))}

					<SectionHelp />
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
