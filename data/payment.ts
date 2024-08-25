import images from "@/assets/images";
import { typePaymentMethods } from "@/types/payment";
import users from "./users";

const paymentMethods: typePaymentMethods[] = [
	{
		title: "My Visa",
		name: users[0].name,
		number: "4242 7856 4242 7856",
		expiry: new Date().toDateString(),
		type: "visa",
		default: true,
	},
	{
		title: "Joe's Master Card",
		name: users[1].name,
		number: "4242 7856 4242 7856",
		expiry: new Date().toDateString(),
		type: "mastercard",
		default: false,
	},
	{
		title: "Brother's Card",
		name: users[2].name,
		number: "4242 7856 4242 7856",
		expiry: new Date().toDateString(),
		type: "discover",
		default: false,
	},
	{
		title: "Platinum Card",
		name: users[2].name,
		number: "4242 7856 4242 7856",
		expiry: new Date().toDateString(),
		type: "american express",
		default: false,
	},
	{
		title: "Team's Paypal Account",
		name: users[2].name,
		email: users[2].email,
		type: "paypal express",
		default: false,
	},
];

export default paymentMethods;
