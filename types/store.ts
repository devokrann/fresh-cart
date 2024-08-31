import { typeDatabaseFields } from "./database";

export interface typeStore extends typeDatabaseFields {
	image: string;
	title: string;
	goods: string;
	distance: number;
	deliverable: boolean;
	deliveryTime?: string;
}
