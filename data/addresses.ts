import { typeAddress } from "@/types/address";
import users from "./users";

const addresses: typeAddress[] = [
	{
		title: "Sister's Apartment",
		fname: "Jitu",
		lname: "Chauhan",
		email: "jitu.chauhan@example.com",
		street: "4450 North Avenue Oakland",
		city: "Kansas",
		zip: "45644",
		state: "Nebraska",
		country: "United States",
		phone: null,

		type: "billing",
		default: true,
	},
	{
		title: "Downtown Office",
		fname: "Nitu",
		lname: "Chauhan",
		email: null,
		street: "3853 Coal Road",
		city: "Tannersville",
		zip: "18372",
		state: "Pennsylvania",
		country: "United States",
		phone: "402-776-1106",

		type: "billing",
		default: false,
	},
	{
		title: "Brother's Apartment",
		fname: "Jitu",
		lname: "Chauhan",
		email: "jitu.chauhan@example.com",
		street: "4450 North Avenue Oakland",
		city: "Kansas",
		zip: "45644",
		state: "Nebraska",
		country: "United States",
		phone: null,

		type: "shipping",
		default: false,
	},
	{
		title: "Uptown Office",
		fname: "Nitu",
		lname: "Chauhan",
		email: null,
		street: "3853 Coal Road",
		city: "Tannersville",
		zip: "18372",
		state: "Pennsylvania",
		country: "United States",
		phone: "402-776-1106",

		type: "shipping",
		default: false,
	},
];

export default addresses;
