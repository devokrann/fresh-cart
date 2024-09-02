import {
	IconBuildingStore,
	IconCreditCardPay,
	IconSettings,
	IconShoppingBag,
	IconTruck,
	IconTruckReturn,
} from "@tabler/icons-react";

const help = {
	links: [
		{
			icon: IconTruck,
			title: "Delivery",
			desc: [
				"Can I track my order in real-time?",
				"Is there an option for express delivery?",
				"Will my parcel be charged customs charges?",
				"Do you offer international delivery?",
				"Why does my statement have a recurring charge?",
			],
		},
		{
			icon: IconTruckReturn,
			title: "Returns & Refunds",
			desc: [
				"What is your returns policy?",
				"I paid with Afterpay, how do returns work?",
				"What happens to my refund if I return 45 days?",
				"How do I return something to you?",
				"Can I return an exchange instead of a refund?",
			],
		},
		{
			icon: IconCreditCardPay,
			title: "Payment Options",
			desc: [
				"How do I place an order?",
				"My payment was declined, what should I do?",
				"When will I be charged for my order?",
				"How do I pay using Google Pay?",
				"How do I use my Gift Voucher to pay for an order?",
			],
		},
		{
			icon: IconShoppingBag,
			title: "Order Issues",
			desc: [
				"Can I amend my order after I've placed it?",
				"I've received a faulty item, what should I do?",
				"I've received an incorrect item, what do I do?",
				"I've bought a gift voucher, can I cancel or return it?",
				"What if isn't right on my customs invoice?",
			],
		},
		{
			icon: IconBuildingStore,
			title: "Products & Stock",
			desc: [
				"Where can I find your size guide?",
				"Where can I find your care instructions?",
				"Can you tell me more about Collusion?",
				"How do I change my Fit Assistant Information?",
				"What are your adhesive product guidelines?",
			],
		},
		{
			icon: IconSettings,
			title: "Managing Account",
			desc: [
				"How do I create an account?",
				"I'm having trouble signing into my account.",
				"I'm having problems using your App.",
				"Do I need to create an account to shop with you?",
				"I'd like to delete my account what should I do?",
			],
		},
	],
};

export default help;
