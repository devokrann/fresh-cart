import { typePurchase } from "@/types/purchase";
import orders from "./orders";

const purchases: typePurchase[] = [
	{
		verified: true,
		date: new Date(),
		order: orders[0],
	},
	{
		verified: true,
		date: new Date(),
		order: orders[1],
	},
	{
		verified: false,
		date: new Date(),
		order: orders[2],
	},
	{
		verified: false,
		date: new Date(),
		order: orders[3],
	},
];

export default purchases;
