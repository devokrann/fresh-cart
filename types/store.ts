import { StaticImageData } from "next/image";

export interface typeStore {
	image: StaticImageData;
	title: string;
	goods: string[];
	delivery: { available: boolean; time?: string };
	distance: number;
}
