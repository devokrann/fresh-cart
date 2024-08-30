import prisma from "@/services/prisma";
import { typeStore } from "@/types/store";

const postStores = async (stores: typeStore[]) => {
	try {
		stores.map(async s => {
			await prisma.stores.create({
				data: {
					image: s.image,
					title: s.title,
					goods: s.goods,
					distance: s.distance,
					deliverable: s.deliverable,
					deliveryTime: s.deliveryTime,
				},
			});
		});
	} catch (error) {
		console.error("x-> Error adding stores to database:", error);
	}
};

export default postStores;
