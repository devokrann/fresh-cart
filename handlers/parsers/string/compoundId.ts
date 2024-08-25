import { typeProduct, typeVariant } from "@/types/product";

const compoundId = {
	getCompoundId: (combo: { product: typeProduct; variant: typeVariant }) => `${combo.product.id}-${combo.variant.id}`,
};

export default compoundId;
