import { typePostCategory, typeProductCategory } from "@/types/categories";

const postCategories: typePostCategory[] = [
	{
		title: "Recipes",
	},
	{
		title: "Retailer",
	},
	{
		title: "Company",
	},
];

const productCategories: typeProductCategory[] = [
	{
		title: "Bakery & Biscuits",
	},
	{
		title: "Snack & Munchies",
	},
	{
		title: "Instant Food",
	},
	{
		title: "Dairy, Bread & Eggs",
	},
];

const categories = {
	blog: postCategories,
	product: productCategories,
};

export default categories;
