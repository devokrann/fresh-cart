import { StaticImageData } from "next/image";

export interface typeBlog {
	image: string;
	title: string;
	description: { preview: string; quote: { text: string; person: string } };
	date: string;
	length: number;
	category: string;
	author: {
		image: string;
		name: string;
		position: string;
	};
}
