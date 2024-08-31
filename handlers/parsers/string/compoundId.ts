import { typeProduct } from "@/types/product";
import { typeVariant } from "@/types/variant";

const compoundId = {
	getCompoundId: (combo: { product: typeProduct; variant: typeVariant }) => `${combo.product.id}-${combo.variant.id}`,
};

export default compoundId;
