export interface typeStore {
	image: string;
	title: string;
	goods: string[];
	distance: number;
	delivery: { available: boolean; time?: string };
}
