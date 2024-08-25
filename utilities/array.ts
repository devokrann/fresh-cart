import { typeProduct, typeVariant } from "@/types/product";

const array = {
	isPresent: (id: string, array: any[]) => (array.find(p => p.id == id) ? true : false),
};

export default array;
