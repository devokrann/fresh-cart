import prisma from "@/services/prisma";
import { typeStore } from "@/types/store";

const addStores = async (stores: typeStore[]) => {
	try {
		const result = await Promise.all(
			stores.map(
				async s =>
					await prisma.store.create({
						data: s,
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding stores to database:", error);
	}
};

export default addStores;
