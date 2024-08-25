import { typeOrder } from "@/types/order";
import addresses from "./addresses";
import users from "./users";
import cart from "./cart";

const orders: typeOrder[] = [
	{
		id: "864960",
		datePlaced: new Date().toDateString(),
		dateDelivered: new Date().toDateString(),
		subtotal: 9845,
		tax: 743,
		serviceFee: 212,
		shipping: 234,
		status: "canceled",
		user: users[0],
		products: [cart[0], cart[1], cart[2]],
		invoiceAddress: addresses[0],
		shippingAddress: addresses[1],
	},
	{
		id: "865980",
		datePlaced: new Date().toDateString(),
		dateDelivered: new Date().toDateString(),
		subtotal: 9845,
		tax: 743,
		serviceFee: 212,
		shipping: 234,
		status: "completed",
		user: users[0],
		products: [cart[0], cart[1], cart[2]],
		invoiceAddress: addresses[0],
		shippingAddress: addresses[1],
	},
	{
		id: "164520",
		datePlaced: new Date().toDateString(),
		dateDelivered: new Date().toDateString(),
		subtotal: 9845,
		tax: 743,
		serviceFee: 212,
		shipping: 234,
		status: "processing",
		user: users[0],
		products: [cart[0], cart[1], cart[2]],
		invoiceAddress: addresses[0],
		shippingAddress: addresses[1],
	},
	{
		id: "162728",
		datePlaced: new Date().toDateString(),
		dateDelivered: new Date().toDateString(),
		subtotal: 9845,
		tax: 743,
		serviceFee: 212,
		shipping: 234,
		status: "processing",
		user: users[0],
		products: [cart[0], cart[1], cart[2]],
		invoiceAddress: addresses[0],
		shippingAddress: addresses[1],
	},
];

export default orders;
