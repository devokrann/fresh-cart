import { typeOrder } from "@/types/order";
import addresses from "./addresses";
import users from "./users";

const orders: typeOrder[] = [
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "canceled",
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "completed",
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "processing",
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "processing",
	},
];

export default orders;
