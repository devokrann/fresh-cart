import { typeBlogPostCategory } from "@/types/categories";
import blog from "./blog";

const blogPostCategories: typeBlogPostCategory[] = [
	{
		id: "1",
		title: "Recipes",
		posts: blog,
	},
	{
		id: "2",
		title: "Retailer",
		posts: blog,
	},
	{
		id: "3",
		title: "Company",
		posts: blog,
	},
];

export default blogPostCategories;
