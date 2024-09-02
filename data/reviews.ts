import { typeReview } from "@/types/review";
import purchases from "./purchases";
import users from "./users";

const reviews: typeReview[] = [
	{
		date: new Date(),
		rating: 5,
		title: "Need to recheck the weight at delivery point",
		desc: "Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between. FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc.",
	},
	{
		date: new Date(),
		rating: 4,
		title: "Need to recheck the weight at delivery point",
		desc: "Product quality is good. But, weight seemed less than 1kg. Since it is being sent in open package, there is a possibility of pilferage in between. FreshCart sends the veggies and fruits through sealed plastic covers and Barcode on the weight etc.",
	},
	{
		date: new Date(),
		rating: 4,
		title: "Need to recheck the weight at delivery point",
		desc: "Everytime i ordered from fresh i got greenish yellow bananas just like i wanted so go for it , its happens very rare that u get over riped ones.",
	},
	{
		date: new Date(),
		rating: 4,
		title: "Great product & package.",
		desc: "Delivery can be expedited.",
	},
];

export default reviews;
