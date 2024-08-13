import { StaticImageData } from "next/image";

export interface typeProduct {
	image: string;
	category: string;
	title: string;
	rating: { value: number; raters: number };
	price: { former?: number; present: number };
	badge?: { color: string; label: string };
	variants: {
		weight?: number[];
		capacity?: number[];
	};
	shipping: { days: number };
	available: boolean;
	quantity?: number;
}
