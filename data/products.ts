import images from "@/assets/images";
import { typeProduct } from "@/types/product";
import reviews from "./reviews";

const products: typeProduct[] = [
	{
		title: "Muesli Fitness Energy",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image1,
				available: true,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image1,
				available: true,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image1,
				available: true,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Snack & Munchies",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: true,
		hot: false,
	},
	{
		title: "Fresh orange Klementina",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image2,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image2,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image2,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Bakery & Biscuits",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Pepsi Soda Classic",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image3,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image3,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image3,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Bakery & Biscuits",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Mozzarella Mini Cheese",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image4,
				available: true,
				priceFormer: null,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image4,
				available: true,
				priceFormer: null,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image4,
				available: true,
				priceFormer: null,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Snack & Munchies",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: true,
	},
	{
		title: "Coconut",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image5,
				available: false,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image5,
				available: false,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image5,
				available: false,
				priceFormer: 24,
				pricePresent: 18,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: false,
		category: "Instant Food",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Pesto Sauce",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image6,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "volume",
				unitValue: "250",
			},
			{
				image: images.products.image6,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "volume",
				unitValue: "500",
			},
			{
				image: images.products.image6,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "volume",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 2,
		sale: false,
		hot: false,
	},
	{
		title: "Fresh Mango",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image7,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image7,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image7,
				available: true,
				priceFormer: null,
				pricePresent: 24,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Fresh Green Asparagus",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image8,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image8,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image8,
				available: true,
				priceFormer: 35,
				pricePresent: 32,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Instant Food",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Pure Virgin Olive Oil",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image9,
				available: true,
				priceFormer: 5,
				pricePresent: 3,
				unitType: "volume",
				unitValue: "250",
			},
			{
				image: images.products.image9,
				available: true,
				priceFormer: 5,
				pricePresent: 3,
				unitType: "volume",
				unitValue: "500",
			},
			{
				image: images.products.image9,
				available: true,
				priceFormer: 5,
				pricePresent: 3,
				unitType: "volume",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Snack & Munchies",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 2,
		sale: false,
		hot: false,
	},
	{
		title: "Pork Steaks",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image10,
				available: true,
				priceFormer: 18,
				pricePresent: 13,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image10,
				available: true,
				priceFormer: 18,
				pricePresent: 13,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image10,
				available: true,
				priceFormer: 18,
				pricePresent: 13,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Fresh Grapefruit",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image11,
				available: true,
				priceFormer: 6,
				pricePresent: 4,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image11,
				available: true,
				priceFormer: 6,
				pricePresent: 4,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image11,
				available: true,
				priceFormer: 6,
				pricePresent: 4,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Soft Creme Cheese",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image12,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image12,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image12,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Steak Salmon Fillet",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image13,
				available: true,
				priceFormer: null,
				pricePresent: 27,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image13,
				available: true,
				priceFormer: null,
				pricePresent: 27,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image13,
				available: true,
				priceFormer: null,
				pricePresent: 27,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Red Seedless Grapes",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image14,
				available: true,
				priceFormer: 5,
				pricePresent: 2,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image14,
				available: true,
				priceFormer: 5,
				pricePresent: 2,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image14,
				available: true,
				priceFormer: 5,
				pricePresent: 2,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Fresh Lemons",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image15,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image15,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image15,
				available: true,
				priceFormer: null,
				pricePresent: 3,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
	{
		title: "Reggia Penne Rigate Pasta",
		desc: "Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
		variants: [
			{
				image: images.products.image16,
				available: true,
				priceFormer: 7,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "250",
			},
			{
				image: images.products.image16,
				available: true,
				priceFormer: 7,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "500",
			},
			{
				image: images.products.image16,
				available: true,
				priceFormer: 7,
				pricePresent: 5,
				unitType: "mass",
				unitValue: "1000",
			},
		],
		available: true,
		category: "Dairy, Bread & Eggs",
		code: "FBB00255",
		brand: "DMart",
		reviews: reviews,
		shippingDays: 1,
		sale: false,
		hot: false,
	},
];

export default products;
