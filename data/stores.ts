import store1 from "@/assets/images/stores/stores-logo-1.svg";
import store2 from "@/assets/images/stores/stores-logo-2.svg";
import store3 from "@/assets/images/stores/stores-logo-3.svg";
import store4 from "@/assets/images/stores/stores-logo-4.svg";
import store5 from "@/assets/images/stores/stores-logo-5.svg";
import store6 from "@/assets/images/stores/stores-logo-6.svg";
import store7 from "@/assets/images/stores/stores-logo-7.svg";
import store8 from "@/assets/images/stores/stores-logo-8.svg";
import store9 from "@/assets/images/stores/stores-logo-9.svg";

const stores = [
	{
		image: store1,
		title: "E-Grocery Super Market",
		goods: ["Organic", "Groceries", "Butcher Shop"],
		delivery: { available: true },
		distance: 7.5,
	},
	{
		image: store2,
		title: "DealShare Mart",
		goods: ["Alcohol", "Groceries"],
		delivery: { available: true },
		distance: 7.2,
	},
	{
		image: store3,
		title: "DMart",
		goods: ["Groceries", "Bakery Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 9.3,
	},
	{
		image: store4,
		title: "Blinkit Store",
		goods: ["Meal Kits", "Prepared Meals", "Organic"],
		delivery: { available: true },
		distance: 40.5,
	},
	{
		image: store5,
		title: "StoreFront Mart",
		goods: ["Groceries", "Bakery"],
		delivery: { available: true, time: "11:30 pm" },
		distance: 28.1,
	},
	{
		image: store6,
		title: "BigBasket",
		goods: ["Groceries", "Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 7.5,
	},
	{
		image: store7,
		title: "Swiggy Instamart",
		goods: ["Meal Kits", "Prepared Meals", "Organic"],
		delivery: { available: true },
		distance: 40.5,
	},
	{
		image: store8,
		title: "Online Grocery Mart",
		goods: ["Groceries", "Bakery"],
		delivery: { available: true, time: "11:30 pm" },
		distance: 28.1,
	},
	{
		image: store9,
		title: "Spencers",
		goods: ["Groceries", "Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 7.5,
	},
];

export default stores;
