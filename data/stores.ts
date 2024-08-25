import images from "@/assets/images";
import { typeStore } from "@/types/store";

const stores: typeStore[] = [
	{
		image: images.stores.image1,
		title: "E-Grocery Mart",
		goods: ["Organic", "Groceries", "Butcher Shop"],
		delivery: { available: true },
		distance: 7.5,
	},
	{
		image: images.stores.image2,
		title: "DealShare Mart",
		goods: ["Alcohol", "Groceries"],
		delivery: { available: true },
		distance: 7.2,
	},
	{
		image: images.stores.image3,
		title: "DMart",
		goods: ["Groceries", "Bakery Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 9.3,
	},
	{
		image: images.stores.image4,
		title: "Blinkit Store",
		goods: ["Meal Kits", "Prepared Meals", "Organic"],
		delivery: { available: true },
		distance: 40.5,
	},
	{
		image: images.stores.image5,
		title: "StoreFront Mart",
		goods: ["Groceries", "Bakery"],
		delivery: { available: true, time: "11:30 pm" },
		distance: 28.1,
	},
	{
		image: images.stores.image6,
		title: "BigBasket",
		goods: ["Groceries", "Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 7.5,
	},
	{
		image: images.stores.image7,
		title: "Swiggy Instamart",
		goods: ["Meal Kits", "Prepared Meals", "Organic"],
		delivery: { available: true },
		distance: 40.5,
	},
	{
		image: images.stores.image8,
		title: "Online Grocery Mart",
		goods: ["Groceries", "Bakery"],
		delivery: { available: true, time: "11:30 pm" },
		distance: 28.1,
	},
	{
		image: images.stores.image9,
		title: "Spencers",
		goods: ["Groceries", "Deli"],
		delivery: { available: true, time: "10:30 pm" },
		distance: 7.5,
	},
];

export default stores;
