import { typePurchase } from "@/types/purchase";
import orders from "./orders";

const purchases: typePurchase[] = [
	{
		verified: true,
		order: orders[0],
	},
	{
		verified: true,
		order: orders[1],
	},
	{
		verified: false,
		order: orders[2],
	},
	{
		verified: false,
		order: orders[3],
	},
];

export default purchases;
