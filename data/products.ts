import product1 from "@/assets/images/products/product-img-1.jpg";
import product2 from "@/assets/images/products/product-img-2.jpg";
import product3 from "@/assets/images/products/product-img-3.jpg";
import product4 from "@/assets/images/products/product-img-4.jpg";
import product5 from "@/assets/images/products/product-img-5.jpg";
import product6 from "@/assets/images/products/product-img-6.jpg";
import product7 from "@/assets/images/products/product-img-7.jpg";
import product8 from "@/assets/images/products/product-img-8.jpg";
import product9 from "@/assets/images/products/product-img-9.jpg";
import product10 from "@/assets/images/products/product-img-10.jpg";
import images from "@/assets/images";

const products = [
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image1,
		category: "Snack & Munchies",
		title: "Haldiram's Sev Bhujia",
		rating: { value: 4.5, raters: 149 },
		price: { former: 24, present: 18 },
		badge: { color: "red", label: "Sale" },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image2,
		category: "Bakery & Biscuits",
		title: "NutriChoice Digestive",
		rating: { value: 4.5, raters: 25 },
		price: { present: 24 },
		badge: { color: "green", label: "14%" },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image3,
		category: "Bakery & Biscuits",
		title: "Cadbury 5 Star Chocolate",
		rating: { value: 5, raters: 469 },
		price: { former: 35, present: 32 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image4,
		category: "Snack & Munchies",
		title: "Onion Flavour Potato",
		rating: { value: 3.5, raters: 456 },
		price: { former: 5, present: 5 },
		badge: { color: "red", label: "Hot" },
	},
	{
		variants: { capacity: [250, 500, 1000] },
		shipping: { days: 1 },
		available: false,
		image: images.products.image5,
		category: "Instant Food",
		title: "Salted Instant Popcorn",
		rating: { value: 4.5, raters: 189 },
		price: { former: 24, present: 18 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 2 },
		available: true,
		image: images.products.image6,
		category: "Dairy, Bread & Eggs",
		title: "Blueberry Greek Yogurt",
		rating: { value: 5, raters: 469 },
		price: { former: 35, present: 32 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image7,
		category: "Dairy, Bread & Eggs",
		title: "Britannia Cheese Slices",
		rating: { value: 5, raters: 345 },
		price: { present: 24 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image8,
		category: "Instant Food",
		title: "Kellogg's Original Cereals",
		rating: { value: 4, raters: 90 },
		price: { former: 35, present: 32 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 2 },
		available: true,
		image: images.products.image9,
		category: "Snack & Munchies",
		title: "Slurrp Millet Chocolate",
		rating: { value: 4.5, raters: 67 },
		price: { former: 5, present: 3 },
	},
	{
		variants: { weight: [250, 500, 1000] },
		shipping: { days: 1 },
		available: true,
		image: images.products.image10,
		category: "Dairy, Bread & Eggs",
		title: "Amul Butter",
		rating: { value: 3.5, raters: 89 },
		price: { former: 18, present: 13 },
	},
];

export default products;
