import { typeReview } from "@/types/review";
import purchases from "./purchases";
import users from "./users";

const reviews: typeReview[] = [
	{
		date: "30 December 2024",
		rating: 5,
		title: "Need to recheck the weight at delivery point",
		desc: "Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between. FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc.",
		reviewer: users[0],
		purchase: purchases[0],
	},
	{
		date: "29 December 2024",
		rating: 4,
		title: "Need to recheck the weight at delivery point",
		desc: "Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between. FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc.",
		reviewer: users[1],
		purchase: purchases[1],
	},
	{
		date: "28 December 2024",
		rating: 4,
		title: "Need to recheck the weight at delivery point",
		desc: "Everytime i ordered from fresh i got greenish yellow bananas just like i wanted so go for it , its happens very rare that u get over riped ones.",
		reviewer: users[2],
		purchase: purchases[2],
	},
	{
		date: "8 December 2024",
		rating: 4,
		title: "Great product & package.",
		desc: "Delivery can be expedited.",
		reviewer: users[3],
		purchase: purchases[3],
	},
];

export default reviews;
