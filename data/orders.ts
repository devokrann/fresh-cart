import { typeOrder } from "@/types/order";
import addresses from "./addresses";
import users from "./users";

const orders: typeOrder[] = [
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		subtotal: 9845,
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "canceled",
		user: users[0],
		orderedProducts: [cart[0], cart[1], cart[2]],
		addresses: [addresses[0], addresses[1]],
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		subtotal: 9845,
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "completed",
		user: users[0],
		orderedProducts: [cart[0], cart[1], cart[2]],
		addresses: [addresses[0], addresses[1]],
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		subtotal: 9845,
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "processing",
		user: users[0],
		orderedProducts: [cart[0], cart[1], cart[2]],
		addresses: [addresses[0], addresses[1]],
	},
	{
		datePlaced: new Date(),
		dateDelivered: new Date(),
		subtotal: 9845,
		taxFee: 743,
		serviceFee: 212,
		shippingFee: 234,
		status: "processing",
		user: users[0],
		orderedProducts: [cart[0], cart[1], cart[2]],
		addresses: [addresses[0], addresses[1]],
	},
];

export default orders;
